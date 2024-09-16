const Propose = require('../models/Propose');
const User = require('../models/User'); // Assuming this is the model for users
const sendEmail = require('../utils/sendEmail'); // Assuming sendMail.js is in the utils folder

// Controller function to handle proposal submission
const submitProposal = async (req, res) => {
  try {
    // Extract the club from the user data in the request (from the JWT token)
    const club = req.user.club;

    // Save the proposal
    const newProposal = new Propose({
      organizingBody: req.body.organizingBody,
      eventName: req.body.eventName,
      eventDate: req.body.eventDate,
      eventTime: req.body.eventTime,
      purpose: req.body.purpose,
      preferredVenue: req.body.preferredVenue,
      proposalInitiator: req.body.proposalInitiator,
      collaborations: req.body.collaborations,
      sponsors: req.body.sponsors,
      description: req.body.description,
      targetAudience: req.body.targetAudience,
      expectedParticipation: req.body.expectedParticipation,
      assistanceNeeded: req.body.assistanceNeeded,
      equipmentMaterials: req.body.equipmentMaterials,
      equipmentJustification: req.body.equipmentJustification,
      travelExpenses: req.body.travelExpenses,
      travelJustification: req.body.travelJustification,
      equipmentTotal: req.body.equipmentTotal,
      travelTotal: req.body.travelTotal,
      grandTotal: req.body.grandTotal,
      club: club // Use the club extracted from the token
    });

    const savedProposal = await newProposal.save();

    // Find the faculty mentor's email for the club from the User model
    const mentor = await User.findOne({ club, role: 'faculty mentor' }); // Assuming faculty mentors have a specific role

    if (!mentor) {
      return res.status(404).json({ message: 'Faculty mentor not found for the club' });
    }

    // Send an email to the faculty mentor
    const emailOptions = {
      email: mentor.email, // Faculty mentor's email
      subject: 'Event Proposal Request',
      message: `Dear Faculty Mentor,\n\nYou have received an event proposal. Kindly log in to review the proposal.\n\nPlease check the proposal here: ${process.env.FRONTEND_URL}/login\n\nBest regards,\nThe Club Portal Team`
    };

    await sendEmail(emailOptions);

    res.status(201).json(savedProposal);
  } catch (error) {
    console.error('Error submitting proposal:', error);
    res.status(500).json({ message: 'Error saving proposal or sending email', error });
  }
};

const getProposal = async (req, res) => {
  try {
    // Extract the club from the user data in the request
    const club = req.user.club;
    
    // Find all proposals associated with the club
    const proposals = await Propose.find({ club: club }).sort({ createdAt: -1 }); // Sort by creation date (most recent first)
    
    // Send the proposals as a response
    res.status(200).json(proposals);
  } catch (error) {
    console.error('Error fetching proposals:', error);
    res.status(500).json({ message: 'Error fetching proposals', error });
  }
};

module.exports = {
  submitProposal,
  getProposal
};
