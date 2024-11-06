import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Button,
  Divider,
  Slide,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getUserInfo } from "../../services/userService";
import PaymentService from "../../services/paymentService";
import EventRegService from "../../services/eventRegService";
import { getScore } from "../../services/scoreService";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

// Slide transition component
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EventModal = ({ event, isOpen, onRequestClose }) => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [scores, setScores] = useState(null);
  
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsActive(true), 10);
    } else {
      setIsActive(false);
    }
  }, [isOpen]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const fetchScores = async () => {
    try {
      const scoreData = await getScore(event._id);
      setScores(scoreData);
    } catch (error) {
      console.error("Error fetching scores:", error);
    }
  };

  useEffect(() => {
    if (feedbackModalOpen) {
      fetchScores();
    }
  }, [feedbackModalOpen]);

  const renderFeedbackContent = () => {
    if (!scores) {
      return <Typography>Loading scores...</Typography>;
    }

    const data = [
      {
        name: "Guest",
        value: scores.guest
          ? scores.guest.reduce((a, b) => a + b, 0) / scores.guest.length
          : 0,
      },
      { name: "Faculty Mentor", value: scores.faculty || 0 },
      { name: "Dean", value: scores.admin || 0 },
    ];

    const filteredData = data.filter((entry) => entry.value > 0);

    return (
      <>
        <Typography variant="h6">Average Scores</Typography>
        <PieChart width={500} height={500}>
          <Pie
            data={filteredData}
            cx={290}
            cy={250}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            label={({ name, value }) => `${name}: ${value.toFixed(1)}`}
            paddingAngle={5}
          >
            {filteredData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={["#0088FE", "#00C49F", "#FFBB28"][index]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value.toFixed(1)}`, `${name}`]}
            wrapperStyle={{ fontSize: "14px", whiteSpace: "nowrap" }}
          />
        </PieChart>
      </>
    );
  };

  const handlePayment = async () => {
    try {
      const userInfo = await getUserInfo();
      if (!userInfo) {
        navigate("/login");
        return;
      }

      const orderId = await PaymentService.processPayment(
        event.fee,
        userInfo.email,
        event._id
      );
      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded) {
        alert("Failed to load Razorpay SDK. Are you online?");
        return;
      }

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: event.fee * 100,
        currency: "INR",
        name: "Event Registration",
        description: "Event Registration Fee",
        order_id: orderId,
        handler: async (response) => {
          alert("Payment Successful!");
          const transactionId = response.razorpay_payment_id;
          const registrationResult = await EventRegService.registerTeamForEvent(
            event._id,
            userInfo.email,
            transactionId
          );

          if (registrationResult.alreadyRegistered) {
            alert("Team is already registered for this event.");
          } else {
            alert("Registration successful!");
          }
          onRequestClose();
        },
        prefill: {
          name: userInfo.name,
          email: userInfo.email,
        },
        notes: {
          address:
            "Paying to SR University, Ananthasagar, Hasanparthy Hanumakonda 506371, Telangana, India",
        },
        theme: {
          color: "#F37254",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred while processing the payment.");
    }
  };

  const handleFeedback = async () => {
    try {
      const userInfo = await getUserInfo();
      if (!userInfo) {
        window.location.replace("/login");
        return;
      }
      navigate(`/feedback/${event._id}`);
    } catch (error) {
      if (error.message === "Unauthorized") {
        window.location.replace("/login");
      } else {
        console.error("An Error occurred ", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  const handleShowFeedback = () => {
    setFeedbackModalOpen(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const renderButton = () => {
    switch (event.status) {
      case "upcoming":
        return (
          <Button onClick={handlePayment} variant="contained" color="primary">
            Register Now
          </Button>
        );
      case "ongoing":
        return (
          <Button disabled variant="contained" color="primary">
            Registration Closed
          </Button>
        );
      case "completed":
        return (
          <Button onClick={handleFeedback} variant="contained" color="primary">
            Give Feedback
          </Button>
        );
      case "feedbackClosed":
        return (
          <Button
            onClick={handleShowFeedback}
            variant="contained"
            color="secondary"
          >
            Show Feedback
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={onRequestClose}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Transition}
        TransitionProps={{ onEntered: () => setIsActive(true) }}
      >
        <DialogTitle sx={{ position: "relative", fontWeight: 700 }}>
          {event.name}
          <IconButton
            edge="end"
            color="inherit"
            onClick={onRequestClose}
            aria-label="close"
            sx={{
              position: "absolute",
              right: "20px",
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div
            style={{
              display: isSmallScreen ? "block" : "flex",
              alignItems: "center",
              gap: "24px",
              marginTop: "20px",
            }}
          >
            <img
              src={event.logo || "https://via.placeholder.com/180"}
              alt="Event Poster"
              style={{
                width: "180px",
                height: "180px",
                borderRadius: "8px",
                objectFit: "cover",
                marginBottom: isSmallScreen ? "16px" : "0",
              }}
            />
            <div>
              <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                {event.description}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                📅 {formatDate(event.date)}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                ⏰ {event.time}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                📍 {event.venue}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                🎫 {event.fee > 0 ? `₹${event.fee}` : "Free"}
              </Typography>
            </div>
          </div>
        </DialogContent>
        <DialogActions sx={{ padding: "16px" }}>{renderButton()}</DialogActions>
      </Dialog>
      <Dialog
        open={feedbackModalOpen}
        onClose={() => setFeedbackModalOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Feedback Results</DialogTitle>
        <DialogContent>{renderFeedbackContent()}</DialogContent>
        <DialogActions>
          <Button onClick={() => setFeedbackModalOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EventModal;