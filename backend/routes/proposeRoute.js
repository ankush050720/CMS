// routes/proposeRoutes.js
const express = require('express');
const router = express.Router();
const proposeController = require('../controllers/proposeController');
const authMiddleware = require('../middlewares/authMiddleware'); // Adjust the path as needed

// POST request to save event proposal
router.post('/submit', authMiddleware, proposeController.submitProposal);
router.get('/get-proposal', authMiddleware, proposeController.getProposal);

module.exports = router;