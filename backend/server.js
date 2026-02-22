const express = require('express')
const cors = require('cors')
require('dotenv').config();
const teamRoutes = require('./routes/teamRoute')
const authRoutes = require('./routes/authRoute')
const campaignRoutes = require('./routes/campaignRoutes');

const app = express();
// const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:5173', // Your React URL
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
