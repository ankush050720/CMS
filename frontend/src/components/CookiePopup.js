import React from 'react';

const CookiePopup = ({ onAccept }) => {
  return (
    <div style={styles.container}>
      <div style={styles.messageBox}>
        <h2 style={styles.heading}>Cookie Notice</h2>
        <p style={styles.message}>
          Our website uses cookies, including third-party cookies, to enhance your browsing experience and provide personalized features.
          By accepting cookies, you help us improve our services and ensure a smoother experience on our platform.
          You can manage your cookie preferences in your browser settings at any time.
        </p>
        <button onClick={onAccept} style={styles.button}>I Understand</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '15px 10px', // Reduced padding for smaller screens
    zIndex: 1000,
    boxSizing: 'border-box',
  },
  messageBox: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '10px',
    boxSizing: 'border-box',
    width: '100%',
  },
  heading: {
    fontSize: '20px',
    marginBottom: '10px',
    color: '#fff',
  },
  message: {
    fontSize: '16px',
    lineHeight: '1.5',
  },
  button: {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    marginTop: '10px',
  },
};

// Inline media queries for handling smaller screens
const containerMediaQuery = `
  @media (max-width: 768px) {
    .container {
      padding: 15px;
    }
    .messageBox {
      width: 90%;
      padding: 10px;
    }
    .heading {
      font-size: 18px;
    }
    .button {
      font-size: 14px;
      padding: 8px 16px;
    }
  }
`;

// Insert media query styles dynamically
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(containerMediaQuery, styleSheet.cssRules.length);

export default CookiePopup;