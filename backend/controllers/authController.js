const poll = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// In-memory OTP Cache (100% Free & Self-Healing)
const otpCache = new Map();

const sendOTP = async (req, res) => {
    const { emailOrMobile } = req.body;
    if (!emailOrMobile) {
        return res.status(400).json({ error: "Email or Mobile number is required" });
    }

    try {
        // 1. Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = Date.now() + 5 * 60 * 1000; // 5 mins expiration

        // 2. Cache the OTP
        otpCache.set(emailOrMobile, { otp, expiresAt });

        console.log(`\n🔑 [OTP ENGINE] Generated OTP: ${otp} for ${emailOrMobile}`);

        // 3. Send via Email or Mobile
        if (emailOrMobile.includes('@')) {
            // Nodemailer configuration
            let transporter;
            let usingTestAccount = false;

            if (process.env.SMTP_USER && process.env.SMTP_PASS) {
                transporter = nodemailer.createTransport({
                    host: process.env.SMTP_HOST || 'smtp.gmail.com',
                    port: parseInt(process.env.SMTP_PORT) || 587,
                    secure: process.env.SMTP_SECURE === 'true',
                    auth: {
                        user: process.env.SMTP_USER,
                        pass: process.env.SMTP_PASS
                    }
                });
            } else {
                // Dynamic Ethereal test account (100% Free real email inspector!)
                usingTestAccount = true;
                const testAccount = await nodemailer.createTestAccount();
                transporter = nodemailer.createTransport({
                    host: "smtp.ethereal.email",
                    port: 587,
                    secure: false,
                    auth: {
                        user: testAccount.user,
                        pass: testAccount.pass
                    }
                });
            }

            const mailOptions = {
                from: `"HelpGlow Security" <${process.env.SMTP_USER || 'no-reply@helpglow.org'}>`,
                to: emailOrMobile,
                subject: "Your HelpGlow Verification Code",
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
                        <h2 style="color: #8e2382; text-align: center;">HelpGlow Identity Verification</h2>
                        <p>Hello,</p>
                        <p>Thank you for registering with HelpGlow! Please use the following 6-digit One-Time Password (OTP) to complete your account registration:</p>
                        <div style="background-color: #fff5f8; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0;">
                            <span style="font-size: 32px; font-weight: 800; letter-spacing: 5px; color: #e61e6e;">${otp}</span>
                        </div>
                        <p style="font-size: 12px; color: #64748b;">This OTP code is valid for the next 5 minutes. If you did not request this code, please ignore this email.</p>
                        <hr style="border: none; border-top: 1px solid #cbd5e1; margin-top: 30px;" />
                        <p style="font-size: 10px; color: #94a3b8; text-align: center;">&copy; 2026 HelpGlow Community NGO. All rights reserved.</p>
                    </div>
                `
            };

            const info = await transporter.sendMail(mailOptions);

            if (usingTestAccount) {
                const previewUrl = nodemailer.getTestMessageUrl(info);
                console.log(`✉️ [SMTP Test] Preview sent mail at: ${previewUrl}`);
                return res.json({ 
                    message: `OTP sent successfully! Preview link is logged in the backend terminal console.`, 
                    devPreviewUrl: previewUrl,
                    devMode: true 
                });
            }
        } else {
            // For mobile numbers, print code to console and try to send via free public Textbelt API (1 free SMS/day)
            console.log(`📲 [SMS OTP] Printed code to console for phone: ${emailOrMobile}`);
            
            try {
                const axios = require('axios');
                let formattedPhone = emailOrMobile.trim();
                if (!formattedPhone.startsWith('+')) {
                    formattedPhone = '+91' + formattedPhone; // Default to India
                }
                
                const textbeltRes = await axios.post('https://textbelt.com/text', {
                    phone: formattedPhone,
                    message: `Your HelpGlow verification code is: ${otp}`,
                    key: 'textbelt'
                });
                
                if (textbeltRes.data && textbeltRes.data.success) {
                    console.log(`📲 [SMS Textbelt] Real SMS sent successfully to ${formattedPhone}!`);
                } else {
                    console.log(`📲 [SMS Textbelt Quota] Free tier limit reached or error: ${textbeltRes.data.error || 'Unknown error'}`);
                }
            } catch (smsErr) {
                console.log(`📲 [SMS Textbelt Error] Could not send real SMS: ${smsErr.message}`);
            }
        }

        return res.json({ 
            message: "OTP sent successfully! (Check your terminal console if on local/SMS dev mode)" 
        });

    } catch (err) {
        console.error("OTP Send Failure: ", err);
        return res.status(500).json({ error: "Failed to send OTP verification code." });
    }
};

const verifyOTP = async (req, res) => {
    const { emailOrMobile, otp } = req.body;
    if (!emailOrMobile || !otp) {
        return res.status(400).json({ error: "Email/Mobile and OTP code are required" });
    }

    const cachedData = otpCache.get(emailOrMobile);
    if (!cachedData) {
        return res.status(400).json({ error: "No verification code requested for this identity" });
    }

    if (Date.now() > cachedData.expiresAt) {
        otpCache.delete(emailOrMobile);
        return res.status(400).json({ error: "OTP code has expired. Please request a new one." });
    }

    if (cachedData.otp !== otp.trim()) {
        return res.status(400).json({ error: "Incorrect verification code. Please try again." });
    }

    // OTP validated successfully! Clear it from cache
    otpCache.delete(emailOrMobile);
    return res.json({ success: true, message: "OTP identity verified successfully!" });
};

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

module.exports = { register, login, sendOTP, verifyOTP };