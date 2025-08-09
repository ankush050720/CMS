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
      clubName, // array of club NAME strings from frontend
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

    const clubNames = Array.isArray(clubName) ? clubName : [clubName];

    // Prevent one user from applying multiple times
    const existingApplication = await Application.findOne({ email });
    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'An application with this email has already been submitted.',
      });
    }

    // Create application directly with club names
    const newApplication = new Application({
      name,
      email,
      phone,
      hallTicket,
      clubName: clubNames,
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

    // For each club, notify chairperson and vice-chairperson
    for (const clubName of clubNames) {
      // Assuming your User model has `clubName` field storing the actual club name
      const chairperson = await User.findOne({ role: 'chairperson', clubName });
      const viceChairperson = await User.findOne({ role: 'vicechairperson', clubName });

      const recipients = [];
      if (chairperson?.email) recipients.push(chairperson.email);
      if (viceChairperson?.email) recipients.push(viceChairperson.email);

      if (recipients.length > 0) {
        await sendEmail({
          email: recipients.join(', '),
          subject: `New Club Application Received for ${clubName}`,
          message: `Hello,\n\nYou have received a new application for club membership from ${name}.\n\nApplicant's details:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nRegards,\nThe SRU Club Team`,
        });
      }
    }

    // Confirmation to applicant
    await sendEmail({
      email,
      subject: `Application for Club Membership`,
      message: `Dear ${name},\n\nThank you for your application to join our clubs. We have received your application and our team will review it shortly.\n\nBest Regards,\nThe SRU Club Team`,
    });

    // Notify Associate Dean
    await sendEmail({
      email: "rupesh.mishra@sru.edu.in",
      bcc: "ankuash.jha@sru.edu.in",
      subject: "New Club Application Submission",
      message:
        `Dear Associate Dean,\n\n` +
        `A new club application has been submitted with the following details:\n\n` +
        `Applicant Name: ${name}\n` +
        `Hall Ticket Number: ${hallTicket}\n` +
        `Applied Clubs: ${clubNames.join(', ')}\n\n` +
        `Regards,\nThe SRU Club Team`
    });

    return res.status(201).json({
      success: true,
      message: 'Application successfully submitted!',
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Error submitting application',
    });
  }
};

// Fetch applications for the authenticated user's club
exports.getApplications = async (req, res) => {
  try {
    const clubId = req.user.club; // clubId from JWT or auth middleware

    // Find the clubName by clubId
    const club = await Club.findById(clubId);
    if (!club) {
      return res.status(404).json({ message: 'Club not found for your account' });
    }
    const clubName = club.name;

    // Find all applications where clubName array contains this club name
    const applications = await Application.find({ clubName: clubName });

    if (!applications.length) {
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
