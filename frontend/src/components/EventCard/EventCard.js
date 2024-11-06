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
        background: 'linear-gradient(135deg, #2196f3, #1e88e5)',
        color: '#fff',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        maxWidth: '250px',
        textAlign: 'center',
        overflow: 'hidden',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)',
          '& .event-title': {
            fontSize: { xs: '20px', sm: '24px' }, // Enlarged title on hover
          },
          '& .event-detail-text': {
            fontSize: { xs: '12px', sm: '14px' }, // Reduced text size for other details on hover
          },
        },
      }}
      onClick={onClick}
    >
      <CardContent sx={{ padding: '16px', overflow: 'hidden' }}>
        <Typography
          variant="h6"
          component="div"
          className="event-title"
          sx={{
            fontWeight: 600,
            marginBottom: '8px',
            fontSize: { xs: '18px', sm: '20px' }, // Default title size
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            transition: 'font-size 0.3s ease', // Smooth size transition for title
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
            gap: '12px',
            fontSize: { xs: '14px', sm: '16px' }, // Default size for details
          }}
        >
          {/* Date Section */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              '&:hover .event-icon-date': { color: 'yellow' }, // Change icon color on hover
            }}
          >
            <EventIcon className="event-icon-date" fontSize="small" sx={{ transition: 'color 0.3s ease' }} />
            <Typography
              variant="body2"
              className="event-detail-text"
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                transition: 'font-size 0.3s ease', // Smooth size transition for detail text
              }}
            >
              {formatDate(event.date)}
            </Typography>
          </Box>

          {/* Fee Section */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              '&:hover .event-icon-fee': { color: 'yellow' }, // Change icon color on hover
            }}
          >
            <AttachMoneyIcon className="event-icon-fee" fontSize="small" sx={{ transition: 'color 0.3s ease' }} />
            <Typography
              variant="body2"
              className="event-detail-text"
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                transition: 'font-size 0.3s ease', // Smooth size transition for detail text
              }}
            >
              {event.fee}
            </Typography>
          </Box>

          {/* Members Section */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              '&:hover .event-icon-members': { color: 'yellow' }, // Change icon color on hover
            }}
          >
            <PeopleIcon className="event-icon-members" fontSize="small" sx={{ transition: 'color 0.3s ease' }} />
            <Typography
              variant="body2"
              className="event-detail-text"
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                transition: 'font-size 0.3s ease', // Smooth size transition for detail text
              }}
            >
              {event.members}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EventCard;