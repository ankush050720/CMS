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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
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
  program: {
    type: String,
  },
  year: {
    type: String,
  },
  specialization: {
    type: String,
  },
  recommender1: {
    type: String,
  },
  recommender2: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  facebook: {
    type: String,
  },
  instagram: {
    type: String,
  },
  other_media: {
    type: String,
  },
  github: {
    type: String,
  },
  youtube: {
    type: String,
  },
  cv: {
    type: String,
  },
  comment: {
    type: String,
    default: '',
  },
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
