const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Validate options
  if (!options || !options.email || !options.subject || !options.message) {
    throw new Error('Missing required email options');
  }

  const transporter = nodemailer.createTransport({
    service: 'Gmail', // or another email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: 'SRU <ankjha1507@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error('Error sending email:', err);
    throw err; // Re-throw to handle it in the calling code
  }
};

module.exports = sendEmail;
