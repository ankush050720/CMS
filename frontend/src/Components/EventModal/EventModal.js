import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Typography, Button, Divider, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getUserInfo } from '../../services/userService';
import PaymentService from '../../services/paymentService';
import EventRegService from '../../services/eventRegService';

// Create a Slide transition component
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EventModal = ({ event, isOpen, onRequestClose }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsActive(true), 10);
    } else {
      setIsActive(false);
    }
  }, [isOpen]);

  const handlePayment = async () => {
    try {
      const userInfo = await getUserInfo();
      if (!userInfo) {
        window.location.replace('/login');
        return;
      }

      const paymentSuccess = await PaymentService.processPayment(event.fee);
      if (paymentSuccess) {
        const registrationResult = await EventRegService.registerTeamForEvent(event._id, userInfo.email);

        if (registrationResult.alreadyRegistered) {
          alert('Team is already registered for this event.');
          return;
        }

        alert('Registration successful!');
        onRequestClose();
      } else {
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      if (error.message === 'Unauthorized') {
        window.location.replace('/login');
      } else {
        console.error('Payment or registration error:', error);
        alert('An error occurred. Please try again.');
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onRequestClose}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Transition} // Apply the Slide transition
      TransitionProps={{ onEntered: () => setIsActive(true) }}
    >
      <DialogTitle sx={{ position: 'relative', fontWeight: 700 }}>
        {event.name}
        <IconButton
          edge="end"
          color="inherit"
          onClick={onRequestClose}
          aria-label="close"
          sx={{ position: 'absolute', right: '20px', top: 8, color: (theme) => theme.palette.grey[500] }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginTop: '20px' }}>
          <img
            src={event.logo || 'https://via.placeholder.com/180'}
            alt="Event Poster"
            style={{ width: '180px', height: '180px', borderRadius: '8px', objectFit: 'cover' }}
          />
          <div>
            <Typography variant="body1" paragraph sx={{ mb: 2 }}>
              {event.description}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              📅 {formatDate(event.date)}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              ⏰ {event.time}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              📍 {event.venue}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              💰 {event.fee}
            </Typography>
          </div>
        </div>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'flex-end', px: 3, pb: 2 }}>
        <Button onClick={handlePayment} variant="contained" color="primary">
          Register Now
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventModal;