import React from 'react';
import { Card, CardContent, Typography, Button, Box, Avatar, Chip } from '@mui/material';

const ClubCard = ({ name, logo, type, facultyLead, studentLead, onMoreDetailsClick }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: 290,
        backgroundColor: '#f4f4f4',
        borderRadius: '15px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
        padding: 1,
        margin: 2,
        height: 470,
        textAlign: 'left',
      }}
    >
      {/* Club Logo */}
      <Avatar
        src={logo}
        alt={`${name} logo`}
        variant="square"
        sx={{
          marginTop: '5px',
          width: '98%',
          height: 160,
          borderRadius: '15px',
          backgroundColor: '#fff',
          objectFit: 'cover',
          marginBottom: '10px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      />

      <CardContent sx={{ paddingLeft: 1, paddingRight: 1, flexGrow: 1 }}>
        {/* Club Type */}
        <Chip
          label={type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
          sx={{
            backgroundColor: '#ffd7d1',
            color: 'black',
            fontWeight: '400',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '0.875rem',
            borderRadius: '5px',
            marginBottom: '15px',
            padding: '0 10px',
            letterSpacing: '0.05rem',
            borderRadius: '5px',
            marginBottom: '15px',
            padding: '0 10px',
            letterSpacing: '0.05rem',
          }}
        />

        {/* Club Name */}
        <Typography
          variant="h5"
          component="div"
          sx={{
            width: '80%',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: '800',
            fontSize: '1.6rem',
            color: '#333',
            marginBottom: '20px',
            lineHeight: 1.2,
          }}
        >
          {name}
        </Typography>

        {/* Faculty Lead */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '0.875rem',
            marginBottom: '8px',
            color: '#555',
          }}
        >
          Faculty Advisor: <strong>{facultyLead}</strong>
        </Typography>

        {/* Student Lead */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '0.875rem',
            color: '#555',
          }}
        >
          Student Lead: <strong>{studentLead}</strong>
        </Typography>
      </CardContent>

      {/* More Details Button */}
      <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
        <Button
          variant="contained"
          onClick={onMoreDetailsClick}
          sx={{
            backgroundColor: '#333',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            borderRadius: '30px',
            padding: '10px 30px',
            fontSize: '0.875rem',
            letterSpacing: '0.05rem',
            '&:hover': {
              transform: 'none',
              backgroundColor: 'red',
            },
          }}
        >
          More Details
        </Button>
      </Box>
    </Card>
  );
};

export default ClubCard;