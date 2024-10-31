import React from 'react';
import { Box, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  return (
    <Box sx={{ zIndex: '100' }}>
      <Box
        sx={{
          backgroundColor: "#0B1F38", // Set background color
          color: "#978989", // Text color for contrast
          paddingTop: 6,
          paddingBottom: 4,
          textAlign: "center",
          boxShadow: "none",
          borderTop: "none",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            letterSpacing: "1.5px",
            fontSize: "1.5rem",
            textTransform: "uppercase",
            mb: 1,
            color: "#ffffff" // Light text color for visibility
          }}
        >
          &copy; 2024 SR University
        </Typography>
        
        <Box
          sx={{
            borderBottom: "1px solid rgba(255, 255, 255, 0.5)", // Light border for subtle separation
            width: "200px",
            margin: "0 auto",
            mb: 2,
          }}
        />

        <Typography
          variant="body2"
          sx={{
            fontSize: "1rem",
            opacity: 0.8,
            color:'#A0A7B1'
          }}
        >
          School of CS&AI
        </Typography>

        {/* Links Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
            gap: 3, // Space between links
          }}
        >
          <Link
            component={RouterLink}
            to="/terms-and-conditions"
            underline="hover"
            sx={{
              color: "#C4C9D2",
              fontSize: "0.9rem",
              "&:hover": {
                color: "#ffffff", // Change color on hover for effect
              }
            }}
          >
            Terms and Conditions
          </Link>

          <Link
            component={RouterLink}
            to="/privacy-policy"
            underline="hover"
            sx={{
              color: "#C4C9D2",
              fontSize: "0.9rem",
              "&:hover": {
                color: "#ffffff",
              }
            }}
          >
            Privacy Policy
          </Link>

          <Link
            component={RouterLink}
            to="/refunds-and-cancellations"
            underline="hover"
            sx={{
              color: "#C4C9D2",
              fontSize: "0.9rem",
              "&:hover": {
                color: "#ffffff",
              }
            }}
          >
            Refunds and Cancellations
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;