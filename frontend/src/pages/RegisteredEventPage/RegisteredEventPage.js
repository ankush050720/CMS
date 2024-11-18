import React, { useState, useEffect } from "react";
import authService from "../../services/teamService";
import eventService from "../../services/registeredEventService";
import {
  Card,
  CardContent,
  CardActions,
  TextField,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Alert,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useMediaQuery } from "@mui/material"; // Import for media query
import "./RegisteredEventPage.css";
import LoadingButton from '../../components/LoadingButton';
import LoadingForm from '../../components/LoadingForm';

const RegisteredEvents = () => {
  const [team, setTeam] = useState(null);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newTeamName, setNewTeamName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);

  // Check if screen width is less than 768px
  const isSmallScreen = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    const fetchTeamAndEvents = async () => {
      try {
        const teamData = await authService.getTeamDetails();
        setTeam(teamData || null);
        setNewTeamName(teamData?.name || "");

        setIsLoadingEvents(true);
        const registeredEvents = await eventService.getRegisteredEvents();
        setRegisteredEvents(registeredEvents.events || []);
        setIsLoadingEvents(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
        setIsLoadingEvents(false);
      }
    };

    fetchTeamAndEvents();
  }, []);

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    try {
      const teamData = await authService.createTeam(newTeamName);
      setTeam(teamData);
      setSuccess("Team created successfully");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Error creating team");
      setSuccess("");
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      await authService.addTeamMember(team._id, newMemberEmail);
      setSuccess("Invitation sent successfully");
      alert("Invitation sent successfully");
      setError("");
    } catch (err) {
      alert("Error adding member");
      setError(err.response?.data?.message || "Error adding member");
      setSuccess("");
    }
  };

  const handleLeaveTeam = async () => {
    if (!team) return;
    try {
      await authService.leaveTeam(team._id);
      setSuccess("You have left the team");
      setError("");
      setTeam(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error leaving team");
      setSuccess("");
    }
  };

  const handleUpdateTeamName = async (e) => {
    e.preventDefault();
    try {
      await authService.updateTeamName(team._id, newTeamName);
      setSuccess("Team name updated successfully");
      setError("");
      setTeam({ ...team, name: newTeamName });
    } catch (err) {
      setError(err.response?.data?.message || "Error updating team name");
      setSuccess("");
    }
  };

  const handleCancelRegistration = async (eventId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to cancel the registration?"
    );
    if (!isConfirmed) return;

    try {
      console.log(team , eventId);
      const response = await eventService.cancelRegistration(team._id, eventId);

      if (response.success) {
        alert(
          "Your event registration has been cancelled. Your refund has been processed and will be reflected back in your account in 5-7 working days."
        );

        setRegisteredEvents((prevEvents) =>
          prevEvents.filter((event) => event._id !== eventId)
        );
      } else {
        alert("Failed to cancel registration. Please try again.");
      }
    } catch (error) {
      console.error("Error cancelling registration:", error);
      alert(
        "An error occurred while cancelling registration. Please try again later."
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: 4,
        marginBottom: 4,
      }}
    >
      <Card
        sx={{
          width: isSmallScreen ? "95%" : "80%", // Use 95% width for small screens
          maxWidth: "800px",
          boxShadow: 5,
        }}
      >
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Team Details
          </Typography>
          {team ? (
            <Box>
              <Typography variant="h6">
                <strong>Team Name:</strong> {team.name}
              </Typography>
              <LoadingForm onSubmit={handleUpdateTeamName}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="New Team Name"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  sx={{ marginBottom: 2 }}
                  required
                />
                <LoadingButton type="submit" variant="contained" color="primary">
                  Update Team Name
                </LoadingButton>
              </LoadingForm>

              <Typography variant="h6" sx={{ marginTop: 2 }}>
                <strong>Members:</strong> {team.members.join(", ")}
              </Typography>

              <LoadingForm onSubmit={handleAddMember} style={{ marginTop: "1rem" }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="New Member's Email"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  sx={{ marginBottom: 2 }}
                  required
                />
                <LoadingButton type="submit" variant="contained" color="primary">
                  Send Invitation
                </LoadingButton>
              </LoadingForm>

              <LoadingButton
                onClick={handleLeaveTeam}
                variant="outlined"
                color="secondary"
                sx={{ marginTop: 2 }}
              >
                Leave Team
              </LoadingButton>

              {error && (
                <Alert severity="error" sx={{ marginTop: 2 }}>
                  {error}
                </Alert>
              )}
              {success && (
                <Alert severity="success" sx={{ marginTop: 2 }}>
                  {success}
                </Alert>
              )}
            </Box>
          ) : (
            <Box>
              <Typography>You are not part of any team yet.</Typography>
              <LoadingForm onSubmit={handleCreateTeam} style={{ marginTop: "1rem" }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Enter New Team Name"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  sx={{ marginBottom: 2 }}
                  required
                />
                <LoadingButton type="submit" variant="contained" color="primary">
                  Create Team
                </LoadingButton>
              </LoadingForm>
            </Box>
          )}

          <Typography variant="h5" sx={{ marginTop: 4 }}>
            Events Registered
          </Typography>
          {isLoadingEvents ? (
            <CircularProgress sx={{ marginTop: 2, color: 'limegreen' }} />
          ) : registeredEvents.length > 0 ? (
            <List>
              {registeredEvents.map((event) => {
                return (
                  <ListItem key={event._id}>
                    <ListItemText
                      primary={event.name}
                      secondary={`${new Date(
                        event.date
                      ).toLocaleDateString()} at ${event.time}`}
                    />
                    {event.status === "upcoming" && (
                      <LoadingButton
                        variant="outlined"
                        color="error"
                        sx={{ marginLeft: 2 }}
                        onClick={() =>
                          handleCancelRegistration(event._id)
                        }
                      >
                        Cancel Registration
                      </LoadingButton>
                    )}
                  </ListItem>
                );
              })}
            </List>
          ) : (
            <Typography>No events registered.</Typography>
          )}
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </Box>
  );
};

export default RegisteredEvents;