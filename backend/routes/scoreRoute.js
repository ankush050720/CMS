const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { getScore, postScore } = require('../controllers/scoreController.js'); // Assuming you meant scoreController

// Endpoint to get score by eventId
router.get('/:eventId',  getScore); // Use :eventId for dynamic route parameter

// Endpoint to post a score
router.post('/', authMiddleware, postScore);

module.exports = router;