const Application = require('../models/Application');
const Club = require('../models/Club'); // Assuming the Club model is imported here
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

// Submit application to the backend
exports.submitApplication = async (req, res) => {
  try {
    // Destructure form values from request body
    const {
      name,
      email,
      phone,
      hallTicket,
      clubName, // This is the clubId from the form
      reason,
      comments,
    } = req.body;

    // Retrieve the actual club name from the Club model using the clubId (clubName in the form)
    const club = await Club.findById(clubName); // Assuming clubName is the clubId
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    const clubNameActual = club.name; // Get the actual club name

    // Create a new application document
    const newApplication = new Application({
      name,
      email,
      phone,
      hallTicket,
      clubName,
      reason,
      comments,
    });

    // Save the application to the database
    await newApplication.save();

    // Send email to chairperson and vice-chairperson if they exist
    const chairperson = await User.findOne({ role: 'chairperson', club: clubName });
    const viceChairperson = await User.findOne({ role: 'vicechairperson', club: clubName });

    const recipients = [];
    if (chairperson && chairperson.email) {
      recipients.push(chairperson.email);
    }
    if (viceChairperson && viceChairperson.email) {
      recipients.push(viceChairperson.email);
    }

    if (recipients.length > 0) {
      await sendEmail({
        email: recipients.join(', '), // Convert array to comma-separated string
        subject: `New Club Application Received for ${clubNameActual}`,
        message: `Hello,\n\nYou have received a new application for club membership from ${name}.\n\nApplicant's details:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nRegards,\nThe SRU Club Team`,
      });
    }

    // Send email to the applicant (the email submitted in the form)
    await sendEmail({
      email: email,
      subject: `Your Application for Club Membership Has Been Submitted`,
      message: `Dear ${name},\n\nThank you for your application to join the ${clubNameActual}. We have received your application and our team will review it shortly. You will be informed about the next steps in the hiring process soon.\n\nWe appreciate your interest and look forward to connecting with you.\n\nBest Regards,\nThe SRU Club Team`,
    });

    // Return success message
    res.status(201).json({ success: true, message: 'Application successfully submitted!' });
} catch (err) {
  console.error(err);
  res.status(500).json({ success: false, message: 'Error submitting application' });
}
};

// Fetch applications for the authenticated user's club
exports.getApplications = async (req, res) => {
  try {
    const club = req.user.club; // Assuming req.user contains the authenticated user's data and club ID
    // Fetch applications where the clubName matches the user's club ID
    const applications = await Application.find({ clubName: club });

    if (applications.length === 0) {
      return res.status(404).json({ message: 'No applications found for your club' });
    }

    // Return the list of applications
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