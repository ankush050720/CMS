import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllClubs } from "../../services/clubService";
import {
  Container,
  Typography,
  List,
  ListItem,
  Divider,
  Paper,
  Box,
  Grid,
  Avatar,
} from "@mui/material";
import "./ClubPage.css"; // Import the CSS file

const ClubPage = () => {
  const { clubName } = useParams();
  const [club, setClub] = useState(null);

  useEffect(() => {
    const fetchClub = async () => {
      const clubs = await getAllClubs();
      const foundClub = clubs.find(
        (club) => club.name.replace(/\s+/g, "-").toLowerCase() === clubName
      );
      setClub(foundClub);
    };
    fetchClub();
  }, [clubName]);

  if (!club) return <Typography variant="h6">Loading...</Typography>;

  return (
    <div
      className="club-page-container"
      style={{ marginTop: "2rem" }}
    >
      {/* Club Logo and Name */}
      <Paper
        elevation={4}
        style={{ padding: "2rem", marginBottom: "2rem", textAlign: "center" }}
      >
        <Avatar
          src={club.clubLogo}
          alt={`${club.name} logo`}
          sx={{ width: 150, height: 150, margin: "auto", marginBottom: "1rem" }}
        />
        <Typography variant="h2" gutterBottom>
          {club.name}
        </Typography>
      </Paper>

      {/* Faculty and Student Information */}
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: "1.5rem" }}>
            <Typography variant="h6" gutterBottom>
              Faculty Coordinator: {club.facultyCoordinator}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Student Chair: {club.studentChair}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Student Co-Chair: {club.studentCoChair}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Official Members: {club.officialMembers}
            </Typography>
          </Paper>
        </Grid>

        {/* Social Media and Website Links */}
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: "1.5rem" }}>
            <Typography variant="h6" gutterBottom>
              Club Website:{" "}
              <a
                href={club.clubWebsite}
                target="_blank"
                rel="noopener noreferrer"
              >
                {club.clubWebsite}
              </a>
            </Typography>
            <Typography variant="h6" gutterBottom>
              Email:{" "}
              <a
                href={club.clubEmail}
                target="_blank"
                rel="noopener noreferrer"
              >
                {club.clubEmail}
              </a>
            </Typography>
            <Typography variant="h6" gutterBottom>
              Social Media:
            </Typography>
            <List>
              {club.instagramHandle && (
                <ListItem>
                • Instagram:{" "}
                  <a
                    href={club.instagramHandle}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {club.instagramHandle}
                  </a>
                </ListItem>
              )}
              {club.linkedinHandle && (
                <ListItem>
                • LinkedIn:{" "}
                  <a
                    href={club.linkedinHandle}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {club.linkedinHandle}
                  </a>
                </ListItem>
              )}
              {club.facebookHandle && (
                <ListItem>
                • Facebook:{" "}
                  <a
                    href={club.facebookHandle}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {club.facebookHandle}
                  </a>
                </ListItem>
              )}
              {club.twitterHandle && (
                <ListItem>
                • Twitter:{" "}
                  <a
                    href={club.twitterHandle}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {club.twitterHandle}
                  </a>
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Official Pics Drive Link */}
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Official Pics Drive Link
        </Typography>
        {club.officialPics && club.officialPics.length > 0 ? (
          <Typography variant="body1" paragraph>
            <a
              href={club.officialPics[0]}
              target="_blank"
              rel="noopener noreferrer"
            >
              {club.officialPics[0]}
            </a>
          </Typography>
        ) : (
          <Typography variant="body1" paragraph>
            No official pics available.
          </Typography>
        )}
      </Box>

      {/* Chapter Brief, Mission, and Vision */}
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Chapter Brief
        </Typography>
        <Typography variant="body1" paragraph>
          {club.chapterBrief}
        </Typography>

        <Typography variant="h4" gutterBottom>
          Mission
        </Typography>
        <Typography variant="body1" paragraph>
          {club.mission}
        </Typography>

        <Typography variant="h4" gutterBottom>
          Vision
        </Typography>
        <Typography variant="body1" paragraph>
          {club.vision}
        </Typography>
      </Box>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Team Members
        </Typography>
        <Grid container spacing={5}>
          {club.addMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "100%",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                  height: "250px", // Fixed height for uniformity
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.02)", // Scale on hover
                  },
                  "&:hover .overlay": {
                    transform: "translateY(0)", // Only the hovered card's overlay slides up
                  },
                }}
              >
                {/* Member Image */}
                <Avatar
                  src={member.photo}
                  alt={member.name}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                {/* Overlay Info */}
                <Box
                  className="overlay"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "85%", // Height for overlay
                    backgroundColor: "rgba(0, 0, 0, 1)", // Dark translucent background
                    color: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    transform: "translateY(100%)", // Initially hidden
                    transition: "transform 0.3s ease-in-out",
                    paddingLeft: 5,
                    paddingRight: 5,
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    {member.name}
                  </Typography>
                  <Typography variant="h7">{member.enrollmentId}</Typography>
                  <Typography variant="h7">{member.email}</Typography>
                  <Typography variant="h7">{member.position}</Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Events */}
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Conducted Events
        </Typography>
        <Grid container gap={5}>
          {club.events.map((event, index) => (
            <Grid item xs={12} sm={6} md={4} key={event._id}>
              <Paper
                elevation={3}
                style={{
                  padding: "2rem",
                  textAlign: "center",
                  height: "200px", // Consistent height for event cards
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {event.eventName}
                </Typography>
                <Typography variant="body2">
                  Date: {new Date(event.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2">
                  {event.internalExternal} | {event.nationalInternational}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Tentative Event Date */}
      {club.tentativeDate && (
        <Box mt={4}>
          <Typography variant="body1" paragraph>
          <b>*</b>  Proposed event tentatively scheduled on:{" "}
            {new Date(club.tentativeDate).toLocaleDateString()}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default ClubPage;
