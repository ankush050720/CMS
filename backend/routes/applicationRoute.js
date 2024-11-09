const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const applicationController = require('../controllers/applicationController');

// POST request to submit a new application (requires authentication)
router.post("/", authMiddleware, applicationController.submitApplication);

// GET request to retrieve all applications (requires authentication)
router.get("/", authMiddleware, applicationController.getApplications);

//DELETE request to delete a application (requires authentication)
router.delete('/:id', authMiddleware, applicationController.deleteApplication);

module.exports = router;