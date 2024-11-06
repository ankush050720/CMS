import React from 'react';
import { Box, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  return (
    <Box sx={{ zIndex: '100' }}>
      <Box
        sx={{
          backgroundColor: "#0B1F38", // Background color
          color: "#978989", // Text color
          paddingTop: { xs: 3, md: 6 }, // Responsive padding
          paddingBottom: { xs: 2, md: 4 },
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
            fontSize: { xs: "1.2rem", md: "1.5rem" }, // Responsive font size
            textTransform: "uppercase",
            mb: 1,
            color: "#ffffff" // Light text color
          }}
        >
          &copy; 2024 SR University
        </Typography>
        
        <Box
          sx={{
            borderBottom: "1px solid rgba(255, 255, 255, 0.5)", // Light border for separation
            width: { xs: "100px", md: "200px" }, // Responsive width
            margin: "0 auto",
            mb: 2,
          }}
        />

        <Typography
          variant="body2"
          sx={{
            fontSize: { xs: "0.9rem", md: "1rem" }, // Responsive font size
            opacity: 0.8,
            color: '#A0A7B1',
          }}
        >
          School of CS&AI
        </Typography>

        {/* Links Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" }, // Stack vertically on small screens
            alignItems: "center",
            justifyContent: "center",
            mt: 2,
            gap: { xs: 1, md: 3 }, // Adjust gap for different screen sizes
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
                color: "#ffffff", // Hover color
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