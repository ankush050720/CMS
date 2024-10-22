import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import teamService from '../../services/teamService'; // Import the default export

const AcceptInvitation = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token'); // Extract the token from the query string
  console.log('Token:', token);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const acceptInvitation = async () => {
      if (!token) {
        setMessage('Invalid invitation link');
        return;
      }
      try {
        console.log('Sending request to accept invitation...');
        const response = await teamService.acceptTeamInvitation(token); // Access function from default export
        setMessage(response.message);
      } catch (err) {
        console.error('Error:', err);
        setMessage(err.response?.data?.message || 'Error accepting invitation');
      }
    };

    acceptInvitation();
  }, [token]);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};

export default AcceptInvitation;
