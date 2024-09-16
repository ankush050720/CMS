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

const RegisteredEvents = () => {
  const [team, setTeam] = useState(null);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newTeamName, setNewTeamName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    const fetchTeamAndEvents = async () => {
      try {
        const teamData = await authService.getTeamDetails();
        setTeam(teamData || null);
        setNewTeamName(teamData?.name || "");

        const { registeredEvents } = await eventService.getRegisteredEvents();
        setRegisteredEvents(registeredEvents || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
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

  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
      <Card sx={{ width: "80%", maxWidth: "800px" }}>
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
          {registeredEvents.length > 0 ? (
            <List>
              {registeredEvents.map((event) => (
                <ListItem key={event._id}>
                  <ListItemText
                    primary={event.name}
                    secondary={`${new Date(event.date).toLocaleDateString()} at ${event.time}`}
                  />
                </ListItem>
              ))}
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
