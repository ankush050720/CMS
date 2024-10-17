import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../../services/userService';
import { Card, CardContent, Typography, Grid, CircularProgress, Avatar } from '@mui/material'; // Material-UI imports
import PersonIcon from '@mui/icons-material/Person'; // Optional user icon
import './ProfilePage.css';

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();
        setUserInfo(data);
      } catch (err) {
        setError('Unable to fetch user information');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Grid container justifyContent="center" style={{ marginTop: '2rem' }}>
      <Grid item xs={12} md={6}>
        <Card elevation={5} style={{ padding: '2rem', backgroundColor: '#f9f9f9' }}>
          <CardContent>
            <Grid container direction="column" alignItems="center">
              {/* Avatar or user icon */}
              <Avatar
                style={{
                  width: '80px',
                  height: '80px',
                  marginBottom: '1rem',
                  backgroundColor: '#2c3e50',
                }}
              >
                <PersonIcon style={{ fontSize: '3rem', color: '#fff' }} />
              </Avatar>

              <Typography variant="h4" gutterBottom style={{ color: '#2c3e50', fontWeight: 'bold' }}>
                Profile
              </Typography>

              {userInfo && (
                <div className="profile-details" style={{ textAlign: 'center' }}>
                  <Typography variant="h6" style={{ marginBottom: '1rem', color: '#34495e' }}>
                    <strong>Email:</strong> {userInfo.email}
                  </Typography>
                  <Typography variant="h6" style={{ marginBottom: '1rem', color: '#34495e' }}>
                    <strong>Phone Number:</strong> {userInfo.phone}
                  </Typography>
                  <Typography variant="h6" style={{ color: '#34495e' }}>
                    <strong>Role:</strong> {userInfo.role}
                  </Typography>
                </div>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Profile;
