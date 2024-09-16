// src/models/eventModel.js

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  fee: {
    type: Number,
    required: true,
  },
  logo: {
    type: String,
    default: 'https://via.placeholder.com/150',
  },
  members: {
    type: String, // This allows flexibility for both ranges and fixed numbers
    required: true,
    validate: {
      validator: function (v) {
        return /^[0-9]+(-[0-9]+)?$/.test(v); // Validates "2" or "1-2"
      },
      message: props => `${props.value} is not a valid number or range!`
    }
  },
  club: {
    type: String, // Accepts club name directly as a string
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
