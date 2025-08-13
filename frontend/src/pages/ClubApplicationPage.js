import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
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
import FileUpload from "../utils/FileUpload";
import { uploadFileToCloudinary } from "../utils/cloudinaryFileUpload";

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
    clubName: [],
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
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");

  // Fetch user info and set email and phone
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userInfo = await getUserInfo();
        setUserEmail(userInfo.email || "");
        setUserPhone(userInfo.phone || "");

        setFormValues((prev) => ({
          ...prev,
          email: userInfo.email || "",
          phone: userInfo.phone || "",
        }));
      } catch (err) {
        console.error("Error fetching user info", err);
      }
    };
    fetchUserDetails();
  }, []);

  // Fetch clubs
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let cvUrl = "";
      if (cvFile) {
        cvUrl = await uploadFileToCloudinary(cvFile);
      }

      const response = await submitApplication({
        ...formValues,
        cv: cvUrl,
      });

      if (response.success) {
        alert("Application successfully submitted!");

        setFormValues({
          name: "",
          email: userEmail,
          phone: userPhone,
          hallTicket: "",
          clubName: [],
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
    
        if (err.response) {
          if (err.response.data && err.response.data.message) {
            alert("Error: " + err.response.data.message);
          } else {
            alert("Error: " + err.response.statusText || "Request failed");
          }
        } else if (err.message) {
          alert("Error: " + err.message);
        } else {
          alert("An error occurred. Please try again.");
        }
      }
  };

  return (
    <div style={{ background: "whitesmoke", padding: "20px 5px" }}>
      {styles}
      <Header email={formValues.email} className="headerStyles" />
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
            ["Name", "name", true, false],
            ["Email", "email", true, false],
            ["Phone Number", "phone", true, false],
            ["Hall Ticket Number", "hallTicket", true, false],
            ["Program", "program", false, false],
            ["Year", "year", false, false],
            ["Specialization", "specialization", false, false],
            ["Recommender 1", "recommender1", false, false],
            ["Recommender 2", "recommender2", false, false],
            ["LinkedIn", "linkedin", false, true],
            ["Facebook", "facebook", false, true],
            ["Instagram", "instagram", false, true],
            ["Other Media", "other_media", false, true],
            ["GitHub", "github", false, true],
            ["YouTube", "youtube", false, true],
            ["Comment", "comment", false, false],
          ].map(([label, name, isRequired, isUrl]) => (
            <TextField
              key={name}
              label={label}
              name={name}
              value={formValues[name]}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required={isRequired}
              type={isUrl ? "url" : "text"}
              inputProps={
                isUrl
                  ? {
                      pattern: "https?://.+",
                      title: "Please enter a valid URL starting with http:// or https://",
                    }
                  : undefined
              }
              InputProps={
                name === "email" || name === "phone"
                  ? { readOnly: true }
                  : undefined
              }
            />
          ))}

          <TextField
            select
            SelectProps={{ multiple: true }}
            label="Select up to 2 Clubs"
            name="clubName"
            value={formValues.clubName}
            onChange={(e) => {
              const selected = e.target.value;
              if (selected.length <= 2) {
                setFormValues((prev) => ({ ...prev, clubName: selected }));
              }
            }}
            fullWidth
            margin="normal"
            required
          >
            {clubs.map((club) => (
              <MenuItem key={club._id} value={club.name}>
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
