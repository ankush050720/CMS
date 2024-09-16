import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Select, MenuItem } from "@mui/material";
import EventCard from "../../components/EventCard/EventCard";
import EventModal from "../../components/EventModal/EventModal";
import { getAllEvents } from "../../services/eventService";
import { getAllClubs } from "../../services/clubService";
import "./EventPage.css";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedClub, setSelectedClub] = useState("All Clubs"); // Dropdown state

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
    setSelectedClub(e.target.value);
  };

  const filteredEvents =
    selectedClub === "All Clubs"
      ? events
      : events.filter((event) => event.club === selectedClub);

  // Filter clubs based on selected option
  const filteredClubs =
    selectedClub === "All Clubs"
      ? clubs
      : clubs.filter((club) => club.name === selectedClub);

  return (
    <Container maxWidth="lg">
      {/* Dropdown menu for selecting clubs */}
      <Typography variant="h4" gutterBottom align="center">
        Events
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

      {filteredClubs.map((club) => (
        <div key={club._id} className="club-section">
          <Typography variant="h5" gutterBottom>
            {club.name}
          </Typography>
          {filteredEvents.length > 0 ? (
            <Grid container spacing={3}>
              {filteredEvents
                .filter((event) => event.club === club.name)
                .map((event) => (
                  <Grid item xs={12} sm={6} md={4} key={event._id}>
                    <EventCard
                      event={event}
                      onClick={() => openEventModal(event)}
                    />
                  </Grid>
                ))}
            </Grid>
          ) : (
            <Typography variant="body1" align="center" sx={{ mt: 2 }}>
              No events right now, check back later.
            </Typography>
          )}
        </div>
      ))}

      {/* Modal for displaying event details */}
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

export default EventPage;
