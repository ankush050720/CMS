const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String, // Phone number field
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String, // Role is now an unrestricted string
    default: 'guest', // You can set a default value if needed
  },
  club: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Club model
    ref: 'Club',
    default:null, 
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

// Password hashing before saving the user
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
