const Proposal = require('../models/Propose');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail'); // Import the sendEmail function

const updateProposalStatus = async (req, res) => {
  const { proposalId, action, comment } = req.body;
  console.log(proposalId, action);
  try {
    const proposal = await Proposal.findById(proposalId);
    if (!proposal) {
      return res.status(404).json({ message: 'Proposal not found' });
    }

    const user = req.user; // Assuming the faculty mentor is logged in

    // Determine who to email and set proposal status
    if (action === "decline") {
      proposal.status = "Declined by the Faculty Member";
      proposal.comment = comment;
      await proposal.save();

      // Send email to chairperson and vice-chairperson if they exist
      const chairperson = await User.findOne({ role: 'chairperson', club: user.club });
      const viceChairperson = await User.findOne({ role: 'vicechairperson', club: user.club });

      const recipients = [];
      if (chairperson && chairperson.email) {
        recipients.push(chairperson.email);
      }
      if (viceChairperson && viceChairperson.email) {
        recipients.push(viceChairperson.email);
      }

      if (recipients.length > 0) {
        await sendEmail({
          email: recipients.join(', '), // Convert array to comma-separated string
          subject: 'Proposal Declined By Faculty Mentor',
          message: `The proposal from your club has been declined by the Faculty Mentor.`
        });
      }

      return res.status(200).json({ message: 'Proposal declined', updatedStatus: proposal.status });
    } else if (action === "accept") {
      proposal.status = "Accepted by the Faculty Member";
      proposal.comment = comment;
      await proposal.save();

      // Send email to the admin
      const admin = await User.findOne({ role: 'admin' });
      if (admin && admin.email) {
        await sendEmail({
          email: admin.email,
          subject: 'Proposal Review Request',
          message: `A proposal from the ${user.club.name} club has been accepted by the Faculty Mentor. Please review it at the following link: ${process.env.FRONTEND_URL}/login`
        });
      }

      // Send email to chairperson and vice-chairperson if they exist
      const chairperson = await User.findOne({ role: 'chairperson', club: user.club });
      const viceChairperson = await User.findOne({ role: 'vicechairperson', club: user.club });

      const recipients = [];
      if (chairperson && chairperson.email) {
        recipients.push(chairperson.email);
      }
      if (viceChairperson && viceChairperson.email) {
        recipients.push(viceChairperson.email);
      }

      if (recipients.length > 0) {
        await sendEmail({
          email: recipients.join(', '), // Convert array to comma-separated string
          subject: 'Proposal Accepted By Faculty Mentor',
          message: `The proposal from your club has been accepted by the Faculty Mentor and forwarded to dean for further review.`
        });
      }

      return res.status(200).json({ message: 'Proposal accepted', updatedStatus: proposal.status });
    }

  } catch (error) {
    console.error('Error updating proposal status:', error);
    return res.status(500).json({ message: 'Failed to update proposal status', error });
  }
};

const addChairperson = async (req, res) => {
  const { role, memberId } = req.body;
  const user = req.user; // faculty mentor making the request

  try {
    // Check if chairperson or vicechairperson already exists
    const existingChair = await User.findOne({ club: user.club, role: 'chairperson' });
    const existingViceChair = await User.findOne({ club: user.club, role: 'vicechairperson' });

    if ((role === 'chairperson' && existingChair) || (role === 'vicechairperson' && existingViceChair)) {
      return res.status(400).json({ error: `${role} already exists.` });
    }

    // Update selected member's role
    const member = await User.findById(memberId);
    member.role = role;
    await member.save();

    return res.status(200).json({ message: `${role} added successfully.` });
  } catch (error) {
    console.error("Error adding chairperson:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

const getClubMembers = async (req, res) => {
  const mentor = req.user;
  console.log(mentor.club._id);
  try {
    const clubMembers = await User.find({
      club: mentor.club._id,
      role: { $ne: 'faculty mentor' }, // Exclude faculty mentor
    });

    if (!clubMembers) {
      return res.status(404).json({ error: 'No members found in the club' });
    }

    return res.status(200).json(clubMembers);
  } catch (error) {
    console.error("Error fetching club members:", error);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  updateProposalStatus,
  addChairperson, 
  getClubMembers
};
