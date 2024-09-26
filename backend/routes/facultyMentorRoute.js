const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const facultyMentorController = require('../controllers/facultyMentorController');

router.post('/update-proposal-status', authMiddleware, facultyMentorController.updateProposalStatus);
router.post("/add-chairperson", authMiddleware, facultyMentorController.addChairperson);
router.get("/members", authMiddleware, facultyMentorController.getClubMembers);
router.get("/leaders" , authMiddleware, facultyMentorController.getClubLeaders);
router.post("/remove-leader", authMiddleware, facultyMentorController.removeClubLeader);

module.exports = router;