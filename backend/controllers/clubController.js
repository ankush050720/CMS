const Club = require("../models/Club");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/User");

const getClubName = async (req, res) => {
  try {
    console.log("club:", req.user);
    const clubName = req.user.club.name;
    res.status(200).json({ clubName });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST - Save or update club data
const saveClubData = async (req, res) => {
  try {
    const clubId = req.user.club;
    let existingClub = await Club.findById(clubId);

    if (!existingClub) {
      // Create a new club with the provided data if the club doesn't exist
      existingClub = new Club(req.body);
    } else {
      // Update the existing club's non-empty fields
      Object.keys(req.body).forEach((key) => {
        if (req.body[key] && key !== 'addMembers' && key !== 'events') {
          existingClub[key] = req.body[key];
        }
      });

      // Handle the members
      const currentMembers = existingClub.addMembers || [];
      const membersToUpdate = req.body.addMembers || [];

      membersToUpdate.forEach((member) => {
        const existingMemberIndex = currentMembers.findIndex(
          (m) => m.email === member.email
        );
        if (existingMemberIndex !== -1) {
          // Update existing member fields only (merge new with old)
          currentMembers[existingMemberIndex] = {
            ...currentMembers[existingMemberIndex], // Retain old fields
            ...member, // Overwrite with new fields
          };
        } else {
          // Add new member
          currentMembers.push(member);
        }
      });

      // Set the updated members back
      existingClub.addMembers = currentMembers;

      // Handle the events
      const currentEvents = existingClub.events || [];
      const eventsToUpdate = req.body.events || [];

      eventsToUpdate.forEach((event) => {
        const existingEventIndex = currentEvents.findIndex(
          (e) => e.eventName === event.eventName
        );
        if (existingEventIndex !== -1) {
          // Update existing event fields only (merge new with old)
          currentEvents[existingEventIndex] = {
            ...currentEvents[existingEventIndex], // Retain old fields
            ...event, // Overwrite with new fields
          };
        } else {
          // Add new event
          currentEvents.push(event);
        }
      });

      // Set the updated events back
      existingClub.events = currentEvents;
    }

    // Save the updated or newly created club
    await existingClub.save();

    const faculty = await User.findOne({
      club: clubId,
      role: "faculty mentor",
    });
    if (faculty) {
      // Send email to the faculty mentor
      await sendEmail({
        email: faculty.email,
        subject: "Club Data Updated",
        message: `Your club's data has been updated. Check it here: ${
          process.env.FRONTEND_URL
        }/${existingClub.name.replace(/\s+/g, "-").toLowerCase()}`,
      });
    }

    // Send a success response
    return res
      .status(200)
      .json({ message: "Club data saved/updated successfully", existingClub });
  } catch (error) {
    // Handle errors
    return res.status(500).json({ message: "Error saving club data", error });
  }
};


// GET - Retrieve all members and their details for a specific club
const getClubMembers = async (req, res) => {
  try {
    const clubId = req.user.club;
    const club = await Club.findById(clubId).select('addMembers'); 

    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }

    // Send the list of members as a response
    return res.status(200).json(club.addMembers);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving club members", error });
  }
};


// GET - Retrieve all club data
const getAllClubs = async (req, res) => {
  try {
    const clubs = await Club.find({});
    return res.status(200).json(clubs);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving clubs", error });
  }
};

const updateClubMember = async (req, res) => {
  const { email } = req.params; // Email of the member to update
  const updatedData = req.body; // New data for the member
  const clubId = req.user.club; // Get the club ID from the authenticated user

  try {
    // Find the club using the clubId from req.user.club
    const club = await Club.findOne({ _id: clubId });

    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    // Find the member within addMembers by email and update their details
    const memberIndex = club.addMembers.findIndex(member => member.email === email);

    if (memberIndex !== -1) {
      // Update member details
      club.addMembers[memberIndex] = { ...club.addMembers[memberIndex], ...updatedData };
      await club.save();
      res.status(200).json({ message: 'Member updated successfully', updatedMember: club.addMembers[memberIndex] });
    } else {
      res.status(404).json({ message: 'Member not found in the club' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating member', error });
  }
};

const deleteClubMember = async (req, res) => {
  const { email } = req.params; // Email of the member to delete
  const clubId = req.user.club; // Get the club ID from the authenticated user

  try {
    // Find the club using the clubId from req.user.club
    const club = await Club.findOne({ _id: clubId });

    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    // Filter out the member from addMembers by email
    const updatedMembers = club.addMembers.filter(member => member.email !== email);

    if (updatedMembers.length === club.addMembers.length) {
      return res.status(404).json({ message: 'Member not found in the club' });
    }

    // Save the updated addMembers array in the club document
    club.addMembers = updatedMembers;
    await club.save();

    res.status(200).json({ message: 'Member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting member', error });
  }
};

const saveClubEvents = async (req, res) => {
  try {
    const clubId = req.user.club;
    const existingClub = await Club.findById(clubId);

    if (!existingClub) {
      return res.status(404).json({ message: "Club not found" });
    }

    // Handle the events
    const currentEvents = existingClub.events || [];
    const eventsToUpdate = req.body.events || [];

    eventsToUpdate.forEach((event) => {
      const existingEventIndex = currentEvents.findIndex(
        (e) => e.eventName === event.eventName
      );
      if (existingEventIndex !== -1) {
        // Update existing event fields only (merge new with old)
        currentEvents[existingEventIndex] = {
          ...currentEvents[existingEventIndex],
          ...event,
        };
      } else {
        // Add new event
        currentEvents.push(event);
      }
    });

    // Set the updated events back
    existingClub.events = currentEvents;
    await existingClub.save();

    return res.status(200).json({ message: "Events saved/updated successfully", existingClub });
  } catch (error) {
    return res.status(500).json({ message: "Error saving events", error });
  }
};

// Update an event
const updateEvent = async (req, res) => {
  const { eventId } = req.params; // Use a unique identifier for the event
  const updatedData = req.body;

  try {
    const clubId = req.user.club;
    const club = await Club.findOne({ _id: clubId });

    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }

    const eventIndex = club.events.findIndex(event => event._id.toString() === eventId);
    if (eventIndex === -1) {
      return res.status(404).json({ message: "Event not found" });
    }

    club.events[eventIndex] = { ...club.events[eventIndex], ...updatedData };
    await club.save();

    res.status(200).json({ message: 'Event updated successfully', updatedEvent: club.events[eventIndex] });
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error });
  }
};

// Delete an event
const deleteEvent = async (req, res) => {
  const { eventId } = req.params;

  try {
    const clubId = req.user.club;
    const club = await Club.findOne({ _id: clubId });

    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }

    const updatedEvents = club.events.filter(event => event._id.toString() !== eventId);

    if (updatedEvents.length === club.events.length) {
      return res.status(404).json({ message: "Event not found" });
    }

    club.events = updatedEvents;
    await club.save();

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error });
  }
};

const getClubEvents = async (req, res) => {
  try {
    const clubId = req.user.club;
    const club = await Club.findById(clubId).select('events'); 

    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }

    // Send the list of events as a response
    return res.status(200).json(club.events);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving club events", error });
  }
};


module.exports = {
  getClubName,
  saveClubData,
  getClubMembers,
  getAllClubs,
  updateClubMember,
  deleteClubMember,
  saveClubEvents,
  updateEvent,
  deleteEvent,
  getClubEvents,
};
