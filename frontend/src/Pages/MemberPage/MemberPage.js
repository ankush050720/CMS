import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { getUserInfo } from "../../services/userService";
import EventPage from "../RenderEventPage/RenderEventPage";
import { Box, Typography, Paper } from "@mui/material";
import ChatButton from "../../components/ChatButton";
import "./MemberPage.css"

const MemberPage = () => {
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
    <div style={{ width: "80%", margin: "0 auto" }}>
      <Header email = {email} className = "member-header" />
      <Box mt={14} mb={4} sx={{ width: "100%" }}>
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
          <Typography variant="h4" align="center" gutterBottom mb={3}>  
            Welcome, Member!
          </Typography>
          <ChatButton />
        </Paper>
      </Box>

      <Box mt={3} mb={4} sx={{ width: "100%" }}>
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
          <EventPage />
        </Paper>
      </Box>

    </div>
  );
};

export default MemberPage;
