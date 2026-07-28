const express = require('express');
const router = express.Router();
const { createDonation, getAllDonations, updateDonationStatus } = require('../controllers/donationController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Optional auth wrapper middleware (extracts user if token present, but allows guest submissions)
const optionalAuth = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        return protect(req, res, next);
    }
    next();
};

// Public / User Routes
router.post('/', optionalAuth, createDonation);

// Admin-Only Routes
router.get('/', protect, adminOnly, getAllDonations);
router.put('/:id/status', protect, adminOnly, updateDonationStatus);

module.exports = router;
