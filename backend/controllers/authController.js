const poll = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // FIX: Changed 'hashedPassword' to 'password_hash' to match your Neon table columns
        const query = 'INSERT INTO users(username, email, password_hash) VALUES($1, $2, $3) RETURNING id, username, email';
        const result = await poll.query(query, [username, email, hashedPassword]);
        
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Registration Error:", err.message);
        res.status(500).json({ error: "Registration failed. Please check if email is unique." });
    }
};

const login = async (req, res) => {
    console.log("🚀 Login request received!");
    try {
        const { email, password } = req.body;

        const userResult = await poll.query('SELECT * FROM users WHERE email=$1', [email]);
        if (userResult.rows.length === 0) return res.status(400).json({ error: "Invalid credentials" });

        const user = userResult.rows[0];

        // FIX: Changed user.hashedPassword to user.password_hash
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign(
            { id: user.id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.json({ 
            token, 
            user: { id: user.id, username: user.username, role: user.role } 
        });
    } catch (err) {
        console.error("Login Error:", err.message);
        res.status(500).json({ error: "Login error" });
    }
};

module.exports = { register, login };