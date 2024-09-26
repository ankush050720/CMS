const User = require('../models/User');
const sendEmail = require('../utils/sendEmail'); // Import the email utility

// Controller to get members of the same club
const getClubMembers = async (req, res) => {
  try {
    const clubId = req.user.club;
    console.log(clubId);
    // Fetch all users who are part of the same club
    const members = await User.find({ club: clubId }).sort({ role: 1 });

    // Separate faculty mentor and other members
    const facultyMentor = members.filter((member) => member.role === 'faculty mentor');
    const otherMembers = members.filter((member) => member.role !== 'faculty mentor');

    // Combine the faculty mentor at the top
    const sortedMembers = [...facultyMentor, ...otherMembers];

    res.status(200).json(sortedMembers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching club members', error });
  }
};


const showUsers = async (req, res) => {
  try {
    // Fetch users with role 'guest'
    const guestUsers = await User.find({
      role: 'guest',
    });

    res.status(200).json(guestUsers); // Send the guest users as response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching guest users', error });
  }
};


const addMember = async (req, res) => {
  try {
    const { email } = req.body; // Extract the email from request body
    const clubId = req.user.club; // Extract the clubId from the authenticated user
    const mail = email.email;

    // Find the user by email and ensure they are a guest
    const user = await User.findOne({ email: mail, role: 'guest' });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Update the user's role to 'member' and set their club
    user.role = 'member';
    user.club = clubId;
    await user.save(); // Save the updated user

    // Send email to the user
    await sendEmail({
      email: mail,
      subject: 'Membership Update',
      message: `You have been successfully added as a member of the club ${clubId.name}.`
    });

    // Find the faculty member of the same club
    const faculty = await User.findOne({ club: clubId, role: 'faculty mentor' });
    if (faculty) {
      // Send email to the faculty member
      await sendEmail({
        email: faculty.email,
        subject: 'New Member Added',
        message: `A new member has been added to your club: ${mail}.`
      });
    }

    res.status(200).json({ message: 'User role updated to member successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user role', error });
  }
};



const showRemovableMembers = async (req, res) => {
  try {
    const clubId = req.user.club;
    const removableRoles = ['faculty mentor', 'chairperson', 'vicechairperson'];
    
    const members = await User.find({
      club: clubId,
      role: { $nin: removableRoles }
    });

    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching removable members', error });
  }
};


const removeMember = async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Update the user's role to 'guest' and set their club to null
    user.role = 'guest';
    user.club = null;
    await user.save(); // Save the updated user

    // Send email to the user
    await sendEmail({
      email,
      subject: 'Membership Update',
      message: `You have been removed from the ${req.user.club.name}. Your role has been updated to guest.`
    });

    // Find the faculty member of the same club
    const faculty = await User.findOne({ club: req.user.club, role: 'faculty mentor' });
    if (faculty) {
      // Send email to the faculty member
      await sendEmail({
        email: faculty.email,
        subject: 'Member Removed',
        message: `The member ${email} has been removed from your club.`
      });
    }

    res.status(200).json({ message: 'Member removed successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing member', error });
  }
};


const changeRole = async (req, res) => {
  try {
    const { email, role } = req.body;

    // Find the member by email and club
    const member = await User.findOne({ email, club: req.user.club });
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    // Update the member's role
    member.role = role;
    await member.save(); // Save the updated member

    // Send email to the member
    await sendEmail({
      email,
      subject: 'Role Change Notification',
      message: `Your role in the club has been updated to ${role}.`
    });

    // Find the faculty member of the same club
    const faculty = await User.findOne({ club: req.user.club, role: 'faculty mentor' });
    if (faculty) {
      // Send email to the faculty member
      await sendEmail({
        email: faculty.email,
        subject: 'Role Change',
        message: `The role of member ${email} has been changed to ${role}.`
      });
    }

    res.status(200).json({ message: 'Role updated successfully.' });
  } catch (error) {
    console.error('Error changing role:', error);
    res.status(500).json({ message: 'Failed to change role', error });
  }
};


module.exports = {
  getClubMembers,
  showUsers,
  addMember,
  showRemovableMembers,
  removeMember, 
  changeRole
};
