import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import { getUserInfo } from '../../services/userService';
import EventPage from '../EventPage/EventPage';
import { Box, Typography, Container, Paper } from '@mui/material'; // Material-UI imports
import './GuestPage.css'; // You can still keep your custom CSS if needed

const GuestPage = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userInfo = await getUserInfo();
        setEmail(userInfo.email); // Set email from user info
      } catch (err) {
        console.error('Error fetching user info', err);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <Container maxWidth="lg">
      <Header email={email} /> {/* Pass the email to Header */}
      
      {/* Main content area with Material-UI styling */}
      <Box mt={4} mb={4}>
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Welcome, Guest!
          </Typography>
          
          <EventPage /> {/* EventPage component remains untouched */}
        </Paper>
      </Box>
    </Container>
  );
};

export default GuestPage;