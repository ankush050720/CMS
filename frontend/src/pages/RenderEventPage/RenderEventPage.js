import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Select, MenuItem, Paper } from "@mui/material";
import EventCard from "../../Components/EventCard/EventCard";
import EventModal from "../../Components/EventModal/EventModal";
import { getAllEvents } from "../../services/eventService";
import { getAllClubs } from "../../services/clubService";
// import "./RenderEventPage.css";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedClub, setSelectedClub] = useState("All Clubs");

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

  // Filter events based on selected club
  const filteredEvents =
    selectedClub === "All Clubs"
      ? events
      : events.filter((event) => event.club === selectedClub);

  return (
    <Container maxWidth="lg" sx={{ paddingY: 4 }}>
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

      {selectedClub === "All Clubs" ? (
        clubs.map((club) => (
          <Paper key={club._id} elevation={2} sx={{ padding: 2, marginBottom: 4 }}>
            <Typography variant="h5" gutterBottom>
              {club.name}
            </Typography>

            {/* Upcoming Events */}
            <Section title="Upcoming" events={events} clubName={club.name} status="upcoming" openEventModal={openEventModal} />

            {/* Ongoing Events */}
            <Section title="Ongoing" events={events} clubName={club.name} status="ongoing" openEventModal={openEventModal} />

            {/* Merged Completed/Feedback Closed Events */}
            <Section title="Completed" events={events} clubName={club.name} status={["completed", "feedbackClosed"]} openEventModal={openEventModal} />
          </Paper>
        ))
      ) : (
        <Paper elevation={2} sx={{ padding: 2, marginBottom: 4 }}>
          <Typography variant="h5" gutterBottom>
            {selectedClub}
          </Typography>

          {/* Upcoming Events */}
          <Section title="Upcoming" events={filteredEvents} clubName={selectedClub} status="upcoming" openEventModal={openEventModal} />

          {/* Ongoing Events */}
          <Section title="Ongoing" events={filteredEvents} clubName={selectedClub} status="ongoing" openEventModal={openEventModal} />

          {/* Merged Completed/Feedback Closed Events */}
          <Section title="Completed / Feedback Closed" events={filteredEvents} clubName={selectedClub} status={["completed", "feedbackClosed"]} openEventModal={openEventModal} />
        </Paper>
      )}

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

// Section Component for Event Status
const Section = ({ title, events, clubName, status, openEventModal }) => {
  return (
    <Paper elevation={1} sx={{ padding: 2, marginY: 2 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <EventGrid events={events} clubName={clubName} status={status} openEventModal={openEventModal} />
    </Paper>
  );
};

// EventGrid component to handle rendering events
const EventGrid = ({ events, clubName, status, openEventModal }) => {
  const filteredEvents = Array.isArray(status)
    ? events.filter(event => event.club === clubName && status.includes(event.status))
    : events.filter(event => event.club === clubName && event.status === status);

  return filteredEvents.length > 0 ? (
    <Grid container spacing={3}>
      {filteredEvents.map(event => (
        <Grid item xs={12} sm={6} md={4} key={event._id} sx={{ minWidth: '280px' }}>
          <EventCard event={event} onClick={() => openEventModal(event)} />
        </Grid>
      ))}
    </Grid>
  ) : (
    <Typography variant="body1" align="center" sx={{ mt: 2 }}>
      No {Array.isArray(status) ? 'completed' : status} events right now, check back later.
    </Typography>
  );
};

export default EventPage;