const Application = require('../models/Application');
const Club = require('../models/Club'); // Assuming the Club model is imported here
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

// Submit application to the backend
exports.submitApplication = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      hallTicket,
      clubName, // array of club IDs expected here
      reason,
      comments,
      program,
      year,
      specialization,
      recommender1,
      recommender2,
      linkedin,
      facebook,
      instagram,
      other_media,
      github,
      youtube,
      comment,
      cv
    } = req.body;

    // Ensure clubName is array
    const clubIds = Array.isArray(clubName) ? clubName : [clubName];

    // Check if any application already exists for this email
    const existingApplication = await Application.findOne({ email });
    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'An application with this email has already been submitted.',
      });
    }

    // Make sure all clubs exist
    const clubs = await Club.find({ _id: { $in: clubIds } });
    if (clubs.length !== clubIds.length) {
      return res.status(404).json({ message: 'One or more selected clubs not found' });
    }

    // Create one Application document with array clubName
    const newApplication = new Application({
      name,
      email,
      phone,
      hallTicket,
      clubName: clubIds,  // store all club IDs here as an array
      reason,
      comments,
      program,
      year,
      specialization,
      recommender1,
      recommender2,
      linkedin,
      facebook,
      instagram,
      other_media,
      github,
      youtube,
      comment,
      cv,
    });

    await newApplication.save();

    // Send email to chairpersons and vice-chairpersons of selected clubs
    for (const clubId of clubIds) {
      const club = clubs.find(c => c._id.toString() === clubId.toString());
      if (!club) continue;  // extra safety

      const chairperson = await User.findOne({ role: 'chairperson', club: clubId });
      const viceChairperson = await User.findOne({ role: 'vicechairperson', club: clubId });

      const recipients = [];
      if (chairperson?.email) recipients.push(chairperson.email);
      if (viceChairperson?.email) recipients.push(viceChairperson.email);

      if (recipients.length > 0) {
        await sendEmail({
          email: recipients.join(', '),
          subject: `New Club Application Received for ${club.name}`,
          message: `Hello,\n\nYou have received a new application for club membership from ${name}.\n\nApplicant's details:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nRegards,\nThe SRU Club Team`,
        });
      }
    }

    // Send confirmation to the applicant (once)
    await sendEmail({
      email,
      subject: `Application for Club Membership`,
      message: `Dear ${name},\n\nThank you for your application to join our clubs. We have received your application and our team will review it shortly.\n\nWe appreciate your interest.\n\nBest Regards,\nThe SRU Club Team`,
    });

    // Send mail to Associate Dean with all clubs applied
    const clubNamesList = clubs.map(club => club.name).join(', ');

    await sendEmail({
      email: "rupesh.mishra@sru.edu.in",
      bcc: "ankuash.jha@sru.edu.in",
      subject: "New Club Application Submission",
      message:
        `Dear Associate Dean,\n\n` +
        `A new club application has been submitted with the following details:\n\n` +
        `Applicant Name: ${name}\n` +
        `Hall Ticket Number: ${hallTicket}\n` +
        `Applied Clubs: ${clubNamesList}\n\n` +
        `Regards,\nThe SRU Club Team`
    });

    res.status(201).json({
      success: true,
      message: 'Application successfully submitted!',
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Error submitting application',
    });
  }
};

// Fetch applications for the authenticated user's club
exports.getApplications = async (req, res) => {
  try {
    const club = req.user.club; // user's club ID

    // Find all applications where the clubName array contains the user's club ID
    const applications = await Application.find({ clubName: { $in: [club] } });

    if (applications.length === 0) {
      return res.status(404).json({ message: 'No applications found for your club' });
    }

    res.status(200).json({ applications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching applications' });
  }
};

exports.deleteApplication = async (req, res) => {
    try {
      const { id } = req.params;
      const application = await Application.findByIdAndDelete(id);
  
      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }
  
      res.status(200).json({ message: 'Application deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
