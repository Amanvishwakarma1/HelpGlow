const pool = require('../config/db');

// 1. Create a new Donation record (Public / Logged in users)
const createDonation = async (req, res) => {
    const {
        donor_name,
        whatsapp,
        email,
        print_name,
        wishing_details,
        video_date,
        photo_url,
        amount,
        payment_screenshot_url,
        items
    } = req.body;

    if (!donor_name || !whatsapp || !print_name || !video_date || !amount || !payment_screenshot_url) {
        return res.status(400).json({ error: 'Please fill in all required donor fields and upload the payment receipt screenshot.' });
    }

    try {
        const userId = req.user ? req.user.id : null;

        const result = await pool.query(
            `INSERT INTO donations (
                user_id, donor_name, whatsapp, email, print_name, 
                wishing_details, video_date, photo_url, amount, 
                payment_screenshot_url, items, status
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 'Pending')
            RETURNING *`,
            [
                userId,
                donor_name.trim(),
                whatsapp.trim(),
                email ? email.trim() : null,
                print_name.trim(),
                wishing_details ? wishing_details.trim() : null,
                video_date,
                photo_url || null,
                amount,
                payment_screenshot_url,
                JSON.stringify(items || [])
            ]
        );

        res.status(201).json({
            message: 'Donation submitted successfully!',
            donation: result.rows[0]
        });
    } catch (err) {
        console.error('❌ Error creating donation:', err);
        res.status(500).json({ error: 'Failed to record donation: ' + err.message });
    }
};

// 2. Get All Donations (Admin Only)
const getAllDonations = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM donations ORDER BY created_at DESC`
        );

        res.status(200).json({
            count: result.rows.length,
            donations: result.rows
        });
    } catch (err) {
        console.error('❌ Error fetching donations:', err);
        res.status(500).json({ error: 'Failed to fetch donation history: ' + err.message });
    }
};

// 3. Update Donation Status (Admin Only)
const updateDonationStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Pending', 'Approved', 'Completed', 'Rejected'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status value. Must be Pending, Approved, Completed, or Rejected.' });
    }

    try {
        const result = await pool.query(
            `UPDATE donations SET status = $1 WHERE id = $2 RETURNING *`,
            [status, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Donation record not found' });
        }

        res.status(200).json({
            message: 'Donation status updated successfully',
            donation: result.rows[0]
        });
    } catch (err) {
        console.error('❌ Error updating donation status:', err);
        res.status(500).json({ error: 'Failed to update status: ' + err.message });
    }
};

module.exports = {
    createDonation,
    getAllDonations,
    updateDonationStatus
};
