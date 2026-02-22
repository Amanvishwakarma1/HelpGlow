const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // For hashing the new password
const pool = require('../config/db'); // Ensure this points to your Neon connection file
const { register, login } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);

// New Route: Update Profile Details
router.put('/update-profile', protect, async (req, res) => {
    const { username, password } = req.body;
    const userId = req.user.id; // From your protect middleware

    try {
        let result;

        if (password && password.trim() !== "") {
            // 1. Hash the new password if the user provided one
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // 2. Update both username and password in the database
            result = await pool.query(
                'UPDATE users SET username = $1, password = $2 WHERE id = $3 RETURNING id, username, email',
                [username, hashedPassword, userId]
            );
        } else {
            // 3. Update only the username if password is empty
            result = await pool.query(
                'UPDATE users SET username = $1 WHERE id = $2 RETURNING id, username, email',
                [username, userId]
            );
        }

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        // 4. Send the updated user object back to the frontend
        res.json({ 
            message: "Profile updated successfully", 
            user: result.rows[0] 
        });

    } catch (err) {
        console.error("Update Profile Error:", err.message);
        res.status(500).json({ error: "Server error during profile update" });
    }
});

router.get('/profile', protect, (req, res) => {
    res.json({ message: "Welcome to the Admin Dashboard!", user: req.user });
});

router.get('/ping', (req, res) => res.send("Auth route is alive!"));

module.exports = router;