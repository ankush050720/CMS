import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './HomeHeader.css'; // Import the CSS for the header

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="/college-logo.png" alt="College Logo" className="logo" />
      </div>
      <nav className="nav">
        <Link to="/" className="nav-link">Home</Link> {/* Use Link instead of a */}
        <Link to="/about" className="nav-link">About</Link> {/* Use Link instead of a */}
        <Link to="/contact" className="nav-link">Contact</Link> {/* Use Link instead of a */}
      </nav>
    </header>
  );
};

export default Header;