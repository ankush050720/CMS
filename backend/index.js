const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/dbConfig');
const authRoute = require('./routes/authRoute');
const clubRoute = require('./routes/clubRoute');
const eventRoutes = require('./routes/eventRoute');
const paymentRoute = require('./routes/paymentRoute');
const userRoute = require('./routes/userRoute');
const proposeRoutes = require('./routes/proposeRoute');
const memberRoute = require('./routes/memberRoute');
const facultyMentorRoute = require('./routes/facultyMentorRoute')
const scoreRoute = require('./routes/scoreRoute');
const adminRoute = require('./routes/adminRoute');
const chatRoute = require('./routes/chatRoute');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
app.use(express.json());
app.use(cookieParser());

//Init cross-origin request handlers
// Update your CORS configuration
app.use(cors({
  origin: [
    process.env.FRONTEND_URL, 
    process.env.CHAT_FRONTEND_URL, 
    process.env.CHAT_BACKEND_URL
  ], // Allow frontend of both systems
  credentials: true, // Allow credentials (cookies)
}));

// Connect to Database
connectDB();

// Routes
app.use('/api/auth', authRoute);
app.use('/api', clubRoute); 
app.use('/api/events', eventRoutes);
app.use('/api', paymentRoute);
app.use('/user', userRoute);
app.use('/api/propose', proposeRoutes);
app.use('/api/members', memberRoute);
app.use('/api/proposals', facultyMentorRoute);
app.use('/api/admin', adminRoute);
app.use('/api/score', scoreRoute);
app.use('/api/chat', chatRoute);

// Listen on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));