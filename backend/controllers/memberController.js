const User = require('../models/User');

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
    // Find the user by email
    const user = await User.findOne({ email:mail , role:'guest'});
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    // Update the user's role to 'member' and set their club
    user.role = 'member';
    user.club = clubId;

    await user.save(); // Save the updated user

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

    // Update the user's role to 'guest' and set club to null
    user.role = 'guest';
    user.club = null;

    await user.save();
    
    res.status(200).json({ message: 'Member removed successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing member', error });
  }
};

const changeRole = async (req, res) => {
  try {
    const { email, role } = req.body;
    const member = await User.findOne({ email, club: req.user.club });
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    // Update the member's role
    member.role = role;
    await member.save();

    res.status(200).json({ message: 'Role updated successfully' });
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
