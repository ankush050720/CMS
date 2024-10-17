import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Box,
} from "@mui/material";
import { checkVenue } from "../services/eventService";

const BookedVenues = ({ className, selectedAction }) => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const eventData = await checkVenue();
        // Filter events to include only upcoming or ongoing
        const filteredEvents = eventData.filter(
          (event) => event.status === "upcoming" || event.status === "ongoing"
        );
        setEvents(filteredEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchAllEvents();
  }, []);

  // Filter events based on search input
  const filteredEvents = events.filter((event) =>
    event.venue.toLowerCase().includes(search.toLowerCase())
  );

  // Function to format date to ISO format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Only returns the date part
  };

  // Group events by club
  const groupedEvents = filteredEvents.reduce((acc, event) => {
    if (!acc[event.club]) {
      acc[event.club] = []; // Create a new array for the club if it doesn't exist
    }
    acc[event.club].push(event); // Push the event into the club's array
    return acc;
  }, {});

  return (
    <>
      {selectedAction === "checkBookedVenues" && (
        <Card elevation={4} className={className} style={{marginBottom:"20px", marginTop:"40px"}}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              <b>Booked Venues</b>
            </Typography>
            {/* Search Input */}
            <TextField
              variant="outlined"
              label="Search by venue name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
              margin="normal"
            />
            {Object.keys(groupedEvents)
              .filter(club => groupedEvents[club].length > 0) // Filter out clubs without events
              .map((club) => (
                <Box key={club} mb={2}>
                  <Typography variant="h6" gutterBottom>
                    <strong>{club}</strong>
                  </Typography>
                  {groupedEvents[club].map((event, index) => (
                    <Box key={event._id} mb={1} pl={2}>
                      <Typography variant="body1">
                        <strong>{index + 1}. {event.name}</strong>
                        <br />
                        <span>Date: {formatDate(event.date)}</span>
                        <br />
                        <span>Time: {event.time}</span>
                        <br />
                        <span>Venue: {event.venue}</span>
                      </Typography>
                    </Box>
                  ))}
                </Box>
              ))}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default BookedVenues;
