import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Header from "../../components/HomeHeader/HomeHeader";
import Footer from "../../components/Footer";

const RefundPolicy = () => {
  return (
    <div>
    <Container>
      <Header />
      <Box mt={14} mb={5}>
        <Typography variant="h4" gutterBottom>
          Refunds and Cancellations Policy
        </Typography>

        <Typography variant="h6" gutterBottom>1. Scope</Typography>
        <Typography paragraph>
          Refunds and cancellations apply only to event registrations made through the SR University Club Management Portal. All transactions are processed through the Razorpay payment gateway, which follows its privacy policy available at <a href="https://razorpay.com/privacy/" target="_blank" rel="noopener noreferrer">Razorpay Privacy Policy</a>.
        </Typography>

        <Typography variant="h6" gutterBottom>2. Eligibility for Refund</Typography>
        <Typography paragraph>
          Refunds are available only if a cancellation request is made before event registration closes. After this period, no refunds will be processed.
        </Typography>

        <Typography variant="h6" gutterBottom>3. Process</Typography>
        <Typography paragraph>
          Refund requests should be submitted through the portal or by contacting our support team. Refunds will be processed within 5-7 business days and credited back to the original payment method.
        </Typography>

        <Typography variant="h6" gutterBottom>4. Non-Refundable Fees</Typography>
        <Typography paragraph>
          Any fees for processing or other non-refundable administrative costs are not subject to refund.
        </Typography>

        <Typography variant="h6" gutterBottom>5. Contact Information</Typography>
        <Typography paragraph>
          For any questions or issues regarding refunds and cancellations, please contact us at <b>dean.socs@sru.edu.in</b>.
        </Typography>
      </Box>
    </Container>
    <Footer />
    </div>
  );
};

export default RefundPolicy;