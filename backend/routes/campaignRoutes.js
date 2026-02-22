const express = require('express');
const router = express.Router();
const pool = require('../config/db'); 
const { protect } = require('../middleware/authMiddleware');

// 1. Get all campaigns/posts
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM campaigns ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch feed" });
    }
});

// 2. Create a new post (Admin only - protected)
router.post('/', protect, async (req, res) => {
    const { title, caption, location, media_url, is_video, category } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO campaigns (title, caption, location, media_url, is_video, category, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [title, caption, location, media_url, is_video, category, req.user.id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Database error while posting" });
    }
});

// 3. Like a post
router.put('/:id/like', async (req, res) => {
    try {
        const result = await pool.query(
            'UPDATE campaigns SET likes_count = likes_count + 1 WHERE id = $1 RETURNING likes_count',
            [req.params.id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Error liking post" });
    }
});

// 4. Record a view (For stories/videos)
router.put('/:id/view', async (req, res) => {
    try {
        await pool.query('UPDATE campaigns SET views_count = views_count + 1 WHERE id = $1', [req.params.id]);
        res.json({ message: "View recorded" });
    } catch (err) {
        res.status(500).json({ error: "Error recording view" });
    }
});

module.exports = router;