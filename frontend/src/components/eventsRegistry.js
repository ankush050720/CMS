import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { getAllRegistry } from "../services/eventService";

const EventsRegistry = ({ className, selectedAction, role }) => {
  const [data, setData] = useState([]); // To store the response data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  useEffect(() => {
    const fetchAllRegistry = async () => {
      try {
        const response = await getAllRegistry(role); // Fetch data with role
        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllRegistry();
  }, [role]); // Dependency array includes role

  // Filtered data based on the search query
  const filteredData = data.filter(event => {
    const eventMatches = event.event.toLowerCase().includes(searchQuery.toLowerCase());
    const teamsMatch = event.teams.some(team =>
      team.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.members.some(member => member.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    return eventMatches || teamsMatch;
  });

  return (
    <>
      {selectedAction === "checkEventsRegistry" && (
        <Card elevation={4} className={className} style={{ marginBottom: "20px", marginTop: "40px" }}>
          <CardContent>
            {loading ? (
              <Typography variant="h6">Loading...</Typography>
            ) : error ? (
              <Typography variant="h6" color="error">{error}</Typography>
            ) : (
              <>
                <Typography variant="h5">Event Registrations</Typography>
                <TextField
                  label="Search Events or Teams"
                  variant="outlined"
                  fullWidth
                  style={{ marginBottom: "20px", marginTop: "20px" }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Event</TableCell>
                        <TableCell>Teams Registered</TableCell>
                        <TableCell>Members in Team</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredData.length > 0 ? (
                        filteredData.map((event, index) => (
                          <TableRow key={index}>
                            <TableCell>{event.event}</TableCell>
                            <TableCell>
                              {event.teams.length > 0 ? (
                                event.teams.map((team, teamIndex) => (
                                  <div key={teamIndex}>
                                    {team.team}
                                  </div>
                                ))
                              ) : (
                                <Typography>No teams registered</Typography>
                              )}
                            </TableCell>
                            <TableCell>
                              {event.teams.length > 0 ? (
                                event.teams.map((team, teamIndex) => (
                                  <div key={teamIndex}>
                                    {team.members.join(", ")}
                                  </div>
                                ))
                              ) : (
                                <Typography>No teams registered</Typography>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3}>No events found.</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default EventsRegistry;