import React from 'react';
import './HomeHeader.css'; // Import the CSS for the header

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="/college-logo.png" alt="College Logo" className="logo" />
      </div>
      <nav className="nav">
        <a href="/" className="nav-link">Home</a>
        <a href="/about" className="nav-link">About</a>
        <a href="/contact" className="nav-link">Contact</a>
      </nav>
    </header>
  );
};

export default Header;
