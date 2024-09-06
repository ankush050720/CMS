const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/dbConfig');
const authRoute = require('./routes/authRoute');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
app.use(express.json());

//Init cross-origin request handlers
app.use(cors({ origin: 'http://localhost:3000' }));

// Connect to Database
connectDB();

// Routes
app.use('/api/auth', authRoute);


// Listen on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));