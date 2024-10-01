// src/pages/PaymentSuccess.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { getUserInfo } from '../services/userService'; // Import getUserInfo
import EventRegService from '../services/eventRegService'; // Import EventRegService

const PaymentSuccess = ({ event }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const registerEvent = async () => {
      const sessionId = new URLSearchParams(window.location.search).get('session_id'); // Get Stripe session ID from URL

      try {
        const userInfo = await getUserInfo(); // Get user info again

        const registrationResult = await EventRegService.registerTeamForEvent(event._id, userInfo.email);

        if (registrationResult.alreadyRegistered) {
          alert("Team is already registered for this event.");
        } else {
          alert("Registration successful!");
        }

        navigate("/dashboard"); // Navigate to a different page after success (change as needed)
      } catch (error) {
        console.error("Error completing registration:", error);
        alert("An error occurred during registration.");
      }
    };

    registerEvent();
  }, [navigate, event]);

  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>We are registering your team for the event...</p>
    </div>
  );
};

export default PaymentSuccess;
