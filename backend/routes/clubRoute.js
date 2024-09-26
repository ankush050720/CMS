const express = require('express');
const { getClubName, saveClubData, getAllClubs, getClubMembers, updateClubMember,  deleteClubMember, saveClubEvents, updateEvent, deleteEvent, getClubEvents } = require('../controllers/clubController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// POST - Save club data
router.post('/clubs', authMiddleware, saveClubData);

// PUT
router.put('/clubs/:email', authMiddleware, updateClubMember);
 
// DELETE
router.delete('/clubs/:email', authMiddleware, deleteClubMember);


// GET - Retrieve all clubs
router.get('/clubs', getAllClubs);
router.get('/club-name', authMiddleware ,getClubName);
router.get('/club-members', authMiddleware, getClubMembers);
router.get('/clubs/events', authMiddleware, getClubEvents);

// POST - Save club events
router.post('/clubs/events', authMiddleware, saveClubEvents);

// PUT - Update an event
router.put('/clubs/events/:eventId', authMiddleware, updateEvent);

// DELETE - Delete an event
router.delete('/clubs/events/:eventId', authMiddleware, deleteEvent);

module.exports = router;