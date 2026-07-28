const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadToCloudinary } = require('../config/cloudinary');

// Setup multer in-memory storage for handling uploads
const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 50 * 1024 * 1024 // 50MB max file size
    }
});

// POST /api/upload - Upload a file (photos/receipts) to Cloudinary
router.post('/', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const isVideo = req.file.mimetype.startsWith('video');
        const resourceType = isVideo ? 'video' : 'image';

        console.log(`📤 Uploading ${req.file.originalname} (${req.file.mimetype}) to Cloudinary...`);
        const result = await uploadToCloudinary(req.file.buffer, resourceType);
        console.log(`✅ Upload complete! Cloudinary URL: ${result.secure_url}`);

        res.status(200).json({
            url: result.secure_url,
            is_video: isVideo,
            public_id: result.public_id
        });
    } catch (error) {
        console.error('❌ Cloudinary upload error:', error);
        res.status(500).json({ error: 'Cloudinary upload failed: ' + error.message });
    }
});

module.exports = router;
