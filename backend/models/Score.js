// models/Score.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Score schema
const ScoreSchema = new Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event', // Reference to the Event model
    required: true
  },
  guest: {
    type: [Number], // Array of guest ratings
  },
  faculty: {
    type: Number, // Faculty member's rating
  },
  admin: {
    type: Number, // Admin's rating
  },
  user: [{ // Array of ObjectIds for users who submitted the score
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Reference to the User model
  }]
},
 {
  timestamps: true // Automatically add createdAt and updatedAt fields
});

// Create the Score model
const Score = mongoose.model('Score', ScoreSchema);

module.exports = Score;