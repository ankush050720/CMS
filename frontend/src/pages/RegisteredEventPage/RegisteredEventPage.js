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
} from "@mui/material";
import "./RegisteredEventPage.css";
import CircularProgress from "@mui/material/CircularProgress"; // Spinner for loading

const RegisteredEvents = () => {
  const [team, setTeam] = useState(null);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newTeamName, setNewTeamName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);

  useEffect(() => {
    const fetchTeamAndEvents = async () => {
      try {
        const teamData = await authService.getTeamDetails();
        setTeam(teamData || null);
        setNewTeamName(teamData?.name || "");

        setIsLoadingEvents(true); // Start loading
        const registeredEvents = await eventService.getRegisteredEvents();
        setRegisteredEvents(registeredEvents.events || []);
        setIsLoadingEvents(false); // Stop loading
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
        setIsLoadingEvents(false); // Stop loading even on error
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
      setError("");
    } catch (err) {
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

    // Confirm cancellation
    const isConfirmed = window.confirm(
      "Are you sure you want to cancel the registration?"
    );
    if (!isConfirmed) return;

    try {
      // Call the service to cancel registration
      const response = await eventService.cancelRegistration(team._id, eventId);

      // Check if the response is successful
      if (response.success) {
        // Show success message
        alert(
          "Your event registration has been cancelled. Your refund has been processed and will be reflected back in your account in 5-7 working days."
        );

        // Update the UI by removing the cancelled event from registeredEvents
        setRegisteredEvents((prevEvents) =>
          prevEvents.filter((event) => event._id !== eventId)
        );
      } else {
        // Handle the case where the cancellation failed
        alert("Failed to cancel registration. Please try again.");
      }
    } catch (error) {
      // Handle any errors from the service call
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
      <Card sx={{ width: "80%", maxWidth: "800px", boxShadow: 5 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Team Details
          </Typography>
          {team ? (
            <Box>
              <Typography variant="h6">
                <strong>Team Name:</strong> {team.name}
              </Typography>
              <form onSubmit={handleUpdateTeamName}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="New Team Name"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  sx={{ marginBottom: 2 }}
                  required
                />
                <Button type="submit" variant="contained" color="primary">
                  Update Team Name
                </Button>
              </form>

              <Typography variant="h6" sx={{ marginTop: 2 }}>
                <strong>Members:</strong> {team.members.join(", ")}
              </Typography>

              <form onSubmit={handleAddMember} style={{ marginTop: "1rem" }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="New Member's Email"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  sx={{ marginBottom: 2 }}
                  required
                />
                <Button type="submit" variant="contained" color="primary">
                  Send Invitation
                </Button>
              </form>

              <Button
                onClick={handleLeaveTeam}
                variant="outlined"
                color="secondary"
                sx={{ marginTop: 2 }}
              >
                Leave Team
              </Button>

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
              <form onSubmit={handleCreateTeam} style={{ marginTop: "1rem" }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Enter New Team Name"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  sx={{ marginBottom: 2 }}
                  required
                />
                <Button type="submit" variant="contained" color="primary">
                  Create Team
                </Button>
              </form>
            </Box>
          )}

          <Typography variant="h5" sx={{ marginTop: 4 }}>
            Events Registered
          </Typography>
          {isLoadingEvents ? (
            <CircularProgress sx={{ marginTop: 2 }} />
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
                      <Button
                        variant="outlined"
                        color="error"
                        sx={{ marginLeft: 2 }}
                        onClick={() =>
                          handleCancelRegistration(event._id)
                        }
                      >
                        Cancel Registration
                      </Button>
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
