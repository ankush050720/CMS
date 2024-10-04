const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const axios = require('axios');

//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public

// const allUsers = asyncHandler(async (req, res) => {
//   const keyword = req.query.search
//     ? {
//         $or: [
//           { name: { $regex: req.query.search, $options: "i" } },
//           { email: { $regex: req.query.search, $options: "i" } },
//         ],
//       }
//     : {};

//   // Combine both conditions
//   const users = await User.find({
//     ...keyword, // spread the search criteria
//     _id: { $ne: req.user.id }, // exclude the logged-in user
//   });

//   res.send(users);
// });

const allUsers = asyncHandler(async (req, res) => {

  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  try {
    const response = await axios.get(`http://localhost:5000/api/chat/getClubIdByEmail/${req.user.email}`);
    const { clubId } = response.data;

    const membersResponse = await axios.get(`http://localhost:5000/api/chat/${clubId}/members`);
    const clubMembers = membersResponse.data;

    const users = await User.find({
      ...keyword, // spread the search criteria
      _id: { $ne: req.user.id }, // exclude the logged-in user
    });

    const filteredUsers = users.filter((user) =>
      clubMembers.some((member) => member.email === user.email)
    );

    res.send(filteredUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send({ message: 'Server error', error });
  }
});

//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = { allUsers, registerUser, authUser };