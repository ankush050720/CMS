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
  CircularProgress,
} from "@mui/material";
import { checkVenue } from "../services/eventService";

const BookedVenues = ({ className, selectedAction }) => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const eventData = await checkVenue();
        const filteredEvents = eventData.filter(
          (event) => event.status === "upcoming" || event.status === "ongoing"
        );
        setEvents(filteredEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchAllEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.venue.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const groupedEvents = filteredEvents.reduce((acc, event) => {
    if (!acc[event.club]) {
      acc[event.club] = [];
    }
    acc[event.club].push(event);
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
            <TextField
              variant="outlined"
              label="Search by venue name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
              margin="normal"
            />
            
            {loading ? (
              <Box display="flex" justifyContent="center" marginTop="20px">
                <CircularProgress />
              </Box>
            ) : (
              Object.keys(groupedEvents).length > 0 ? (
                <TableContainer component={Paper} style={{ marginTop: "20px", overflowX: "auto" }}>
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
                      {Object.keys(groupedEvents).map((club) =>
                        groupedEvents[club].map((event) => (
                          <TableRow key={event._id}>
                            <TableCell>{club}</TableCell>
                            <TableCell>{event.name}</TableCell>
                            <TableCell>{formatDate(event.date)}</TableCell>
                            <TableCell>{event.time}</TableCell>
                            <TableCell>{event.venue}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography variant="body1" style={{ marginTop: "20px" }}>
                  No events found.
                </Typography>
              )
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default BookedVenues;