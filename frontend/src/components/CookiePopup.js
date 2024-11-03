import { Height } from '@mui/icons-material';
import React from 'react';

const CookiePopup = ({ onAccept }) => {
  return (
    <div style={styles.container}>
      <div style={styles.messageBox}>
        <h2 style={styles.heading}>Cookie Notice</h2>
        <p>
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
    bottom: '0',
    width: '100%',
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '20px',
    zIndex: '1000',
  },
  messageBox: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '10px',
    color: '#fff',
  },
  button: {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default CookiePopup;