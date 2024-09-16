const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  members: {
    type: [String],  // Array of user emails
    ref: 'User',
    required: true,
  },
  registeredEvents: [{
    type: mongoose.Schema.Types.ObjectId, // Use ObjectId for event references
    ref: 'Event',
    default: [] // Default value set to an empty array
  }],
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: false,
  }
}, { timestamps: true });

module.exports = mongoose.model('Team', teamSchema);
