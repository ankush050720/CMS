import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, Button, Rating, Paper } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import the ArrowBack icon
import { postScore } from "../services/scoreService"; // Import the postScore function

const questions = [
  "How would you rate the overall experience of the event?",
  "How relevant and fruitful was the event to your personal or professional development?",
  "How well-organized was the event in terms of schedule, structure, and smooth execution?",
  "How engaging and interactive was the event?",
  "How would you rate the quality of the content presented during the event?",
  "Was the duration of the event appropriate for the content covered?",
  "How would you rate the venue and the facilities provided during the event (e.g., seating, lighting, audio/visual equipment)?",
];

const FeedbackForm = () => {
  const { eventId } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [ratings, setRatings] = useState(Array(questions.length).fill(null));
  const [averageScore, setAverageScore] = useState(0);

  const handleRatingChange = (newRating) => {
    const updatedRatings = [...ratings];
    updatedRatings[currentQuestionIndex] = newRating;
    setRatings(updatedRatings);

    // Calculate the new average score
    const validRatings = updatedRatings.filter((rating) => rating !== null);
    const avgScore =
      validRatings.reduce((total, rating) => total + rating, 0) /
      validRatings.length;
    setAverageScore(avgScore);

    // Move to the next question if not at the last one
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Make an API call to submit the score
      await postScore(eventId, averageScore.toFixed(2));

      alert(
        `Thank you for your feedback! Your average score: ${averageScore.toFixed(
          2
        )}`
      );
    } catch (error) {
      console.error("Error submitting feedback:", error);

      // Check if the error response has a status code of 400
      if (error.response && error.response.status === 400) {
        alert("You have already submitted feedback for this event.");
      } else {
        alert("Failed to submit feedback. Please try again.");
      }
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      flexDirection="column"
    >
      <Typography
        style={{
          fontSize: "1.7rem",
          fontWeight: "bold",
          marginBottom: "20px",
          textAlign: "center",
          color: "#1976d2", // Example: Material-UI's blue color
        }}
      >
        Feedback Form
      </Typography>

      <Paper
        elevation={3}
        style={{
          padding: "20px",
          maxWidth: "500px",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Back Button */}
        {currentQuestionIndex > 0 && (
          <Button
            variant="text" // Use 'text' variant for a cleaner look
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              minWidth: "40px", // Set a minimum width to improve click area
              color: "inherit", // Inherit color from the theme
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.08)", // Add hover effect
              },
            }}
            onClick={goToPreviousQuestion}
          >
            <ArrowBackIcon /> {/* Use the ArrowBack icon here */}
          </Button>
        )}

        <Typography
          variant="h5"
          style={{ marginTop: currentQuestionIndex > 0 ? "40px" : "0" }}
        >
          {questions[currentQuestionIndex]}
        </Typography>

        <Box marginTop={2} display="flex" justifyContent="center">
          <Rating
            name={`question-${currentQuestionIndex}`}
            value={ratings[currentQuestionIndex]}
            onChange={(event, newValue) => handleRatingChange(newValue)}
            size="large"
            precision={1}
            max={5}
          />
        </Box>

        <Box marginTop={2}>
          <Typography variant="body1">
            Average Score So Far: {averageScore.toFixed(2)}
          </Typography>
        </Box>
      </Paper>

      {/* Show the Submit button only on the last question */}
      {currentQuestionIndex === questions.length - 1 && (
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
          onClick={handleSubmit}
          disabled={ratings[currentQuestionIndex] === null} // Disable if not rated
        >
          Submit
        </Button>
      )}
    </Box>
  );
};

export default FeedbackForm;
