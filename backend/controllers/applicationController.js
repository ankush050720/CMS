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
      clubName,
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

    // Check if an application already exists for this email
    const existingApplication = await Application.findOne({ email });
    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'An application with this email has already been submitted.',
      });
    }

    // Retrieve club details (can be one or two clubs now)
    const clubs = await Club.find({ _id: { $in: clubName } });
    if (!clubs || clubs.length === 0) {
      return res.status(404).json({ message: 'One or more selected clubs not found' });
    }

    const newApplication = new Application({
      name,
      email,
      phone,
      hallTicket,
      clubName,
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
    for (const clubId of clubName) {
      const club = await Club.findById(clubId);
      if (!club) continue;

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

    // Send confirmation to applicant
    await sendEmail({
      email,
      subject: `Your Application for Club Membership Has Been Submitted`,
      message: `Dear ${name},\n\nThank you for your application to join our clubs. We have received your application and our team will review it shortly.\n\nWe appreciate your interest.\n\nBest Regards,\nThe SRU Club Team`,
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
