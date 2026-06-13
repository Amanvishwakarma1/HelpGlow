const {Pool} = require('pg')
const bcrypt = require('bcryptjs');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASEURL,
    ssl:{rejectUnauthorized: false}
});

const initDb = async () => {
    try {
        // 1. Create users table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(100) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                role VARCHAR(50) DEFAULT 'user',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // 2. Create otp_verifications table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS otp_verifications (
                email VARCHAR(255) PRIMARY KEY,
                otp VARCHAR(10) NOT NULL,
                expires_at TIMESTAMP NOT NULL,
                attempts INT DEFAULT 0,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        
        // Dynamic migration: Ensure is_verified column exists if table was created in an older version
        await pool.query(`
            ALTER TABLE otp_verifications ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE;
        `);

        // 3. Create campaigns table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS campaigns (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                caption TEXT,
                location VARCHAR(255),
                media_url TEXT,
                is_video BOOLEAN DEFAULT FALSE,
                category VARCHAR(100) DEFAULT 'General',
                likes_count INT DEFAULT 0,
                created_by INT REFERENCES users(id),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // 4. Create campaign_likes table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS campaign_likes (
                id SERIAL PRIMARY KEY,
                user_id INT REFERENCES users(id) ON DELETE CASCADE,
                campaign_id INT REFERENCES campaigns(id) ON DELETE CASCADE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(user_id, campaign_id)
            );
        `);

        // 5. Create team_members table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS team_members (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                role VARCHAR(255),
                bio TEXT,
                email VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        
        console.log('✅ Database tables initialization complete');

        // 6. Admin Account Synchronization
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        const adminUsername = process.env.ADMIN_USERNAME || 'HelpGlow Admin';

        if (adminEmail && adminPassword) {
            console.log(`🔑 Syncing admin account: ${adminEmail}...`);
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(adminPassword, salt);

            const checkAdmin = await pool.query('SELECT id FROM users WHERE email = $1', [adminEmail]);
            
            if (checkAdmin.rows.length > 0) {
                // Admin exists, sync credentials
                await pool.query(
                    'UPDATE users SET username = $1, password_hash = $2, role = $3 WHERE email = $4',
                    [adminUsername, hashedPassword, 'admin', adminEmail]
                );
                console.log('✅ Admin credentials updated and synchronized successfully');
            } else {
                // Admin does not exist, create it
                await pool.query(
                    'INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4)',
                    [adminUsername, adminEmail, hashedPassword, 'admin']
                );
                console.log('✅ Admin account created successfully');
            }
        } else {
            console.log('⚠️ ADMIN_EMAIL or ADMIN_PASSWORD not set in env. Skipping admin sync.');
        }

    } catch (err) {
        console.error('❌ Failed to initialize database tables:', err);
    }
};

pool.connect((err, client, release) => {
    if (err) {
        return console.error('❌ Error acquiring client:', err.stack);
    }
    console.log('✅ Connected to Neon PostgreSQL Database successfully');
    release(); // Very important: release the connection back to the pool!
    initDb();
});
 
module.exports = pool;