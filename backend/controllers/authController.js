const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const Team = require('../models/Team');

// Register a new user
exports.register = async (req, res) => {
  let { email, phone, password } = req.body;
  
  email = email.trim().toLowerCase();
  phone = phone.replace(/\s+/g, '').trim();
  password = password.trim();

  const emailPattern = /^[a-zA-Z0-9]{10}@sru\.edu\.in$/;

  if (!emailPattern.test(email)) {
    return res.status(400).json({ msg: 'Invalid email. Please use your SRU email.' });
  }

  const phonePattern = /^[6-9]\d{9}$/;
  if (!phonePattern.test(phone)) {
    return res.status(400).json({ msg: 'Invalid phone number. Must be 10 digits.' });
  }

  const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/]).{8,}$/;

  if (!passwordPattern.test(password)) {
    return res.status(400).json({
      msg: 'Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.'
    });
  }
  
  try {
    let user = await User.findOne({ $or: [{ email }, { phone }] });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({
      email,
      phone,
      password,
      rawPassword: password
    });
    await user.save();

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.login = async (req, res) => {
  let { emailOrPhone, password } = req.body;
  emailOrPhone = emailOrPhone.trim();
  if (emailOrPhone.includes('@')) {
    emailOrPhone = emailOrPhone.toLowerCase();
  }
  password = password.trim();
  try {
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    }).populate('club'); // Populate the club details if necessary

    if (!user) return res.status(400).json({ msg: 'Email or phone not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Incorrect password' });

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        email: user.email,
        phone: user.phone, // Phone number in JWT payload
        club: user.club ? user.club : null, // Add club to JWT payload (null if no club)
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '3h',
      }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None',
      path: '/',
    });

    res.json({ token, role: user.role, club: user.club }); // Add club to response
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.logout = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'None', // Match this with the sameSite value used in login
    path: '/', // Ensure the path matches the login cookie
    expires: new Date(0), // Expire the cookie immediately
  });

  res.json({ msg: 'Logged out successfully' });
};

// Forgot password
exports.forgotPassword = async (req, res) => {
  let { email } = req.body;
  email = email.trim().toLowerCase(); // Convert email to lowercase
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User not found' });

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send email
    const resetURL = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to the following link to reset your password: \n\n ${resetURL}`;

    await sendEmail({
      email: user.email,
      subject: 'Password Reset Request',
      message,
    });

    res.json({ msg: 'Password reset link has been sent to your email.' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  let { token, newPassword } = req.body;
  token = token.trim();
  newPassword = newPassword.trim();

  // Strong password validation
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/]).{8,}$/;

  if (!passwordPattern.test(newPassword)) {
    return res.status(400).json({
      msg: 'Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.'
    });
  }

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid or expired token' });
    }

    // Update both hashed password and raw password
    user.password = newPassword;
    user.rawPassword = newPassword;

    // Clear reset token fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ msg: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// authController.js
exports.checkAuth = (req, res) => {
  // If the request reaches here, the user is authenticated
  console.log('User is logged in');
  res.status(200).json({ isAuthenticated: true, user: req.user });
};
