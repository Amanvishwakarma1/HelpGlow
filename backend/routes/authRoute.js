const express = require('express');
const router = express.Router();
const { checkEmail, sendOtp, verifyOtp, register, login, resetPassword, getMe, googleAuth, refreshToken, logoutUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// OTP & Verification Routes
router.post('/check-email', checkEmail);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);

// Auth Routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', resetPassword);
router.post('/google', googleAuth);
router.post('/refresh', refreshToken);
router.post('/logout', logoutUser);
router.get('/me', protect, getMe);

module.exports = router;
