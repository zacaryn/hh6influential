import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./../styles/Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        {/* Logo Section */}
        <div className="logo-container">
          <Link to="/">
            <img src="/assets/images/hh6logo.png" alt="HH6 Logo" className="logo" />
          </Link>
        </div>

        {/* Divider */}
        <div className="divider"></div>

        {/* Navigation Links */}
        <nav className="navbar">
          <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </div>
          <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/portfolio">Portfolio</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
