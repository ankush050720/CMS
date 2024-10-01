// src/pages/PaymentCancel.js
import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentCancel = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate("/events"); // Redirect user back to the events page (change as needed)
  };

  return (
    <div>
      <h1>Payment Canceled</h1>
      <p>Your payment was not completed. If you want to register for the event, please try again.</p>
      <button onClick={handleReturn}>Return to Events</button>
    </div>
  );
};

export default PaymentCancel;
