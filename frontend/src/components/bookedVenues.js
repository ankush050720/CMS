import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
        <Card elevation={4} className={className} style={{ marginBottom: "20px", marginTop: "40px" }}>
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
            {Object.keys(groupedEvents).length > 0 ? (
              <TableContainer component={Paper} style={{ marginTop: "20px", maxWidth: "100%", overflowX: "auto" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Club</strong></TableCell>
                      <TableCell><strong>Event Name</strong></TableCell>
                      <TableCell><strong>Date</strong></TableCell>
                      <TableCell><strong>Time</strong></TableCell>
                      <TableCell><strong>Venue</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.keys(groupedEvents).map((club) => (
                      groupedEvents[club].map((event) => (
                        <TableRow key={event._id}>
                          <TableCell>{club}</TableCell>
                          <TableCell>{event.name}</TableCell>
                          <TableCell>{formatDate(event.date)}</TableCell>
                          <TableCell>{event.time}</TableCell>
                          <TableCell>{event.venue}</TableCell>
                        </TableRow>
                      ))
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="body1" style={{ marginTop: "20px" }}>
                No events found.
              </Typography>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default BookedVenues;