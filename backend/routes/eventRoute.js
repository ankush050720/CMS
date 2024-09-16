const express = require('express');
const { 
  getAllEvents, 
  getEventById, 
  createEvent, 
  updateEvent, 
  deleteEvent, 
  leaveTeam, 
  acceptInvitation, 
  getRegisteredEvents, 
  getTeamDetails, 
  addMemberToTeam, 
  createTeam, 
  updateTeamName, 
  registerTeam, 
  getTeamByEmail 
} = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Event routes
router.get('/', getAllEvents);                       // Get all events
router.get('/:id', getEventById);                    // Get event by ID
router.post('/', createEvent);                       // Create new event
router.put('/:id', updateEvent);                     // Update event
router.delete('/:id', deleteEvent);                  // Delete event

// Team-related routes
router.post('/create', createTeam);                                     // Create new team
router.post('/team/update-name', updateTeamName);
router.post('/leave-team', authMiddleware, leaveTeam);                // Leave a team

// User-specific routes
router.get('/team/registered', authMiddleware, getRegisteredEvents);       // Get all events user is registered for
router.get('/team/details', authMiddleware, getTeamDetails);          // Get details of the user's team
router.post('/team/add-member', authMiddleware, addMemberToTeam);     // Add new member to team

// Invitation routes
router.post('/accept-invitation', acceptInvitation);                // Accept invitation to join a team
router.post('/:eventId/register-team', authMiddleware, registerTeam);
router.get('/team/get-team', authMiddleware, getTeamByEmail);

module.exports = router;