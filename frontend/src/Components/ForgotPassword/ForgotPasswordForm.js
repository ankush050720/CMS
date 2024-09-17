import { useState } from 'react';
import { sendForgotPasswordLink } from '../../services/forgotPasswordService';
import { TextField, Button, Typography, Box } from '@mui/material';
import './ForgotPasswordForm.css'; // Assuming you have a CSS file for background image

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await sendForgotPasswordLink(email);
      alert('Password reset link sent to your email');
    } catch (err) {
      console.error(err);
      alert('Error sending reset link');
    }
  };

  return (
    <div className='container'>
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'flex-start', // Align form to the left
        alignItems: 'center', // Vertically center the form
        paddingLeft: '5%', // Adjust to position the form on the left
      }}
    >
      <Box sx={{ maxWidth: 400 }}> {/* Set max width for smaller form */}
        <Typography variant="h4" gutterBottom>
          Forgot Password
        </Typography>
        <form onSubmit={handleForgotPassword}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="off"
            size="small" // Smaller form field
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Send Reset Link
          </Button>
        </form>

        <Box sx={{ mt: 2, textAlign: 'left' }}> {/* Align the text to the left */}
          <Typography variant="body2">
            <a href="/login">Back to Login</a>
          </Typography>
        </Box>
      </Box>
    </Box>
    </div>
  );
};

export default ForgotPasswordForm;
