const express = require('express');
const { getClubIdByEmail, getMembersByClubId } = require('../controllers/chatController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Route to get the clubId by user's email
router.get('/getClubIdByEmail/:email',getClubIdByEmail);

// Route to get all members by clubId
router.get('/:clubId/members',getMembersByClubId);

module.exports = router;