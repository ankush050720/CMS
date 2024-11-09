const mongoose = require('mongoose');

// Define the schema for the application model
const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  hallTicket: {
    type: String,
    required: true,
  },
  clubName: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Club model
    ref: 'Club', // Assuming you have a Club model
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    default: '',
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the model
const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;