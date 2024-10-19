import React from "react";
import { Grid, Typography, Paper, Box } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import Header from "../../components/HomeHeader/HomeHeader";

// Define styles for the page using MUI's sx prop
const Contact = () => {
  return (
    <Box sx={{py: 5, px:4,  backgroundColor: "#f7f7f7" }}>
      {" "}
      {/* Background color as per image */}
      <Header />
      {/* Contact Info Section */}
      <Paper
        elevation={3}
        sx={{ p: 3, mt: 8.5, mb: 3.3, backgroundColor: "#f3f4f6" }}
      >
        {" "}
        {/* Match the contact section background */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" gutterBottom>
              SR University
            </Typography>
            <Typography variant="body1">
              Ananthasagar, Hasanparthy, Warangal Urban 506371
            </Typography>
            <Typography variant="body1">Telangana, India</Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              <PhoneIcon sx={{ verticalAlign: "middle", mr: 1 }} />
              <strong>Phone: </strong> 0(870) 281-8333/8311
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h5" gutterBottom>
              Admission Helpline No.
            </Typography>
            <Typography variant="body1">
              <PhoneIcon sx={{ verticalAlign: "middle", mr: 1 }} />
              Tel: 0(870) 281-8333/8311
            </Typography>
            <Typography variant="body1">
              <PhoneIcon sx={{ verticalAlign: "middle", mr: 1 }} />
              <strong>Mobile:</strong> +91 8331003030 / 4040
            </Typography>
            <Typography variant="body1">+91 8374039180 / 104</Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <WhatsAppIcon sx={{ verticalAlign: "middle", mr: 1 }} />
              <strong>WhatsApp:</strong> +91 8331004040
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <EmailIcon sx={{ verticalAlign: "middle", mr: 1 }} />
              <strong>Email: </strong> info@sru.edu.in
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      {/* Google Map Section */}
      <Paper elevation={3}>
        <iframe
          title="SR University Location"
          src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_API}&q=SR+University,+Ananthasagar+Telangana&zoom=15&maptype=roadmap`}
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </Paper>
    </Box>
  );
};

export default Contact;
