const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const memberController = require('../controllers/memberController');

// GET request to fetch members of the same club
router.get('/club-members', authMiddleware, memberController.getClubMembers);
router.get('/show-users', authMiddleware, memberController.showUsers);
router.post('/add-member', authMiddleware, memberController.addMember);
router.get('/removable-members', authMiddleware, memberController.showRemovableMembers);
router.post('/remove-member', authMiddleware, memberController.removeMember);
router.post('/change-role', authMiddleware, memberController.changeRole) ;

module.exports = router;