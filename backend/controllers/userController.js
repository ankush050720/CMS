exports.getMe = async (req, res) => {
    try {
      // Access user information directly from req.user set by authMiddleware
      const { email, role, phone } = req.user; // Include phone number
      res.json({ email, role, phone }); // Return user details (email, role, and phone)
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  };
  