import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Paper,
} from "@mui/material";
import { getAllClubs } from "../services/clubService";
import Header from "../components/Header/Header";
import { getUserInfo } from "../services/userService";
import { submitApplication } from "../services/applicationService";
import LoadingButton from '../components/LoadingButton';
import LoadingForm from '../components/LoadingForm';

const styles = (
  <style>
    {`
        .headerStyles {
            width: 80% !important;
  left: 50%; /* Centering horizontally */
  transform: translateX(-50%); /* Move left by half its width */
  border-radius: 8px;
  position: fixed !important;
  top: 20px !important;
        }
        @media (max-width: 768px) {
          .headerStyles {
            width: 95% !important;
          }
        }
      `}
  </style>
);

const ClubApplication = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    hallTicket: "",
    clubName: "",
    reason: "",
    comments: "",
  });
  const [clubs, setClubs] = useState([]);
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

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const clubData = await getAllClubs();
        setClubs(clubData);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };
    fetchClubs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the clubRegistration service with formValues
      const response = await submitApplication(formValues);
      // If successful, show an alert
      if (response.success) {
        alert("Application successfully submitted!");
        setFormValues({ // Optionally reset the form
          name: "",
          email: "",
          phone: "",
          hallTicket: "",
          clubName: "",
          reason: "",
          comments: "",
        });
      } else {
        alert("Failed to submit the application.");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div
      style={{
        background: "whiteSmoke",
        padding : "20px 5px"
      }}
    >
        {styles}
      <Header email={email} className="headerStyles" />
      <Box
        sx={{
          width: window.innerWidth < 768 ? "85%" : "76%",
          margin: "100px auto",
          padding: "20px",
          backgroundColor: "white",
          borderRadius: 2,
        }}
      >
        <Paper
          elevation={3}
          sx={{ padding: 3, borderRadius: 2, marginBottom: 4 }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Club Application
          </Typography>
        </Paper>
        <LoadingForm onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Phone Number"
            name="phone"
            value={formValues.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Hall Ticket Number"
            name="hallTicket"
            value={formValues.hallTicket}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            select
            label="Club Name"
            name="clubName"
            value={formValues.clubName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          >
            {clubs.map((club) => (
              <MenuItem key={club._id} value={club._id}>
                {club.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Why you want to join our club"
            name="reason"
            value={formValues.reason}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            required
          />
          <TextField
            label="Any other comments"
            name="comments"
            value={formValues.comments}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={2}
          />
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 3 }}
          >
            Submit
          </LoadingButton>
        </LoadingForm>
      </Box>
    </div>
  );
};

export default ClubApplication;
