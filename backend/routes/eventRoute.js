const express = require('express');
const { 
  getAllEvents,  
  createEvent,   
  leaveTeam, 
  acceptInvitation, 
  getRegisteredEvents, 
  getTeamDetails, 
  addMemberToTeam, 
  createTeam, 
  updateTeamName, 
  registerTeam, 
  getTeamByEmail, 
  getClubEvents,
  removeEvent,
  getOngoingEvents, 
  getUpcomingEvents, 
  getClosedEvents, 
  closeRegistration,
  closeEvent,
  closeFeedback,
  checkVenue
} = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Event routes
router.get('/', getAllEvents);                       // Get all events
router.get('/check-venue', authMiddleware , checkVenue)
router.post('/create-event',authMiddleware, createEvent);                       // Create new event                // Update event
router.delete('/remove-event', authMiddleware, removeEvent);                  // Delete event
router.get('/get-club-events', authMiddleware, getClubEvents); // Get events
router.get('/get-upcoming-events', authMiddleware, getUpcomingEvents); // Get events
router.get('/get-ongoing-events', authMiddleware, getOngoingEvents); // Get events with
router.get('/get-closed-events', authMiddleware, getClosedEvents); // Get events

// Team-related routes
router.post('/create', createTeam);                                     // Create new team
router.post('/team/update-name', updateTeamName);                       // Update Team name 
router.post('/leave-team', authMiddleware, leaveTeam);                // Leave a team

// User-specific routes
router.get('/team/registered', authMiddleware, getRegisteredEvents);   // Get all events user is registered for
router.get('/team/details', authMiddleware, getTeamDetails);          // Get details of the user's team
router.post('/team/add-member', authMiddleware, addMemberToTeam);     // Add new member to team

// Invitation routes
router.post('/accept-invitation', acceptInvitation);                  // Accept invitation to join a team
router.post('/:eventId/register-team', authMiddleware, registerTeam);
router.get('/team/get-team', authMiddleware, getTeamByEmail);

// Update routes
router.put('/close-registration', authMiddleware, closeRegistration); 
router.put('/close-event', authMiddleware, closeEvent);
router.put('/close-feedback', authMiddleware, closeFeedback);

module.exports = router;