import { useState } from 'react';
import { sendForgotPasswordLink } from '../../services/forgotPasswordService';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

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
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, boxShadow: 3, p: 4, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
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
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2">
            <a href="/login">Back to Login</a>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPasswordForm;
