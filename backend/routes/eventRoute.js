// src/routes/eventRoutes.js

const express = require('express');
const { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const router = express.Router();

// GET /api/events - Get all events
router.get('/', getAllEvents);

// GET /api/events/:id - Get event by ID
router.get('/:id', getEventById);

// POST /api/events - Create new event
router.post('/', createEvent);

// PUT /api/events/:id - Update event by ID
router.put('/:id', updateEvent);

// DELETE /api/events/:id - Delete event by ID
router.delete('/:id', deleteEvent);

module.exports = router;