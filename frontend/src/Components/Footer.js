import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ zIndex: '100' }}>
      <Box
        sx={{
          backgroundColor: "transparent", // Completely transparent background
          color: "#978989", // Darker text for better contrast
          paddingTop: 10, // Padding for spacing and structure
          paddingBottom: 3, // Padding for spacing and structure
          textAlign: "center",
          boxShadow: "none", // Remove shadow since the background is transparent
          borderTop: "none", // No border, fully transparent
        }}
      >
        <Typography
          variant="h5" // Slightly larger for emphasis
          sx={{
            fontWeight: "bold",
            letterSpacing: "1.5px", // Balanced spacing for modern look
            fontSize: "1.5rem", // Slightly larger text for better readability
            textTransform: "uppercase",
            mb: 1, // Small margin for separation from the next text
          }}
        >
          &copy; 2024 SR University
        </Typography>
        <Box
          sx={{
            borderBottom: "1px solid rgba(153, 153, 153, 0.7)", // Adjusted line color
            width: "200px",
            margin: "0 auto", // Center align the line
            mb: 2, // Add some spacing after the line
          }}
        />
        <Typography
          variant="body2"
          sx={{
            fontSize: "1rem", // Slightly larger secondary text
            opacity: 0.8, // Subtle opacity for a clean look
            color:'#847878'
          }}
        >
          All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
