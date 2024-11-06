import React from "react";
import { Grid, Typography, Paper, Box, useMediaQuery } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import Header from "../../components/HomeHeader/HomeHeader";
import Footer from "../../components/Footer";

const Contact = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <div>
      <Box sx={{ py: 5, px: { xs: 2, md: 4 }, backgroundColor: "#f7f7f7" }}>
        <Header />
        
        <Paper elevation={3} sx={{ p: 3, mt: 8.5, mb: 3.3, backgroundColor: "#f3f4f6" }}>
          <Grid container spacing={3}>
            
            {/* SR University Address Section */}
            <Grid item xs={12} sm={6}>
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ fontSize: isSmallScreen ? '1.2rem' : '1.5rem', fontWeight: "bold" }}
              >
                SR UNIVERSITY
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>Ananthasagar, Hasanparthy</Typography>
              <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>
                Hanumakonda 506371, Telangana, India
              </Typography>
              
              <Typography 
                variant="h6" 
                sx={{ mt: 2, fontSize: isSmallScreen ? '1rem' : '1.2rem', fontWeight: "600" }}
              >
                SRU Corporate Office
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>
                604, 6th Floor, Sonthalia Emarald, Raj Bhavan Road, Somajiguda, Hyderabad, Telangana - 500082
              </Typography>
            </Grid>

            {/* Contact Details Section */}
            <Grid item xs={12} sm={6}>
              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ fontSize: isSmallScreen ? '1rem' : '1.2rem', fontWeight: "600" }}
              >
                Contact Details
              </Typography>
              
              <Typography variant="body2" sx={{ mt: 1, fontSize: "0.9rem" }}>
                <PhoneIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                <strong>Phone:</strong> +91 80044 72585 / +91 83820 14073
              </Typography>
              
              <Typography variant="body2" sx={{ mt: 1, fontSize: "0.9rem" }}>
                <WhatsAppIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                <strong>WhatsApp:</strong> +91 80044 72585 / +91 83820 14073
              </Typography>
              
              <Typography variant="body2" sx={{ mt: 1, fontSize: "0.9rem" }}>
                <EmailIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                <strong>Email:</strong> dean.socs@sru.edu.in
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
      
      <Footer />
    </div>
  );
};

export default Contact;
