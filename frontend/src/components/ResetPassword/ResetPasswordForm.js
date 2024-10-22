import { useState } from 'react';
import { resetPassword } from '../../services/resetPasswordService';
import { TextField, Button, Typography, Box } from '@mui/material';
import './ResetPasswordForm.css'; // Assuming the CSS for background image

const ResetPasswordForm = () => {
  const [password, setPassword] = useState('');
  const [token] = useState(new URLSearchParams(window.location.search).get('token'));
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await resetPassword(token, password);
      setMessage(res.msg);
    } catch (err) {
      setMessage(err.message || 'Server error');
    }
  };

  return (
    <div className='container'> 
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'flex-start', // Align form to the left
        alignItems: 'center', // Center vertically
        paddingLeft: '5%', // Space from the left
      }}
    >
      <Box sx={{ maxWidth: 400 }}> {/* Restrict form width */}
        <Typography variant="h4" gutterBottom>
          Reset Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="New Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="off"
            size="small" // Compact field size
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Submit
          </Button>

          {message && (
            <Typography color="error" sx={{ mt: 2 }}>
              {message}
            </Typography>
          )}
        </form>
      </Box>
    </Box>
    </div>
  );
};

export default ResetPasswordForm;
