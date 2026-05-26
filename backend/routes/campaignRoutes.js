const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { protect } = require('../middleware/authMiddleware');


// 1. Get all campaigns
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                id,
                caption,
                media_url,
                category,
                is_video,
                likes_count,
                created_at
            FROM campaigns
            ORDER BY created_at DESC
        `);

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

module.exports = router;