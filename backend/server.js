const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoute');
const uploadRoute = require('./routes/uploadRoute');
const donationRoutes = require('./routes/donationRoute');

const cookieParser = require('cookie-parser');

const app = express();

// Allowed Origins for CORS
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://helpglow-1.onrender.com",
  "https://helpglow.in",
  "https://www.helpglow.in"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        
        try {
            const hostname = new URL(origin).hostname;
            const isLocal = 
              hostname === 'localhost' || 
              hostname === '127.0.0.1' || 
              hostname === '[::1]' || 
              hostname.startsWith('192.168.') || 
              hostname.startsWith('10.') || 
              hostname.startsWith('172.') || 
              hostname.endsWith('.local');

            if (isLocal || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(null, true); // Permissive in dev mode
            }
        } catch (err) {
            callback(err);
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Health Check
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'HelpGlow2 backend is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoute);
app.use('/api/donations', donationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 HelpGlow2 backend server running on port ${PORT}`));
