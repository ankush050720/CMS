const Event = require('../models/Event.js');
const Team = require('../models/Team.js');
const User = require('../models/User.js');
const sendEmail = require('../utils/sendEmail');
const Invitation = require('../models/Invite');
const crypto = require('crypto');

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('club');  // Populate to include club info
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
};

// Get event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('club');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event', error });
  }
};

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const { name, description, date, time, venue, fee, club, logo, members } = req.body;

    const event = new Event({
      name,
      description,
      date,
      time,
      venue,
      fee,
      club,
      logo,
      members
    });

    await event.save();
    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error });
  }
};

// Update event
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event updated successfully', event });
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error });
  }
};

// Delete event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error });
  }
};

// Get all events a user is registered for
exports.getRegisteredEvents = async (req, res) => {
  const userEmail = req.user.email; // Assuming user is authenticated and email is available

  try {
    // Find all teams the user is part of
    const teams = await Team.find({ members: userEmail })
      .select('registeredEvents') // Ensure only the registeredEvents field is selected
      .populate('registeredEvents'); // Populate the registeredEvents field

    // Debugging: Check what is being fetched
    console.log('Teams with registered events:', teams);

    // Collect all registered events from all teams
    const registeredEvents = teams.flatMap(team => team.registeredEvents);

    // Debugging: Check the registered events
    console.log('Registered events:', registeredEvents);

    res.status(200).json({ registeredEvents });
  } catch (error) {
    console.error('Error fetching registered events:', error.message);
    res.status(500).json({ message: 'Error fetching registered events', error });
  }
};


// Get team details
exports.getTeamDetails = async (req, res) => {
  const userEmail = req.user.email; // Assuming user is authenticated

  try {
    const team = await Team.findOne({ members: userEmail });

    if (!team) return res.status(404).json({ message: 'Team not found for user' });

    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team details', error });
  }
};

exports.addMemberToTeam = async (req, res) => {
  const { teamId, newMemberEmail } = req.body;
  console.log(teamId);
  console.log(newMemberEmail);
  try {
    const user = await User.findOne({ email: newMemberEmail });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if the new member is already part of another team
    const existingTeam = await Team.findOne({ members: newMemberEmail });
    if (existingTeam) return res.status(400).json({ message: 'User is already part of another team' });

    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: 'Team not found' });

    // Check if the member is already in the team
    if (team.members.includes(newMemberEmail)) {
      return res.status(400).json({ message: 'User is already in the team' });
    }

    // Create invitation token and send email
    const token = crypto.randomBytes(32).toString('hex');
    const invitation = new Invitation({ email: newMemberEmail, teamId, token });
    await invitation.save();

    const acceptLink = `${process.env.FRONTEND_URL}/accept-invitation?token=${token}`;
    await sendEmail({
      email: newMemberEmail,
      subject: 'Team Invitation',
      message: `You've been invited to join the team ${team.name}. Click the link to accept: ${acceptLink}`
    });

    res.status(200).json({ message: 'Invitation sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding member', error });
  }
};

// Update team name
exports.updateTeamName = async (req, res) => {
  const { teamId, newTeamName } = req.body;
  
  try {
    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ message: 'Team not found' });
    
    team.name = newTeamName;
    await team.save();
    
    res.status(200).json({ message: 'Team name updated successfully', team });
  } catch (error) {
    res.status(500).json({ message: 'Error updating team name', error });
  }
};


// Leave team
exports.leaveTeam = async (req, res) => {
  const { teamId, userEmail } = req.body;

  try {
    const team = await Team.findById(teamId);

    if (!team) return res.status(404).json({ message: 'Team not found' });

    team.members = team.members.filter(member => member !== userEmail);

    await team.save();

    res.status(200).json({ message: 'You have successfully left the team' });
  } catch (error) {
    res.status(500).json({ message: 'Error leaving team', error });
  }
};


