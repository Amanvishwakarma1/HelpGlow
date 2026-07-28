const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Helper: Send OTP via Resend API or fallbacks
const sendEmailOtp = async (email, otp, purpose = 'Verification') => {
    const subject = `HelpGlow - ${purpose === 'forgot_password' ? 'Password Reset Code' : 'Email Verification Code'}`;
    const title = purpose === 'forgot_password' ? 'Reset Your Password' : 'Verify Your Email Address';
    
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px; background-color: #ffffff;">
            <h2 style="color: #8e2382; text-align: center;">${title}</h2>
            <p>Hello,</p>
            <p>Your HelpGlow verification code is:</p>
            <div style="background-color: #fff5f8; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0;">
                <span style="font-size: 32px; font-weight: 800; letter-spacing: 5px; color: #e61e6e;">${otp}</span>
            </div>
            <p>This code will expire in 5 minutes.</p>
            <p style="font-size: 13px; color: #64748b; margin-top: 25px;">If you did not request this code, please ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #cbd5e1; margin: 30px 0 20px;" />
            <p style="font-size: 11px; color: #94a3b8; text-align: center;">&copy; 2026 HelpGlow NGO. All rights reserved.</p>
        </div>
    `;

    // 1. Try Resend API if API Key exists
    if (process.env.RESEND_API_KEY) {
        try {
            console.log(`✉️ [Resend API] Sending OTP code (${purpose}) to ${email}...`);
            const { Resend } = require("resend");
            const resend = new Resend(process.env.RESEND_API_KEY);
            const resendFrom = process.env.RESEND_FROM || 'onboarding@resend.dev';

            await resend.emails.send({
                from: `HelpGlow <${resendFrom}>`,
                to: email,
                subject: subject,
                html: html
            });
            console.log(`✅ [Resend API] OTP Email successfully sent to ${email}`);
            return { provider: 'resend', success: true };
        } catch (err) {
            console.error(`⚠️ [Resend API] Failed:`, err.message);
        }
    }

    // 2. Try SMTP if configured
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        try {
            console.log(`✉️ [SMTP Relay] Sending OTP to ${email}...`);
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST || 'smtp.gmail.com',
                port: parseInt(process.env.SMTP_PORT) || 587,
                secure: process.env.SMTP_SECURE === 'true',
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                }
            });

            await transporter.sendMail({
                from: `"HelpGlow Security" <${process.env.SMTP_USER}>`,
                to: email,
                subject: subject,
                html: html
            });
            console.log(`✅ [SMTP Relay] Email sent to ${email}`);
            return { provider: 'smtp', success: true };
        } catch (err) {
            console.error(`⚠️ [SMTP Relay] Failed:`, err.message);
        }
    }

    // 3. Fallback: Console / Dev Output
    console.log(`🔑 [OTP Dev Fallback] Code for ${email} (${purpose}) is: ${otp}`);
    return { provider: 'fallback', success: true, otp };
};

// Generate JWT Token helper
const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, username: user.username, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

// 0. Check Email Uniqueness Controller
const checkEmail = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'Email address is required' });
    }

    try {
        const result = await pool.query(
            `SELECT id FROM users WHERE LOWER(email) = LOWER($1)`,
            [email.trim()]
        );

        return res.status(200).json({ exists: result.rows.length > 0 });
    } catch (err) {
        console.error('❌ Error in checkEmail:', err);
        return res.status(500).json({ error: 'Database query failed: ' + err.message });
    }
};

// 1. Send OTP Controller (Handles uniqueness check for registration & existence check for forgot password)
const sendOtp = async (req, res) => {
    const { email, purpose = 'register' } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'Email address is required' });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Basic regex validation for email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
        return res.status(400).json({ error: 'Invalid email address format' });
    }

    try {
        // Check database user existence
        const userCheck = await pool.query(
            `SELECT id FROM users WHERE LOWER(email) = $1`,
            [cleanEmail]
        );
        const userExists = userCheck.rows.length > 0;

        if (purpose === 'register' && userExists) {
            return res.status(400).json({ error: 'Email is already registered. Please sign in or reset your password.' });
        }

        if (purpose === 'forgot_password' && !userExists) {
            return res.status(404).json({ error: 'No HelpGlow account found associated with this email address.' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

        await pool.query(
            `INSERT INTO otp_verifications (email, otp, expires_at, is_verified, updated_at)
             VALUES ($1, $2, $3, FALSE, CURRENT_TIMESTAMP)
             ON CONFLICT (email)
             DO UPDATE SET otp = $2, expires_at = $3, is_verified = FALSE, updated_at = CURRENT_TIMESTAMP`,
            [cleanEmail, otp, expiresAt]
        );

        const emailResult = await sendEmailOtp(cleanEmail, otp, purpose);

        res.status(200).json({
            message: 'OTP verification code sent successfully',
            email: cleanEmail,
            provider: emailResult.provider
        });
    } catch (err) {
        console.error('❌ Error in sendOtp:', err);
        res.status(500).json({ error: 'Failed to send OTP verification email: ' + err.message });
    }
};

// 2. Verify OTP Controller
const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return res.status(400).json({ error: 'Email and OTP are required' });
    }

    const cleanEmail = email.trim().toLowerCase();

    try {
        const result = await pool.query(
            `SELECT * FROM otp_verifications WHERE LOWER(email) = $1`,
            [cleanEmail]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({ error: 'No OTP record found for this email. Please request a new OTP.' });
        }

        const record = result.rows[0];

        if (new Date() > new Date(record.expires_at)) {
            return res.status(400).json({ error: 'OTP code has expired. Please request a new OTP.' });
        }

        if (record.otp !== otp.toString().trim()) {
            return res.status(400).json({ error: 'Invalid OTP verification code' });
        }

        await pool.query(
            `UPDATE otp_verifications SET is_verified = TRUE WHERE LOWER(email) = $1`,
            [cleanEmail]
        );

        res.status(200).json({ message: 'Email verified successfully!' });
    } catch (err) {
        console.error('❌ Error in verifyOtp:', err);
        res.status(500).json({ error: 'Failed to verify OTP: ' + err.message });
    }
};

// 3. User Registration (Password Hashing with Salt + JWT)
const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email, and password are required' });
    }

    const cleanEmail = email.trim().toLowerCase();

    try {
        // Verify email OTP status
        const otpRecord = await pool.query(
            `SELECT is_verified FROM otp_verifications WHERE LOWER(email) = $1`,
            [cleanEmail]
        );

        if (otpRecord.rows.length === 0 || !otpRecord.rows[0].is_verified) {
            return res.status(400).json({ error: 'Email has not been verified via OTP yet' });
        }

        // Check if user already exists
        const existingUser = await pool.query(
            `SELECT id FROM users WHERE LOWER(email) = $1`,
            [cleanEmail]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // Password Hashing and Salting using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert new user
        const newUser = await pool.query(
            `INSERT INTO users (username, email, password_hash, role)
             VALUES ($1, $2, $3, 'user')
             RETURNING id, username, email, role, created_at`,
            [username.trim(), cleanEmail, hashedPassword]
        );

        const user = newUser.rows[0];
        const token = generateToken(user);

        res.status(201).json({
            message: 'User registered successfully',
            user: { id: user.id, username: user.username, email: user.email, role: user.role },
            token: token
        });
    } catch (err) {
        console.error('❌ Error in register:', err);
        res.status(500).json({ error: 'Failed to register user: ' + err.message });
    }
};

// 4. User Login (Password Compare + JWT)
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const cleanEmail = email.trim().toLowerCase();

    try {
        const userResult = await pool.query(
            `SELECT * FROM users WHERE LOWER(email) = $1`,
            [cleanEmail]
        );

        if (userResult.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = userResult.rows[0];

        // Compare password with salted hash
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = generateToken(user);

        res.status(200).json({
            message: 'Login successful',
            user: { id: user.id, username: user.username, email: user.email, role: user.role },
            token: token
        });
    } catch (err) {
        console.error('❌ Error in login:', err);
        res.status(500).json({ error: 'Login failed: ' + err.message });
    }
};

// 5. Reset Password Controller (Requires verified OTP)
const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.status(400).json({ error: 'Email, OTP, and new password are required' });
    }

    const cleanEmail = email.trim().toLowerCase();

    try {
        // Verify OTP status
        const otpRecord = await pool.query(
            `SELECT is_verified, otp, expires_at FROM otp_verifications WHERE LOWER(email) = $1`,
            [cleanEmail]
        );

        if (otpRecord.rows.length === 0) {
            return res.status(400).json({ error: 'No verification record found. Please request an OTP.' });
        }

        const record = otpRecord.rows[0];
        if (record.otp !== otp.toString().trim() && !record.is_verified) {
            return res.status(400).json({ error: 'OTP is not verified' });
        }

        // Verify user exists
        const userCheck = await pool.query(
            `SELECT id FROM users WHERE LOWER(email) = $1`,
            [cleanEmail]
        );

        if (userCheck.rows.length === 0) {
            return res.status(404).json({ error: 'User account not found' });
        }

        // Hash new password with salt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update password hash in users table
        await pool.query(
            `UPDATE users SET password_hash = $1 WHERE LOWER(email) = $2`,
            [hashedPassword, cleanEmail]
        );

        // Clear OTP record
        await pool.query(
            `DELETE FROM otp_verifications WHERE LOWER(email) = $1`,
            [cleanEmail]
        );

        res.status(200).json({ message: 'Password updated successfully! You can now log in.' });
    } catch (err) {
        console.error('❌ Error in resetPassword:', err);
        res.status(500).json({ error: 'Failed to reset password: ' + err.message });
    }
};

// 6. Get Current Authenticated User Details
const getMe = async (req, res) => {
    try {
        const userResult = await pool.query(
            `SELECT id, username, email, role, created_at FROM users WHERE id = $1`,
            [req.user.id]
        );

        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ user: userResult.rows[0] });
    } catch (err) {
        console.error('❌ Error in getMe:', err);
        res.status(500).json({ error: 'Failed to fetch user data: ' + err.message });
    }
};

module.exports = {
    checkEmail,
    sendOtp,
    verifyOtp,
    register,
    login,
    resetPassword,
    getMe
};
