import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { getUserInfo } from "../../services/userService";
import EventPage from "../RenderEventPage/RenderEventPage";
import { Box, Typography, Paper, Card, CardContent, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import "./GuestPage.css";

const GuestPage = () => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userInfo = await getUserInfo();
        setEmail(userInfo.email);
      } catch (err) {
        console.error("Error fetching user info", err);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "whitesmoke",
        paddingTop: "40px",
        paddingBottom: "50px",
        paddingLeft: window.innerWidth < 768 ? "0px" : "initial",
        paddingRight: window.innerWidth < 768 ? "0px" : "initial",
      }}
    >
      <Header email={email} className="guest-header" />

      {/* Announcement Section */}
      <div className="announcement">
        CSAI Club Registration is active now. Click{" "}
        <Link component={RouterLink} to="/club-registration" className="highlight-link">
          Here
        </Link>{" "}
        to apply!
      </div>

      <div className="announcement2">
        University Club Registration is active now. Click{" "}
        <Link component={RouterLink} to="/univ-club-registration" className="highlight-link">
          Here
        </Link>{" "}
        to apply!
      </div>

      <div
        style={{
          width: window.innerWidth < 768 ? "95%" : "80%",
          margin: "0 auto",
        }}
      >
        <Box mt={5} mb={4} sx={{ width: "100%" }}>
          <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
            <Typography variant="h4" align="center" gutterBottom mb={3}>
              Welcome, Student!
            </Typography>
          </Paper>
        </Box>

        <Box mt={3} mb={4} sx={{ width: "100%" }}>
          <Card elevation={3}>
            <CardContent>
              <EventPage />
            </CardContent>
          </Card>
        </Box>
      </div>
    </div>
  );
};

export default GuestPage;
