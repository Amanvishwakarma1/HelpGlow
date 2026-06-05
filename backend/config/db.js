const {Pool} = require('pg')
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASEURL,
    ssl:{rejectUnauthorized: false}
});

const initDb = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS otp_verifications (
                email VARCHAR(255) PRIMARY KEY,
                otp VARCHAR(10) NOT NULL,
                expires_at TIMESTAMP NOT NULL,
                attempts INT DEFAULT 0,
                is_verified BOOLEAN DEFAULT FALSE,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✅ otp_verifications table is ready');
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