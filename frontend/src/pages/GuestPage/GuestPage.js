import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { getUserInfo } from "../../services/userService";
import EventPage from "../RenderEventPage/RenderEventPage";
import { Box, Typography, Paper, Card, CardContent } from "@mui/material";
import "./GuestPage.css"

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
    <div style={{ backgroundColor: "whitesmoke", paddingTop:"40px", paddingBottom:"50px" }}>
    <div style={{ width: "80%", margin: "0 auto" }}>
      <Header email = {email} className="guest-header" />
      
      <Box mt={14} mb={4} sx={{ width: "100%" }}>
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
          <Typography variant="h4" align="center" gutterBottom mb={3}>
            Welcome, Guest!
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
