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
    type: [String],   // now storing an array of club names (strings)
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

  // New fields
  program: String,
  year: String,
  specialization: String,
  recommender1: String,
  recommender2: String,
  linkedin: String,
  facebook: String,
  instagram: String,
  other_media: String,
  github: String,
  youtube: String,
  cv: String,
  comment: {
    type: String,
    default: '',
  },
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
