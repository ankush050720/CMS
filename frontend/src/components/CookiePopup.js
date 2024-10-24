import React from 'react';

const CookiePopup = ({ onAccept }) => {
  return (
    <div style={styles.container}>
      <div style={styles.messageBox}>
        <h2>Cookies Required</h2>
        <p>This website requires cookies to function properly. Please enable cookies in your browser settings.</p>
        <button onClick={onAccept} style={styles.button}>I have enabled cookies</button>
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