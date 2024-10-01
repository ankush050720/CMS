const razorpay = require('../config/razorpayConfig');
const dotenv = require('dotenv');
const Event = require('../models/Event.js');
const Team = require('../models/Team.js');


exports.simplePaymentGateway = async (req, res) => {
  const { amount, email, eventId, teamId } = req.body;
  try {

    const event = await Event.findById(eventId);
    const team = await Team.findById(teamId);

    if (!event || !team) {
      return res.status(404).json({ message: 'Event or team not found' });
    }

    // Check if the team is already registered for the event
    if (team.registeredEvents.includes(eventId)) {
      return res.status(400).json({ message: 'Team is already registered for this event' });
    }

    const options = {
      amount: amount * 100, // Convert amount to paise
      currency: "INR",
      receipt: `receipt#${Math.floor(Math.random() * 10000)}`,
      notes: {
        email,
      },
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({ id: order.id });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
