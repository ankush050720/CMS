// ClubPortal.js (React component in your club portal)
import React, { useState, useEffect } from 'react';
import { getUserInfo } from '../services/userService';
import Button from '@mui/material/Button';  // Material UI Button
import CircularProgress from '@mui/material/CircularProgress'; // Spinner for loading
import { Box } from '@mui/material'; // For layout

// chatbutton component
const ChatButton = () => {
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const userInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        setUserEmail(userInfo.email);
        setLoading(false); // Once the user email is fetched, stop loading
      } catch (error) {
        console.error('Error fetching user info: ', error);
      }
    };

    userInfo();
  }, []);

  const handleChatRedirect = () => {
    const chatRelayUrl = `${process.env.REACT_APP_CHAT_FRONTEND_URL}/?email=${encodeURIComponent(userEmail)}`;
    window.location.href = chatRelayUrl; // Redirect to chat relay
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      {loading ? (
        <CircularProgress /> 
      ) : (
        <Button 
          variant="contained" 
          color="primary"     
          onClick={handleChatRedirect}
          disabled={!userEmail} 
        >
          Go to Chats
        </Button>
      )}
    </Box>
  );
};

export default ChatButton;