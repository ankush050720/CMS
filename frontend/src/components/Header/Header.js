import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { logout } from '../../services/loginService';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';

const Header = ({ email, className }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    handleMenuClose();
  };

  const handleRegisteredEventsClick = () => {
    navigate('/registered-events');
    handleMenuClose();
  };

  const handleLogoutClick = async () => {
    if (window.confirm('Do you want to exit?')) {
      try {
        await logout();
        navigate('/login');
      } catch (err) {
        console.error('Logout failed', err);
      }
    }
    handleMenuClose();
  };

  const handleLoginClick = () => {
    navigate('/login');
    handleMenuClose();
  };

  return (
    <AppBar className = {className} position="static" sx={{ width: '100%', margin: '0 auto', backgroundColor: 'primary.main' }}> {/* Set original color */}
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Logged in as: {email || 'Guest'}
        </Typography>

        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuClick}
        >
          <FontAwesomeIcon icon={faCog} />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {email ? (
            <>
              <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
              <MenuItem onClick={handleRegisteredEventsClick}>Registered Events</MenuItem>
              <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </>
          ) : (
            <MenuItem onClick={handleLoginClick}>Login</MenuItem>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
