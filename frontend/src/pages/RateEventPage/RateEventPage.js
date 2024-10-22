import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Select, MenuItem, Paper } from "@mui/material";
import EventCard from "../../Components/EventCard/EventCard";
import EventModal from "../../Components/EventModal/EventModal";
import { getAllEvents } from "../../services/eventService";
import { getAllClubs } from "../../services/clubService";
import "./RateEventPage.css";

const RateEventPage = () => {
  const [events, setEvents] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedClub, setSelectedClub] = useState("All Clubs"); // State for selected club

  useEffect(() => {
    const fetchEventsAndClubs = async () => {
      const eventData = await getAllEvents();
      const clubData = await getAllClubs();
      setEvents(eventData);
      setClubs(clubData);
    };

    fetchEventsAndClubs();
  }, []);

  const openEventModal = (event) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  const closeEventModal = () => {
    setSelectedEvent(null);
    setIsEventModalOpen(false);
  };

  const handleClubSelection = (e) => {
    setSelectedClub(e.target.value); // Update selected club
  };

  // Filter completed events based on selected club
  const filteredEvents =
    selectedClub === "All Clubs"
      ? events.filter(event => event.status === "completed")
      : events.filter(event => event.club === selectedClub && event.status === "completed");

  return (
    <Container maxWidth="lg" sx={{ paddingY: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Completed Events
      </Typography>

      <Select
        value={selectedClub}
        onChange={handleClubSelection}
        displayEmpty
        fullWidth
        variant="outlined"
        sx={{ mb: 4 }}
      >
        <MenuItem value="All Clubs">All Clubs</MenuItem>
        {clubs.map((club) => (
          <MenuItem key={club._id} value={club.name}>
            {club.name}
          </MenuItem>
        ))}
      </Select>

      <Paper elevation={2} sx={{ padding: 2, marginBottom: 4 }}>
        <Typography variant="h5" gutterBottom>
          {selectedClub === "All Clubs" ? "All Completed Events" : selectedClub}
        </Typography>

        {/* Completed Events Section */}
        <EventGrid
          events={filteredEvents}
          clubName={selectedClub === "All Clubs" ? "All Clubs" : selectedClub}
          status="completed"
          openEventModal={openEventModal}
        />
      </Paper>

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          isOpen={isEventModalOpen}
          onRequestClose={closeEventModal}
        />
      )}
    </Container>
  );
};

// EventGrid component to handle rendering completed events
const EventGrid = ({ events, openEventModal }) => {
  return events.length > 0 ? (
    <Grid container spacing={3}>
      {events.map((event) => (
        <Grid item xs={12} sm={6} md={4} key={event._id} sx={{ minWidth: '280px' }}>
          <EventCard event={event} onClick={() => openEventModal(event)} />
        </Grid>
      ))}
    </Grid>
  ) : (
    <Typography variant="body1" align="center" sx={{ mt: 2 }}>
      No completed events right now, check back later.
    </Typography>
  );
};

export default RateEventPage;
