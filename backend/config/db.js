const {Pool} = require('pg')
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASEURL,
    ssl:{rejectUnauthorized: false}
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('❌ Error acquiring client:', err.stack);
    }
    console.log('✅ Connected to Neon PostgreSQL Database successfully');
    release(); // Very important: release the connection back to the pool!
});
 
module.exports = pool;