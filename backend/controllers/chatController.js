const User = require('../models/User'); // Importing the User model

// Get clubId by email
exports.getClubIdByEmail = async (req, res) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email: req.params.email });

    // If user is not found, return a 404 error
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If user has no club associated, return a 404 error
    if (!user.club) {
      return res.status(404).json({ message: 'No club associated with this user' });
    }

    // Respond with the clubId
    res.json({ clubId: user.club });
  } catch (error) {
    // Catch any server errors
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all members by clubId
exports.getMembersByClubId = async (req, res) => {
  try {
    // Find all users with the matching clubId
    const members = await User.find({ club: req.params.clubId });

    // If no members are found, return a 404 error
    if (!members.length) {
      return res.status(404).json({ message: 'No members found for this club' });
    }

    // Respond with the list of members
    res.json(members);
  } catch (error) {
    // Catch any server errors
    res.status(500).json({ message: 'Server error' });
  }
};
