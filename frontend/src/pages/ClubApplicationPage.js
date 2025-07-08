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
import LoadingButton from "../components/LoadingButton";
import LoadingForm from "../components/LoadingForm";
import FileUpload from '../utils/FileUpload';
import { uploadFileToCloudinary } from '../utils/cloudinaryUpload';

const styles = (
  <style>
    {`
      .headerStyles {
        width: 80% !important;
        left: 50%;
        transform: translateX(-50%);
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
    program: "",
    year: "",
    specialization: "",
    recommender1: "",
    recommender2: "",
    linkedin: "",
    facebook: "",
    instagram: "",
    other_media: "",
    github: "",
    youtube: "",
    comment: "",
  });

  const [cvFile, setCvFile] = useState(null);
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
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setCvFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    let cvUrl = "";
    if (cvFile) {
      cvUrl = await uploadFileToCloudinary(cvFile); // Upload to Cloudinary
    }

    const response = await submitApplication({
      ...formValues,
      cv: cvUrl, // send the Cloudinary link instead of the file
    });

    if (response.success) {
      alert("Application successfully submitted!");
      setFormValues({
        name: "",
        email: "",
        phone: "",
        hallTicket: "",
        clubName: "",
        reason: "",
        comments: "",
        program: "",
        year: "",
        specialization: "",
        recommender1: "",
        recommender2: "",
        linkedin: "",
        facebook: "",
        instagram: "",
        other_media: "",
        github: "",
        youtube: "",
        comment: "",
      });
      setCvFile(null);
    } else {
      alert("Failed to submit the application.");
    }
  } catch (err) {
    console.error("Error submitting application:", err);
    alert("An error occurred. Please try again.");
  }
};

  return (
    <div style={{ background: "whitesmoke", padding: "20px 5px" }}>
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
        <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, marginBottom: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Club Application
          </Typography>
        </Paper>
        <LoadingForm onSubmit={handleSubmit}>
          {[
            ["Name", "name"],
            ["Email", "email"],
            ["Phone Number", "phone"],
            ["Hall Ticket Number", "hallTicket"],
            ["Program", "program"],
            ["Year", "year"],
            ["Specialization", "specialization"],
            ["Recommender 1", "recommender1"],
            ["Recommender 2", "recommender2"],
            ["LinkedIn", "linkedin"],
            ["Facebook", "facebook"],
            ["Instagram", "instagram"],
            ["Other Media", "other_media"],
            ["GitHub", "github"],
            ["YouTube", "youtube"],
            ["Comment", "comment"],
          ].map(([label, name]) => (
            <TextField
              key={name}
              label={label}
              name={name}
              value={formValues[name]}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          ))}

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

          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Upload CV (PDF only)
          </Typography>
          <FileUpload onFileUpload={(file) => setCvFile(file)} />


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
