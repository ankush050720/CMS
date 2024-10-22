import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Event as EventIcon, People as PeopleIcon, AttachMoney as AttachMoneyIcon } from '@mui/icons-material';

const EventCard = ({ event, onClick }) => {
  // Format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Customize date format as needed
  };

  return (
    <Card
      sx={{
        background: 'linear-gradient(135deg, #42a5f5, #1e88e5)', // Gradient background for added depth
        color: '#fff',
        borderRadius: '12px',
        padding: '25px',
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)', // Enhanced shadow depth
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
        maxWidth: 320,
        margin: '15px',
        textAlign: 'center',
        '&:hover': {
          transform: 'scale(1.08)',
          boxShadow: '0 16px 32px rgba(0, 0, 0, 0.4)', // More pronounced shadow on hover
          background: 'linear-gradient(135deg, #64b5f6, #2196f3)', // Change gradient on hover
        },
        '&:hover .event-title': {
          fontSize: '30px',
        },
        '&:hover .event-details': {
          fontSize: '10px',
        },
      }}
      onClick={onClick}
    >
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          className="event-title"
          sx={{
            marginBottom: '15px',
            fontWeight: 600,
            transition: 'font-size 0.3s ease',
            fontSize: '22px', // Default font size
          }}
        >
          {event.name}
        </Typography>

        <Box
          className="event-details"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px', // More space between elements
            fontSize: '16px',
            transition: 'font-size 0.3s ease',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', transition: 'transform 0.3s ease' }}>
            <EventIcon
              sx={{
                marginRight: '8px',
                fontSize: '24px',
                transition: 'color 0.3s ease, transform 0.3s ease',
                '&:hover': {
                  color: '#ffeb3b', // Change color on hover
                  transform: 'scale(1.2)', // Slightly enlarge icon on hover
                },
              }}
            />
            {formatDate(event.date)}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', transition: 'transform 0.3s ease' }}>
            <AttachMoneyIcon
              sx={{
                marginRight: '8px',
                fontSize: '24px',
                transition: 'color 0.3s ease, transform 0.3s ease',
                '&:hover': {
                  color: '#ffeb3b',
                  transform: 'scale(1.2)',
                },
              }}
            />
            {event.fee}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', transition: 'transform 0.3s ease' }}>
            <PeopleIcon
              sx={{
                marginRight: '8px',
                fontSize: '24px',
                transition: 'color 0.3s ease, transform 0.3s ease',
                '&:hover': {
                  color: '#ffeb3b',
                  transform: 'scale(1.2)',
                },
              }}
            />
            {event.members}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EventCard;