exports.acceptInvitation = async (req, res) => {
  const { token } = req.body;

  try {
    // Find the invitation by token
    const invitation = await Invitation.findOne({ token, status: 'pending' });
    if (!invitation) return res.status(404).json({ message: 'Invalid or expired invitation' });

    // Find the team and check if the user is already a member
    const team = await Team.findById(invitation.teamId);
    if (!team) return res.status(404).json({ message: 'Team not found' });
    
    if (team.members.includes(invitation.email)) {
      return res.status(400).json({ message: 'You are already a member of this team' });
    }

    // Add the user to the team
    team.members.push(invitation.email);
    await team.save();

    // Mark invitation as accepted
    invitation.status = 'accepted';
    await invitation.save();

    res.status(200).json({ message: 'Invitation accepted, you are now a member of the team', team });
  } catch (error) {
    res.status(500).json({ message: 'Error accepting invitation', error });
  }
};

// Controller to handle creating a new team
exports.createTeam = async (req, res) => {
  const { teamName, userEmail } = req.body; // Extract team name and user's email from request body

  try {
    // Check if the team name already exists
    const existingTeam = await Team.findOne({ name: teamName });
    if (existingTeam) {
      return res.status(400).json({ message: 'Team name already exists' });
    }

    // Find the user who is creating the team
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create the team and add the user as the first member
    const newTeam = new Team({
      name: teamName,
      members: [user.email]
    });

    await newTeam.save(); // Save the team to the database

    // Respond with the newly created team
    return res.status(201).json(newTeam);
  } catch (error) {
    console.error('Error creating team:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


exports.registerTeam = async (req, res) => {
  const { eventId } = req.params;
  const { teamId, teamMembers } = req.body;

  try {
    const event = await Event.findById(eventId);
    const team = await Team.findById(teamId);

    if (!event || !team) {
      return res.status(404).json({ message: 'Event or team not found' });
    }

    // Check if the team is already registered for the event
    if (team.registeredEvents.includes(eventId)) {
      return res.status(400).json({ message: 'Team is already registered for this event' });
    }

    // Register the team
    team.registeredEvents.push(eventId);
    await team.save();

    // Check if teamMembers is an array of email addresses or objects
    console.log('Team Members:', teamMembers);

    // If teamMembers is an array of strings (emails)
    if (typeof teamMembers[0] === 'string') {
      teamMembers.forEach((email) => {
        const emailContent = `Dear member, your team ${team.name} has successfully registered for the event ${event.name}.`;
        console.log('Sending email to:', email);
        console.log('Email content:', emailContent);

        sendEmail({
          email: email,
          subject: 'Event Registration Successful',
          message: emailContent,
        }).catch(err => console.error('Error sending email:', err));
      });
    } else {
      // If teamMembers is an array of objects with name and email
      teamMembers.forEach((member) => {
        const emailContent = `Dear ${member.name}, your team ${team.name} has successfully registered for the event ${event.name}.`;
        console.log('Sending email to:', member.email);
        console.log('Email content:', emailContent);

        sendEmail({
          email: member.email,
          subject: 'Event Registration Successful',
          message: emailContent,
        }).catch(err => console.error('Error sending email:', err));
      });
    }

    res.status(200).json({ success: true, eventName: event.name });
  } catch (err) {
    console.error('Team registration failed:', err);
    res.status(500).json({ message: 'Registration failed' });
  }
};


exports.getTeamByEmail = async (req, res) => {
  const { userEmail } = req.query;
  console.log('Received email:', userEmail);

  try {
    // Validate the userEmail
    if (!userEmail || typeof userEmail !== 'string') {
      return res.status(400).json({ message: 'Invalid user email format' });
    }

    // Find the user by email to get the team
    const user = await User.findOne({ email: userEmail });
    console.log('Found user:', user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the team by user ID
    const team = await Team.findOne({ members: user.email });
    console.log('Found team:', team);

    if (!team) {
      return res.status(404).json({ message: 'Team not found for this user' });
    }

    res.status(200).json(team);
  } catch (err) {
    console.error('Error fetching team by email:', err.message);
    res.status(500).json({ message: 'Error fetching team' });
  }
};