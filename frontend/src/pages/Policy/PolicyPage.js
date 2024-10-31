import React from 'react';
import { Container, Typography, Box, Link } from '@mui/material';
import Header from "../../components/HomeHeader/HomeHeader";
import Footer from "../../components/Footer";

const PrivacyPolicy = () => {
  return (
    <div>
    <Container>
      <Header />
      <Box mt={14} mb={5}>
        <Typography variant="h4" gutterBottom>
          Privacy Policy
        </Typography>

        <Typography variant="h6" gutterBottom>1. Information Collection</Typography>
        <Typography paragraph>
          We collect basic information such as name, email, phone number, and password solely for login and account management. No sensitive data is collected, and all user data is used solely to facilitate access and management of clubs and events on the SR University platform.
        </Typography>

        <Typography variant="h6" gutterBottom>2. Use of Information</Typography>
        <Typography paragraph>
          User information is used for club-related activities, event participation, and notifications. SR University does not share user data with external parties without consent and adheres strictly to data privacy practices.
        </Typography>

        <Typography variant="h6" gutterBottom>3. Data Sharing</Typography>
        <Typography paragraph>
          SR University may share data internally with other departments only for operational purposes. Third-party cookies may be used by integrated services to enhance the platform’s usability, but no user information is shared with these providers beyond necessary use.
        </Typography>

        <Typography variant="h6" gutterBottom>4. Use of Google Maps</Typography>
        <Typography paragraph>
          Our website uses Google Maps solely to display the location of SR University on the Contact Us page. This functionality does not collect or track any personal information from users. For more details on Google’s data handling practices, you can refer to their Privacy Policy: 
          <Link href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            Google Privacy Policy
          </Link>.
        </Typography>

        <Typography variant="h6" gutterBottom>5. Data Security</Typography>
        <Typography paragraph>
          User data is protected with secure servers and encrypted communications to prevent unauthorized access. Users are encouraged to safeguard their passwords and personal information while using the platform.
        </Typography>

        <Typography variant="h6" gutterBottom>6. Cookies</Typography>
        <Typography paragraph>
          Cookies are used to enhance user experience, and users can adjust cookie settings in their browser as needed. Cookies on this platform do not track personal information and are not used for advertising purposes.
        </Typography>

        <Typography variant="h6" gutterBottom>7. User Rights</Typography>
        <Typography paragraph>
          Users can request to review or delete their data by contacting our support team. SR University will process these requests in compliance with applicable data protection laws.
        </Typography>
      </Box>
    </Container>
    <Footer />
    </div>
  );
};

export default PrivacyPolicy;