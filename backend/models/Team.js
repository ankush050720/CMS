const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  members: {
    type: [String], // Array of user emails
    ref: 'User',
    required: true,
  },
  registeredEvents: [
    {
      eventId: {
        type: mongoose.Schema.Types.ObjectId, // Event reference
        ref: 'Event',
        required: true,
      },
      transactionId: {
        type: String, // Razorpay transaction ID for refund
        required: true,
      }
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('Team', teamSchema);