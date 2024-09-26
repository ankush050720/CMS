const Proposal = require('../models/Propose');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const Club = require('../models/Club');

const getProposals = async (req, res) => {
    try {
      // Find all proposals associated with the club
      const proposals = await Proposal.find({ 
        status: { $in: ["Accepted by the Faculty Member", "Accepted by the Dean", "Declined by the Dean"] } 
      }).sort({ createdAt: -1 }); // Sort by creation date (most recent first)
      
      // Send the proposals as a response
      res.status(200).json(proposals);
    } catch (error) {
      console.error('Error fetching proposals:', error);
      res.status(500).json({ message: 'Error fetching proposals', error });
    }
};


const updateProposalStatus = async (req, res) => {
    const { proposalId, action, comment } = req.body;
    try {
      const proposal = await Proposal.findById(proposalId);
      if (!proposal) {
        return res.status(404).json({ message: 'Proposal not found' });
      }
  
      // Determine who to email and set proposal status
      if (action === "decline") {
        proposal.status = "Declined by the Dean";
        proposal.comment = comment;
        await proposal.save();
  
        // Send email to chairperson and vice-chairperson if they exist
        const chairperson = await User.findOne({ role: 'chairperson', club: proposal.club });
        const viceChairperson = await User.findOne({ role: 'vicechairperson', club: proposal.club });
        const facultyMentor = await User.findOne({ role: 'faculty mentor', club: proposal.club });
  
        const recipients = [];
        if (chairperson && chairperson.email) {
          recipients.push(chairperson.email);
        }
        if (viceChairperson && viceChairperson.email) {
          recipients.push(viceChairperson.email);
        }
        if(facultyMentor && facultyMentor.email) {
            recipients.push(facultyMentor.email);
        }
  
        if (recipients.length > 0) {
          await sendEmail({
            email: recipients.join(', '), // Convert array to comma-separated string
            subject: 'Proposal Declined By the Dean',
            message: `The proposal from your club has been declined by the Dean.`
          });
        }
  
        return res.status(200).json({ message: 'Proposal declined', updatedStatus: proposal.status });
      } else if (action === "accept") {
        proposal.status = "Accepted by the Dean";
        proposal.comment = comment;
        await proposal.save();
  
        const chairperson = await User.findOne({ role: 'chairperson', club: proposal.club });
        const viceChairperson = await User.findOne({ role: 'vicechairperson', club: proposal.club });
        const facultyMentor = await User.findOne({ role: 'faculty mentor', club: proposal.club });
  
        const recipients = [];
        if (chairperson && chairperson.email) {
          recipients.push(chairperson.email);
        }
        if (viceChairperson && viceChairperson.email) {
          recipients.push(viceChairperson.email);
        }
        if(facultyMentor && facultyMentor.email) {
            recipients.push(facultyMentor.email);
        }
  
        if (recipients.length > 0) {
          await sendEmail({
            email: recipients.join(', '), // Convert array to comma-separated string
            subject: 'Proposal Accepted By Dean',
            message: `The proposal from your club has been accepted by the Dean. You may now schedule and add the event at the proposed date-time and venue.`
          });
        }
  
        return res.status(200).json({ message: 'Proposal accepted', updatedStatus: proposal.status });
      }
  
    } catch (error) {
      console.error('Error updating proposal status:', error);
      return res.status(500).json({ message: 'Failed to update proposal status', error });
    }
};

const getMembers = async (req, res) => {
    try {
      // Fetch all clubs
      const clubs = await Club.find().lean(); // Get all clubs with their names
    
      const response = await Promise.all(
        clubs.map(async (club) => {
          // Find the faculty mentor (if any) for this club
          const facultyMentor = await User.findOne({
            club: club._id,
            role: "faculty mentor",
          }).lean();
    
          // Find all other members for this club, excluding 'guest' and 'admin'
          const members = await User.find({
            club: club._id,
            role: { $nin: ["guest", "admin", "faculty mentor"] }, // Exclude unwanted roles and faculty mentor
          })
            .sort({ role: 1 }) // Sort members by role
            .lean();
    
          // Prepare the members array, starting with the faculty mentor if they exist
          let clubMembers = [];
          if (facultyMentor) {
            clubMembers.push(facultyMentor); // Add faculty mentor at the top
          }
          clubMembers = [...clubMembers, ...members]; // Append other members
    
          // Return each club with its members (even if it's empty)
          return {
            club: club.name, // Use the club name for frontend display
            members: clubMembers, // Add the array of members (may be empty)
          };
        })
      );
    
      // Send the structured data as a response
      res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching members:", error);
      res.status(500).json({ message: "Error fetching members", error });
    }
  };  
  
  const addNewClub = async (req, res) => {
    try {
        const { clubName } = req.body; // Destructure clubName from request body

        // Check if the club already exists
        const existingClub = await Club.findOne({ name: clubName });
        if (existingClub) {
            return res.status(400).json({ message: 'Club already exists' });
        }

        // Create a new club document
        const newClub = new Club({
            name: clubName,
        });

        // Save the new club to the database
        await newClub.save();

        res.status(201).json({ message: 'Club added successfully', club: newClub });
    } catch (error) {
        console.error('Error adding new club:', error);
        res.status(500).json({ message: 'Failed to add new club', error });
    }
};


