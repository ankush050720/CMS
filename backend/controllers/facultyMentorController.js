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
    // Check if chairperson or vice-chairperson already exists
    const existingChair = await User.findOne({ club: user.club, role: 'chairperson' });
    const existingViceChair = await User.findOne({ club: user.club, role: 'vicechairperson' });

    if ((role === 'chairperson' && existingChair) || (role === 'vicechairperson' && existingViceChair)) {
      return res.status(400).json({ error: `${role} already exists.` });
    }

    // Update the selected member's role
    const member = await User.findById(memberId);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    member.role = role;
    await member.save();

    // Send an email to the new chairperson/vice-chairperson
    await sendEmail({
      email: member.email,
      subject: `Appointment as ${role}`,
      message: `Congratulations! You have been appointed as the ${role} of the club ${user.club.name}.`
    });

    return res.status(200).json({ message: `${role} added successfully and email notification sent to ${member.email}.` });
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

const getClubLeaders = async (req, res) => {
  try {
    const clubId = req.user.club;
    const chairperson = await User.findOne({ club: clubId, role: 'chairperson' });
    const viceChairperson = await User.findOne({ club: clubId, role: 'vicechairperson' });
    res.status(200).json({ chairperson, viceChairperson });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching club leaders' });
  }
};


const removeClubLeader = async (req, res) => {
  const { userId, role } = req.body;
  const clubName = req.user.club.name; // Assuming the faculty mentor is logged in

  try {
    // Find and update the user's role
    const user = await User.findByIdAndUpdate(userId, { role: 'member' }, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Construct the email subject and message
    const subject = `Role Change Notification`;
    const message = `Dear ${user.email},\n\nYou have been removed from the position of ${role} at ${clubName}. Your role has been updated to 'member'.\n\nBest regards,\nThe Club Team`;

    // Send the email
    await sendEmail({
      email: user.email,
      subject: subject,
      message: message,
    });

    res.status(200).json({ message: `${role} removed successfully and notification sent` });
  } catch (error) {
    console.error('Error removing club leader:', error);
    res.status(500).json({ message: 'Error removing club leader' });
  }
};


module.exports = {
  updateProposalStatus,
  addChairperson, 
  getClubMembers,
  getClubLeaders,
  removeClubLeader,  // Function to remove club leader
};
