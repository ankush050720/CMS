import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import Header from "../../Components/HomeHeader/HomeHeader";

const About = () => {
  return (
    <Box sx={{ py:3, px: 10, backgroundColor: "#f7f7f7" }}>
      <Header />
      <Card elevation={3} style={{ marginTop: '100px' , marginBottom: '20px', padding: '20px' }}>
        
        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom 
          style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}
          my={3}
        >
          About Us
        </Typography>

        <CardContent>

          <div style={{ overflow: 'auto', marginBottom: '20px' }}>
            {/* Left aligned image */}
            <img
              src="/homeImg/sr1.png"
              alt="SR University"
              style={{
                float: 'left',
                width: '40%',
                marginRight: '20px',
                marginBottom: '10px',
                objectFit: 'contain',
              }}
            />

            <Typography variant="h5" gutterBottom style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600' }}>
              Our Legacy
            </Typography>
            <Typography paragraph style={{ fontFamily: 'Poppins, sans-serif', lineHeight: 1.6 }}>
              Sri Rajeshwara Educational Society, the parent body of <strong>SR University</strong>, is a 45-year-old conglomerate of educational institutions with more than <strong>90,000 students</strong> and <strong>10,000 teaching and non-teaching staff members</strong>. SR Educational Academy governs <strong>95 Educational Institutions</strong> across <strong>Telangana</strong> and <strong>Andhra Pradesh</strong>.
            </Typography>
            <Typography paragraph style={{ fontFamily: 'Poppins, sans-serif', lineHeight: 1.6 }}>
              The goal of SR University is to create an <strong>innovative learning educational ecosystem</strong> whose graduates significantly contribute to the growth of <strong>Telangana</strong> and <strong>India</strong>.
            </Typography>
          </div>

          <Typography variant="h5" gutterBottom style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600' }}>
            Vision and Mission
          </Typography>
          <Typography paragraph style={{ fontFamily: 'Poppins, sans-serif', lineHeight: 1.6 }}>
            Our vision is to be a <strong>world-class university</strong> that fosters excellence in education, research, and innovation. We strive to prepare our students for a <strong>globalized world</strong> by equipping them with the necessary skills and knowledge to thrive in their careers.
          </Typography>
          <Typography paragraph style={{ fontFamily: 'Poppins, sans-serif', lineHeight: 1.6 }}>
            Our mission is to create an <strong>inclusive educational environment</strong> that encourages creativity, critical thinking, and lifelong learning. We aim to empower our students to become <strong>leaders</strong> and <strong>change-makers</strong> in their communities.
          </Typography>

          <div style={{ overflow: 'auto', marginBottom: '20px' }}>
            {/* Right aligned image */}
            <img
              src="/homeImg/sr2.png"
              alt="Club Management Portal"
              style={{
                float: 'right',
                width: '40%',
                marginLeft: '20px',
                marginBottom: '10px',
                objectFit: 'contain',
              }}
            />

            <Typography variant="h5" gutterBottom style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600' }}>
              Student Life and Extracurricular Activities
            </Typography>
            <Typography paragraph style={{ fontFamily: 'Poppins, sans-serif', lineHeight: 1.6 }}>
              At SR University, we believe in the <strong>holistic development</strong> of our students. Alongside academics, we offer a variety of extracurricular activities, clubs, and organizations that cater to diverse interests, including <strong>sports</strong>, <strong>arts</strong>, <strong>cultural events</strong>, and <strong>community service</strong>.
            </Typography>

            <Typography variant="h5" gutterBottom style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600' }}>
              Club Management Portal
            </Typography>
            <Typography paragraph style={{ fontFamily: 'Poppins, sans-serif', lineHeight: 1.6 }}>
              The <strong>Club Management Portal</strong> is a dedicated platform designed to enhance <strong>student engagement</strong> and streamline the management of various clubs and organizations at SR University. This portal serves as a hub for students to discover, join, and participate in clubs that align with their interests.
            </Typography>
            <Typography paragraph style={{ fontFamily: 'Poppins, sans-serif', lineHeight: 1.6 }}>
              Key features of the portal include:
            </Typography>
            <ul style={{ textAlign: 'left', fontFamily: 'Poppins, sans-serif', lineHeight: 1.6 }}>
              <li><strong>Club Discovery:</strong> Students can easily browse through a diverse range of clubs, each with detailed descriptions, activities, and upcoming events.</li>
              <li><strong>Event Management:</strong> Club leaders can organize events, manage registrations, and communicate with participants through the portal.</li>
              <li><strong>Member Management:</strong> Clubs can maintain an updated roster of members, track participation, and celebrate achievements.</li>
              <li><strong>Collaboration Tools:</strong> The portal facilitates collaboration between different clubs, encouraging joint events and initiatives that promote teamwork and community spirit.</li>
            </ul>
          </div>

          <Typography paragraph style={{ fontFamily: 'Poppins, sans-serif', lineHeight: 1.6 }}>
            By fostering active participation in clubs and activities, the Club Management Portal aims to create a <strong>vibrant student life</strong> that complements academic pursuits and prepares students for future challenges.
          </Typography>

          <Typography variant="h5" gutterBottom style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600' }}>
            Conclusion
          </Typography>
          <Typography paragraph style={{ fontFamily: 'Poppins, sans-serif', lineHeight: 1.6 }}>
            At SR University, we are dedicated to nurturing <strong>talent</strong> and fostering an environment of <strong>excellence</strong>. We invite you to join us on this exciting journey of <strong>learning</strong>, <strong>growth</strong>, and <strong>discovery</strong>.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default About;