const removeClub = async (req, res) => {
    try {
        const { clubId } = req.body;

        // Find and remove the club by ID
        const clubToRemove = await Club.findOneAndDelete({ _id: clubId });

        if (!clubToRemove) {
            return res.status(404).json({ message: 'Club not found' });
        }

        // Find all users referencing this club
        const affectedUsers = await User.find({ club: clubToRemove._id });

        // Update all users referencing this club
        await User.updateMany(
            { club: clubToRemove._id }, // Find users with the club reference
            {
                $set: {
                    club: null, // Set club reference to null
                    role: 'guest', // Change role to guest
                },
            }
        );

        // Send email to each affected user
        for (let user of affectedUsers) {
            const emailOptions = {
                email: user.email,
                subject: 'Club Dissolved Notification',
                message: `Dear ${user.email},\n\nWe regret to inform you that your club "${clubToRemove.name}" has been dissolved. As a result, your role has been updated to "guest".\n\nThank you for your understanding.\n\nBest regards,\nSRU Admin`,
            };

            try {
                await sendEmail(emailOptions);
                console.log(`Email sent to: ${user.email}`);
            } catch (err) {
                console.error(`Failed to send email to: ${user.email}`, err);
            }
        }

        res.status(200).json({ message: 'Club removed and users notified successfully' });
    } catch (error) {
        console.error('Error removing club:', error);
        res.status(500).json({ message: 'Failed to remove club', error });
    }
};



const getUsers = async (req, res) => {
    try {
      // Fetch users excluding those with the role 'admin' and populate the 'club' field
      const users = await User.find({ role: { $ne: 'admin' } }).populate('club');
      
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Failed to fetch users' });
    }
  };
  


  const addFaculty = async (req, res) => {
    try {
        const { userId, clubName } = req.body;

        // Find if there's already a faculty mentor in the club
        const existingFaculty = await User.findOne({ club: clubName, role: 'faculty mentor' });
        if (existingFaculty) {
            return res.status(404).json({ message: 'A faculty mentor is already assigned to this club' });
        }

        // Find the user by ID and populate the club to get its name
        const user = await User.findById(userId).populate('club');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the club by its ID to get the club name
        const club = await Club.findById(clubName);
        if (!club) {
            return res.status(404).json({ message: 'Club not found' });
        }

        // Update the user's club and role
        user.club = clubName;
        user.role = 'faculty mentor';

        // Save the updated user to the database
        await user.save();

        // Send email to the newly appointed faculty mentor
        const emailOptions = {
            email: user.email,
            subject: 'Faculty Mentor Appointment Notification',
            message: `Dear ${user.email},\n\nCongratulations! You have been appointed as the faculty mentor of the "${club.name}" club.\n\nWe are confident that your guidance and mentorship will greatly contribute to the success of the club.\n\nBest regards,\nSRU Admin`,
        };

        try {
            await sendEmail(emailOptions);
            console.log(`Email sent to: ${user.email}`);
        } catch (err) {
            console.error(`Failed to send email to: ${user.email}`, err);
        }

        res.status(200).json({ message: 'Faculty added and notified successfully' });

    } catch (error) {
        console.error('Error adding faculty:', error);
        res.status(500).json({ message: 'Failed to add faculty', error });
    }
};


const removeFaculty = async (req, res) => {
    try {
        const { facultyId } = req.body;

        // Find the user by ID and populate the club to get its name
        const user = await User.findById(facultyId).populate('club');
        if (!user) {
            return res.status(404).json({ message: 'Faculty not found' });
        }

        // Store the current club name to mention in the email
        const previousClubName = user.club ? user.club.name : 'the club'; // In case there's no club associated

        // Update the user's role and remove their club association
        user.role = 'member';

        // Save the updated user to the database
        await user.save();

        // Send email to notify the faculty mentor about the removal
        const emailOptions = {
            email: user.email,
            subject: 'Faculty Mentor Role Removal Notification',
            message: `Dear ${user.email},\n\nThis is to inform you that you have been removed from the position of faculty mentor of the "${previousClubName}" club.\n\nYour role has been updated to "member". We thank you for your service.\n\nBest regards,\nSRU Admin`,
        };

        try {
            await sendEmail(emailOptions);
            console.log(`Email sent to: ${user.email}`);
        } catch (err) {
            console.error(`Failed to send email to: ${user.email}`, err);
        }

        res.status(200).json({ message: 'Faculty removed and notified successfully' });

    } catch (error) {
        console.error('Error removing faculty:', error);
        res.status(500).json({ message: 'Failed to remove faculty', error });
    }
};


const getFaculties = async (req, res) => {
    try {
    // Fetch all faculty mentors and populate their clubs
    const faculties = await User.find({ role: 'faculty mentor' }).populate('club');
    
    res.status(200).json(faculties);
    }

    catch (error) {
        console.error('Error fetching faculties:', error);
        return res.status(500).json({ message: 'Failed to fetch faculties', error });
    }
}

module.exports = {
    updateProposalStatus,
    getProposals,
    getMembers,
    addNewClub,
    removeClub,
    getUsers,
    addFaculty,
    removeFaculty,
    getFaculties,
};