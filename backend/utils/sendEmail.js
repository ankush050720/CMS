// const nodemailer = require('nodemailer');

// const sendEmail = async (options) => {
//   if (!options || !options.email || !options.subject || !options.message) {
//     throw new Error('Missing required email options');
//   }

//   const transporter = nodemailer.createTransport({
//     host: 'smtpout.secureserver.net',
//     port: 465,
//     secure: true, // Use true since you're connecting with SSL/TLS on port 465
//     auth: {
//       user: process.env.EMAIL_USER, // Update if hardcoding
//       pass: process.env.EMAIL_PASS, // Ensure this matches your GoDaddy email password
//     },
//   });

//   const mailOptions = {
//     from: 'SRU <noreply@sruclub.in>',
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log('Email sent successfully!');
//   } catch (err) {
//     console.error('Error sending email:', err);
//     throw err;
//   }
// };

// module.exports = sendEmail;

const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  if (!options || !options.email || !options.subject || !options.message) {
    throw new Error('Missing required email options');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  const mailOptions = {
    from: 'SRU CLUB & CHAPTER SPACE<clubandchapter.sru.edu.in>',
    to: options.email,      // 'To' field for recipients
    bcc: options.bcc,       // 'BCC' field for hidden recipients
    subject: options.subject,
    text: options.message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
  } catch (err) {
    console.error('Error sending email:', err);
    throw err;
  }
};

module.exports = sendEmail;
