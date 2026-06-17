const poll = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Database-driven OTP configuration and email helper
let cachedEtherealTransporter = null;
const getEtherealTransporter = async () => {
    if (cachedEtherealTransporter) return cachedEtherealTransporter;
    console.log(`✉️ [SMTP Ethereal] Generating new test account...`);
    const testAccount = await nodemailer.createTestAccount();
    cachedEtherealTransporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    });
    return cachedEtherealTransporter;
};

const sendEmail = async (email, otp) => {
    const subject = "Verify Your Email Address";
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px; background-color: #ffffff;">
            <h2 style="color: #8e2382; text-align: center;">Verify Your Email Address</h2>
            <p>Hello,</p>
            <p>Your verification code is:</p>
            <div style="background-color: #fff5f8; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0;">
                <span style="font-size: 32px; font-weight: 800; letter-spacing: 5px; color: #e61e6e;">${otp}</span>
            </div>
            <p>This code will expire in 5 minutes.</p>
            <p style="font-size: 13px; color: #64748b; margin-top: 25px;">If you did not request this code, please ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #cbd5e1; margin: 30px 0 20px;" />
            <p style="font-size: 11px; color: #94a3b8; text-align: center;">&copy; 2026 HelpGlow NGO. All rights reserved.</p>
        </div>
    `;

    // 1. Try Resend if API key is present
    if (process.env.RESEND_API_KEY) {
        try {
            console.log(`✉️ [Resend API] Sending OTP to ${email}...`);
            const { Resend } = require("resend");
            const resend = new Resend(process.env.RESEND_API_KEY);
            const resendFrom = process.env.RESEND_FROM || 'noreply@helpglow.in';
            
            await resend.emails.send({
                from: `HelpGlow <${resendFrom}>`,
                to: email,
                subject: subject,
                html: html
            });
            console.log(`✅ [Resend API] Email sent to ${email}`);
            return { provider: 'resend', success: true };
        } catch (err) {
            console.error(`❌ [Resend API] Failed:`, err.message);
            if (!process.env.SMTP_USER) {
                throw new Error(`Resend API failed: ${err.message}`);
            }
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
            console.error(`❌ [SMTP Relay] Failed:`, err.message);
            throw err;
        }
    }

    // 3. Fallback: Ethereal Mail
    // Note: Render blocks all outbound SMTP traffic on port 587. If we are running in the Render environment 
    // without SMTP configuration, we must bypass nodemailer sendMail to prevent the request from hanging/timing out.
    if (process.env.RENDER) {
        console.log(`⚠️ [SMTP Ethereal] Detected Render environment. Bypassing SMTP mail send to prevent hanging. OTP is: ${otp}`);
        return { 
            provider: 'ethereal', 
            previewUrl: "https://ethereal.email (SMTP is blocked on Render. OTP printed below for dev convenience)", 
            success: true,
            otp
        };
    }

    console.log(`✉️ [SMTP Ethereal] Acquiring test account...`);
    const transporter = await getEtherealTransporter();

    const info = await transporter.sendMail({
        from: '"HelpGlow Dev" <no-reply@helpglow.org>',
        to: email,
        subject: subject,
        html: html
    });
    
    const previewUrl = nodemailer.getTestMessageUrl(info);
    console.log(`✉️ [SMTP Ethereal] Preview at: ${previewUrl}`);
    return { provider: 'ethereal', previewUrl, success: true, otp };
};

const sendOTP = async (req, res) => {
    const email = req.body.email || req.body.emailOrMobile;
    if (!email) {
        return res.status(400).json({ error: "Email address is required" });
    }

    try {
        // 1. Rate Limit Check: 60 seconds
        const existing = await poll.query('SELECT updated_at FROM otp_verifications WHERE email = $1', [email]);
        if (existing.rows.length > 0) {
            const lastUpdated = new Date(existing.rows[0].updated_at);
            const diffSeconds = (Date.now() - lastUpdated.getTime()) / 1000;
            if (diffSeconds < 60) {
                return res.status(429).json({ 
                    error: `Please wait ${Math.ceil(60 - diffSeconds)} seconds before requesting another code.` 
                });
            }
        }

        // 2. Generate 6-digit OTP and 5-min expiration
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

        // 3. Save OTP in DB (Upsert)
        await poll.query(`
            INSERT INTO otp_verifications (email, otp, expires_at, attempts, is_verified, updated_at)
            VALUES ($1, $2, $3, 0, FALSE, CURRENT_TIMESTAMP)
            ON CONFLICT (email)
            DO UPDATE SET otp = $2, expires_at = $3, attempts = 0, is_verified = FALSE, updated_at = CURRENT_TIMESTAMP;
        `, [email, otp, expiresAt]);

        console.log(`🔑 [OTP ENGINE] Generated OTP: ${otp} for ${email}`);

        // 4. Send Email
        const emailResult = await sendEmail(email, otp);

        const responseObj = { 
            message: "OTP sent successfully!" 
        };
        if (emailResult.provider === 'ethereal') {
            responseObj.devPreviewUrl = emailResult.previewUrl;
            responseObj.devMode = true;
            responseObj.otp = otp; // Expose OTP in JSON response for dev mode
        }
        return res.json(responseObj);

    } catch (err) {
        console.error("OTP Send Failure:", err);
        return res.status(500).json({ error: "Failed to send OTP verification code." });
    }
};

const verifyOTP = async (req, res) => {
    const email = req.body.email || req.body.emailOrMobile;
    const { otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ error: "Email and OTP code are required" });
    }

    try {
        const result = await poll.query('SELECT * FROM otp_verifications WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(400).json({ error: "No verification code requested for this email." });
        }

        const record = result.rows[0];

        // Check attempts
        if (record.attempts >= 5) {
            return res.status(400).json({ 
                error: "Maximum verification attempts (5) exceeded. Please request a new OTP." 
            });
        }

        // Check expiration
        const expiresAt = new Date(record.expires_at).getTime();
        if (Date.now() > expiresAt) {
            return res.status(400).json({ error: "OTP code has expired. Please request a new one." });
        }

        // Validate OTP
        if (record.otp !== otp.trim()) {
            const newAttempts = record.attempts + 1;
            await poll.query('UPDATE otp_verifications SET attempts = $1 WHERE email = $2', [newAttempts, email]);
            
            const remaining = 5 - newAttempts;
            if (remaining <= 0) {
                return res.status(400).json({ 
                    error: "Incorrect code. Maximum attempts exceeded. Please request a new OTP." 
                });
            }
            return res.status(400).json({ 
                error: `Incorrect verification code. ${remaining} attempts remaining.` 
            });
        }

        // Success! Set is_verified = TRUE and extend expiration to 15 mins for registration
        const extendedExpiry = new Date(Date.now() + 15 * 60 * 1000);
        await poll.query(
            'UPDATE otp_verifications SET is_verified = TRUE, expires_at = $1, attempts = 0 WHERE email = $2',
            [extendedExpiry, email]
        );

        return res.json({ success: true, message: "Email verified successfully!" });

    } catch (err) {
        console.error("OTP Verification Error:", err);
        return res.status(500).json({ error: "Error processing verification." });
    }
};

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // 1. Verify email has been validated in the database
        const verification = await poll.query(
            'SELECT * FROM otp_verifications WHERE email = $1 AND is_verified = TRUE',
            [email]
        );

        if (verification.rows.length === 0) {
            return res.status(400).json({ 
                error: "Email verification is required. Please verify your email via OTP before registering." 
            });
        }

        const record = verification.rows[0];
        const expiresAt = new Date(record.expires_at).getTime();
        if (Date.now() > expiresAt) {
            return res.status(400).json({ 
                error: "Email verification has expired. Please verify your email via OTP again." 
            });
        }

        // 2. Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Register user
        const query = 'INSERT INTO users(username, email, password_hash) VALUES($1, $2, $3) RETURNING id, username, email';
        const result = await poll.query(query, [username, email, hashedPassword]);
        
        // 4. Delete the OTP record after successful verification/registration
        await poll.query('DELETE FROM otp_verifications WHERE email = $1', [email]);

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Registration Error:", err.message);
        if (err.code === '23505') { // PostgreSQL unique violation code
            return res.status(400).json({ error: "An account with this email already exists." });
        }
        res.status(500).json({ error: "Registration failed. Please try again." });
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