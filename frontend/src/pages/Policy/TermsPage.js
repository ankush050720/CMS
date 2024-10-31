import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Header from "../../components/HomeHeader/HomeHeader";
import Footer from "../../components/Footer";

const TermsAndConditions = () => {
  return (
    <div>
    <Container>
      <Header />
      <Box mt={14} mb={5}>
        <Typography variant="h4" gutterBottom>
          Terms and Conditions
        </Typography>

        <Typography variant="h6" gutterBottom>1. Introduction</Typography>
        <Typography paragraph>
          Welcome to the SR University Club Management Portal. By accessing or using this platform, you agree to abide by these Terms and Conditions. This portal is intended solely for students, faculty, and staff of SR University for the purpose of managing club activities, events, and student engagement.
        </Typography>

        <Typography variant="h6" gutterBottom>2. User Responsibilities</Typography>
        <Typography paragraph>
          Users are expected to maintain respectful behavior and adhere to SR University's code of conduct. Misuse of the platform, including but not limited to spamming, harassment, and unauthorized distribution of content, will result in suspension or termination of access.
        </Typography>

        <Typography variant="h6" gutterBottom>3. Account Management</Typography>
        <Typography paragraph>
          Users are responsible for maintaining the confidentiality of their login credentials. SR University is not liable for any misuse or unauthorized access arising from negligence in safeguarding account information.
        </Typography>

        <Typography variant="h6" gutterBottom>4. Intellectual Property</Typography>
        <Typography paragraph>
          All content, including club materials, event descriptions, and other digital assets on the platform, are the property of SR University. Users may not distribute, replicate, or use any materials outside the scope of club activities without express permission.
        </Typography>

        <Typography variant="h6" gutterBottom>5. Limitation of Liability</Typography>
        <Typography paragraph>
          SR University is not liable for any damages arising from use of the platform, including data loss, unauthorized access, or any issues related to third-party integrations.
        </Typography>

        <Typography variant="h6" gutterBottom>6. Updates to Terms</Typography>
        <Typography paragraph>
          SR University reserves the right to update these Terms and Conditions at any time. Users will be notified of major updates, and continued use of the platform constitutes acceptance of the modified terms.
        </Typography>
      </Box>
    </Container>
    <Footer />
    </div>
  );
};

export default TermsAndConditions;