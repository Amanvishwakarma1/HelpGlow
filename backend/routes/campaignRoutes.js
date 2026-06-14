const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { protect } = require('../middleware/authMiddleware');
const jwt = require('jsonwebtoken');


// 1. Get all campaigns
router.get('/', async (req, res) => {
    let userId = null;
    const authHeader = req.header('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            userId = decoded.id;
        } catch (err) {
            // Token is invalid/expired, ignore
        }
    }

    try {
        const queryText = `
            SELECT 
                c.id,
                c.caption,
                c.media_url,
                c.category,
                c.is_video,
                c.likes_count,
                c.created_at,
                COALESCE(
                    (SELECT json_agg(json_build_object('id', cc.id, 'username', u.username, 'text', cc.comment_text, 'created_at', cc.created_at) ORDER BY cc.created_at ASC)
                     FROM campaign_comments cc
                     JOIN users u ON cc.user_id = u.id
                     WHERE cc.campaign_id = c.id),
                    '[]'::json
                ) AS comments
                ${userId ? `, EXISTS (SELECT 1 FROM campaign_likes cl WHERE cl.campaign_id = c.id AND cl.user_id = $1) AS liked` : `, false AS liked`}
            FROM campaigns c
            ORDER BY c.created_at DESC
        `;

        const queryParams = userId ? [userId] : [];
        const result = await pool.query(queryText, queryParams);

        res.json(result.rows);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Failed to fetch feed"
        });
    }
});


// 2. Single User Like Toggle Route
router.put('/:id/like', protect, async (req, res) => {

    const campaignId = req.params.id;
    const userId = req.user.id;

    try {

        // Check if already liked
        const existingLike = await pool.query(
            `
            SELECT id 
            FROM campaign_likes 
            WHERE user_id = $1 AND campaign_id = $2
            `,
            [userId, campaignId]
        );


        // =========================
        // REMOVE LIKE
        // =========================
        if (existingLike.rows.length > 0) {

            // Delete like record
            await pool.query(
                `
                DELETE FROM campaign_likes
                WHERE user_id = $1 AND campaign_id = $2
                `,
                [userId, campaignId]
            );

            // Decrease like count
            const updatedCampaign = await pool.query(
                `
                UPDATE campaigns
                SET likes_count = GREATEST(likes_count - 1, 0)
                WHERE id = $1
                RETURNING likes_count
                `,
                [campaignId]
            );

            return res.status(200).json({
                liked: false,
                likes_count: updatedCampaign.rows[0].likes_count
            });
        }


        // =========================
        // ADD LIKE
        // =========================

        // Insert new like
        await pool.query(
            `
            INSERT INTO campaign_likes (user_id, campaign_id)
            VALUES ($1, $2)
            `,
            [userId, campaignId]
        );

        // Increase like count
        const updatedCampaign = await pool.query(
            `
            UPDATE campaigns
            SET likes_count = likes_count + 1
            WHERE id = $1
            RETURNING likes_count
            `,
            [campaignId]
        );

        return res.status(200).json({
            liked: true,
            likes_count: updatedCampaign.rows[0].likes_count
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: "Error processing like"
        });
    }
});


// 3. Create new post
router.post('/', protect, async (req, res) => {

    const {
        caption,
        location,
        media_url,
        is_video,
        category
    } = req.body;

    const title = caption
        ? caption.substring(0, 50)
        : 'Untitled Campaign';

    try {

        const result = await pool.query(
            `
            INSERT INTO campaigns
            (
                title,
                caption,
                location,
                media_url,
                is_video,
                category,
                created_by
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
            `,
            [
                title,
                caption,
                location || '',
                media_url,
                is_video || false,
                category || 'General',
                req.user.id
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: "Database error while posting"
        });
    }
});

// 4. Add comment route
router.post('/:id/comments', protect, async (req, res) => {
    const campaignId = req.params.id;
    const userId = req.user.id;
    const { text } = req.body;

    if (!text || !text.trim()) {
        return res.status(400).json({ error: "Comment text is required" });
    }

    try {
        // 1. Insert the comment
        const commentResult = await pool.query(
            `
            INSERT INTO campaign_comments (user_id, campaign_id, comment_text)
            VALUES ($1, $2, $3)
            RETURNING id, comment_text AS text, created_at
            `,
            [userId, campaignId, text.trim()]
        );

        const newComment = commentResult.rows[0];

        // 2. Fetch commenter's username
        const userResult = await pool.query(
            `SELECT username FROM users WHERE id = $1`,
            [userId]
        );
        
        newComment.username = userResult.rows[0].username;

        res.status(201).json(newComment);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Database error while posting comment"
        });
    }
});

module.exports = router;