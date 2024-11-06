import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../../services/userService';
import { Card, CardContent, Typography, Grid, CircularProgress, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useMediaQuery } from '@mui/material';

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isSmallScreen = useMediaQuery("(max-width:768px)");

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
    <Grid container justifyContent="center" style={{ marginTop: '2rem', padding: '0 1rem' }}>
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Card
          elevation={5}
          style={{
            padding: isSmallScreen ? '1rem' : '2rem',
            backgroundColor: '#f9f9f9',
            boxSizing: 'border-box',
            maxWidth: '100%',
            width: '100%',
          }}
        >
          <CardContent>
            <Grid container direction="column" alignItems="center">
              {/* Avatar or user icon */}
              <Avatar
                style={{
                  width: isSmallScreen ? '60px' : '80px',
                  height: isSmallScreen ? '60px' : '80px',
                  marginBottom: '1rem',
                  backgroundColor: '#2c3e50',
                }}
              >
                <PersonIcon style={{ fontSize: isSmallScreen ? '2rem' : '3rem', color: '#fff' }} />
              </Avatar>

              <Typography
                variant="h4"
                gutterBottom
                style={{
                  color: '#2c3e50',
                  fontWeight: 'bold',
                  fontSize: isSmallScreen ? '1.5rem' : '2rem',
                  textAlign: 'center',
                  wordWrap: 'break-word',
                }}
              >
                Profile
              </Typography>

              {userInfo && (
                <div style={{ textAlign: 'center', maxWidth: '100%' }}>
                  <Typography
                    variant="h6"
                    style={{
                      marginBottom: '1rem',
                      color: '#34495e',
                      fontSize: isSmallScreen ? '0.9rem' : '1rem',
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word',
                    }}
                  >
                    <strong>Email:</strong> {userInfo.email}
                  </Typography>
                  <Typography
                    variant="h6"
                    style={{
                      marginBottom: '1rem',
                      color: '#34495e',
                      fontSize: isSmallScreen ? '0.9rem' : '1rem',
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word',
                    }}
                  >
                    <strong>Phone Number:</strong> {userInfo.phone}
                  </Typography>
                  <Typography
                    variant="h6"
                    style={{
                      color: '#34495e',
                      fontSize: isSmallScreen ? '0.9rem' : '1rem',
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word',
                    }}
                  >
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