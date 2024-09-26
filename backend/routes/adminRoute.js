const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const adminController = require('../controllers/adminController');

router.post("/update-proposal-status", authMiddleware, adminController.updateProposalStatus);
router.get("/get-proposals", authMiddleware, adminController.getProposals);
router.get('/get-members', authMiddleware, adminController.getMembers);
router.post('/add-new-club' , authMiddleware, adminController.addNewClub);
router.post('/remove-club', authMiddleware, adminController.removeClub);
router.get('/get-users', authMiddleware, adminController.getUsers);
router.post('/add-faculty', authMiddleware, adminController.addFaculty);
router.post('/remove-faculty', authMiddleware, adminController.removeFaculty);
router.get('/get-faculties', authMiddleware, adminController.getFaculties);

module.exports = router;