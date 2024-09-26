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

exports.checkVenue = async (req, res) => {
  try {
    const events = await Event.find().populate('club');  // Populate to include club info
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
};

// Get event by ID
exports.getClubEvents = async (req, res) => {
  try {
    const clubId = req.user.club.name;  // Assuming req.user.club is the club ID
    const events = await Event.find({ club: clubId });  // Find all events associated with the clubId
    if (!events || events.length === 0) {
      return res.status(404).json({ message: 'No events found for this club' });
    }
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
};


// Create a new event
exports.createEvent = async (req, res) => {
  try {
    // Extract fields from the request body
    const { name, description, date, time, venue, fee, logo, members } = req.body;

    // Extract club from req.user.club
    const club = req.user.club.name;

    // Create the event object
    const event = new Event({
      name,
      description,
      date,
      time,
      venue,
      fee,
      club, // Automatically assigned from req.user.club
      logo,
      members, // Add members to the event object
    });

    // Save the event to the database
    await event.save();

    // Get the faculty mentor and admin emails
    const facultyMentor = await User.findOne({ club: req.user.club._id, role: 'faculty mentor' });
    const admin = await User.findOne({ role: 'admin' });

    // Prepare the email content
    const emailContent = `A new event has been added:
      Name: ${name}
      Description: ${description}
      Date: ${date}
      Time: ${time}
      Venue: ${venue}
      Fee: ${fee}
      Club: ${club}
    `;

    // Send email to both faculty mentor and admin
    if (facultyMentor) {
      await sendEmail({
        email: facultyMentor.email,
        subject: 'New Event Added',
        message: emailContent,
      });
    }
    if (admin) {
      await sendEmail({
        email: admin.email,
        subject: 'New Event Added',
        message: emailContent,
      });
    }

    // Return success response
    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    // Handle errors and return failure response
    res.status(500).json({ message: 'Error creating event', error });
  }
};


// Delete event
exports.removeEvent = async (req, res) => {
  try {
    const { eventId } = req.body;
    
    // Find and remove the event by ID
    const event = await Event.findByIdAndDelete(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Get the faculty mentor and admin emails
    const facultyMentor = await User.findOne({ club: req.user.club._id, role: 'faculty mentor' });
    const admin = await User.findOne({ role: 'admin' });

    // Prepare the email content
    const emailContent = `The following event has been removed:
      Name: ${event.name}
      Description: ${event.description}
      Date: ${event.date}
      Time: ${event.time}
      Venue: ${event.venue}
      Fee: ${event.fee}
      Club: ${event.club}
    `;

    // Send email to both faculty mentor and admin
    if (facultyMentor) {
      await sendEmail({
        email: facultyMentor.email,
        subject: 'Event Removed',
        message: emailContent,
      });
      
      if (admin) {
      await sendEmail({
        email: admin.email,
        subject: 'Event Removed',
        message: emailContent,
      });
    }

    // Return success response
    res.status(200).json({ message: 'Event removed successfully' });
  }} catch (error) {
    // Handle errors and return failure response
    res.status(500).json({ message: 'Error removing event', error });
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

exports.getUpcomingEvents = async(req, res) => {
  try {
    const club = req.user.club;
    const upcomingEvents = await Event.find({  status:'upcoming' , club:club.name });
    res.status(200).json(upcomingEvents);
  } catch (e) {
    console.error('Error fetching upcoming events:', e.message);
    res.status(500).json({ message: 'Error fetching upcoming events' });
  }
};

exports.getOngoingEvents = async(req, res) => {
  try {
    const club = req.user.club;
    const upcomingEvents = await Event.find({  status:'ongoing' , club:club.name });
    res.status(200).json(upcomingEvents);
  } catch (e) {
    console.error('Error fetching upcoming events:', e.message);
    res.status(500).json({ message: 'Error fetching upcoming events' });
  }
};

exports.getClosedEvents = async(req, res) => {
  try {
    const club = req.user.club;
    const upcomingEvents = await Event.find({  status:'completed' , club:club.name });
    res.status(200).json(upcomingEvents);
  } catch (e) {
    console.error('Error fetching upcoming events:', e.message);
    res.status(500).json({ message: 'Error fetching upcoming events' });
  }
};


exports.closeRegistration = async (req, res) => {
  try {
    const eventId = req.body.eventId;
    const event = await Event.findById(eventId);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Update event status to 'ongoing'
    event.status = 'ongoing';
    await event.save();

    // Retrieve faculty mentor and admin details
    const facultyMentor = await User.findOne({ club: req.user.club._id, role: 'faculty mentor' });
    const admin = await User.findOne({ role: 'admin' });

    // Prepare the email content
    const emailContent = `The registration for the following event has been closed:
      Name: ${event.name}
      Description: ${event.description}
      Date: ${event.date}
      Time: ${event.time}
      Venue: ${event.venue}
      Fee: ${event.fee}
      Club: ${event.club.name}
    `;

    // Send email to both faculty mentor and admin
    if (facultyMentor) {
      await sendEmail({
        email: facultyMentor.email,
        subject: 'Event Registration Closed',
        message: emailContent,
      });
    }

    if (admin) {
      await sendEmail({
        email: admin.email,
        subject: 'Event Registration Closed',
        message: emailContent,
      });
    }

    res.status(200).json({ message: 'Event registration closed and emails sent' });
  } catch (error) {
    console.error('Error closing registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.closeEvent = async (req, res) => {
  try {
    const eventId = req.body.eventId;
    const event = await Event.findById(eventId);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Update event status to 'completed'
    event.status = 'completed';
    await event.save();

    // Retrieve faculty mentor and admin details
    const facultyMentor = await User.findOne({ club: req.user.club._id, role: 'faculty mentor' });
    const admin = await User.findOne({ role: 'admin' });

    // Prepare the email content
    const emailContent = `The following event has been marked as completed:
      Name: ${event.name}
      Description: ${event.description}
      Date: ${event.date}
      Time: ${event.time}
      Venue: ${event.venue}
      Fee: ${event.fee}
      Club: ${event.club.name}
    `;

    // Send email to both faculty mentor and admin
    if (facultyMentor) {
      await sendEmail({
        email: facultyMentor.email,
        subject: 'Event Completed',
        message: emailContent,
      });
    }

    if (admin) {
      await sendEmail({
        email: admin.email,
        subject: 'Event Completed',
        message: emailContent,
      });
    }

    res.status(200).json({ message: 'Event marked as completed and emails sent' });
  } catch (error) {
    console.error('Error closing event:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.closeFeedback = async (req, res) => {
  try {
    const eventId = req.body.eventId;
    const event = await Event.findById(eventId);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Update event status to 'feedbackClosed'
    event.status = 'feedbackClosed';
    await event.save();

    // Retrieve faculty mentor and admin details
    const facultyMentor = await User.findOne({ club: req.user.club._id, role: 'faculty mentor' });
    const admin = await User.findOne({ role: 'admin' });

    // Prepare the email content
    const emailContent = `The feedback for the following event has been closed:
      Name: ${event.name}
      Description: ${event.description}
      Date: ${event.date}
      Time: ${event.time}
      Venue: ${event.venue}
      Fee: ${event.fee}
      Club: ${event.club.name}
    `;

    // Send email to both faculty mentor and admin
    if (facultyMentor) {
      await sendEmail({
        email: facultyMentor.email,
        subject: 'Event Feedback Closed',
        message: emailContent,
      });
    }

    if (admin) {
      await sendEmail({
        email: admin.email,
        subject: 'Event Feedback Closed',
        message: emailContent,
      });
    }

    res.status(200).json({ message: 'Feedback closed and emails sent' });
  } catch (error) {
    console.error('Error closing feedback:', error);
    res.status(500).json({ message: 'Server error' });
  }
};