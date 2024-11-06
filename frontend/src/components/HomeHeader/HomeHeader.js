import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu'; // Icon for the hamburger menu
import CloseIcon from '@mui/icons-material/Close'; // Icon to close the menu
import './HomeHeader.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img src="/college-logo.png" alt="College Logo" className="logo" />
      </div>
      <nav className={`nav ${menuOpen ? 'open' : ''}`}>
        <Link to="/" className="nav-link" onClick={toggleMenu}>Home</Link>
        <Link to="/about" className="nav-link" onClick={toggleMenu}>About</Link>
        <Link to="/contact" className="nav-link" onClick={toggleMenu}>Contact</Link>
      </nav>
      <div className="menu-icon" onClick={toggleMenu}>
        {menuOpen ? <CloseIcon /> : <MenuIcon />}
      </div>
    </header>
  );
};

export default Header;