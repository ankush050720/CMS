import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../../services/userService';
import { Card, CardContent, Typography, Grid, CircularProgress } from '@mui/material'; // Material-UI imports
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
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Profile
            </Typography>
            {userInfo && (
              <div className="profile-details">
                <Typography variant="h6">
                  Email: {userInfo.email}
                </Typography>
                <Typography variant="h6">
                  Phone Number: {userInfo.phone}
                </Typography>
                <Typography variant="h6">
                  Role: {userInfo.role}
                </Typography>
              </div>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Profile;
