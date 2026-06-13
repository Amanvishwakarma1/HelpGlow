const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Helper to upload a buffer stream to Cloudinary
 * @param {Buffer} fileBuffer - File buffer from multer
 * @param {string} resourceType - 'image', 'video', or 'auto'
 * @returns {Promise<object>} Cloudinary upload result
 */
const uploadToCloudinary = (fileBuffer, resourceType = 'auto') => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: 'helpglow_campaigns',
                resource_type: resourceType
            },
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            }
        );
        uploadStream.end(fileBuffer);
    });
};

module.exports = { cloudinary, uploadToCloudinary };
