const express = require('express')
const cors = require('cors')
require('dotenv').config();
const teamRoutes = require('./routes/teamRoute')
const authRoutes = require('./routes/authRoute')
const campaignRoutes = require('./routes/campaignRoutes');

const app = express();
// const cors = require('cors');
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://helpglow-1.onrender.com"
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, postman)
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
                callback(new Error('Not allowed by CORS'));
            }
        } catch (err) {
            callback(err);
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/team',teamRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/campaigns', campaignRoutes);

const PORT = 5000
app.listen(PORT,()=>console.log("backend is running"));
