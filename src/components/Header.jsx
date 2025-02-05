// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./../styles/Header.css"; // Page-specific styles

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Ensuring script.js functionalities (like mobile menu) work
    const menuIcon = document.querySelector(".menu-icon");
    const navLinks = document.querySelector(".nav-links");

    if (menuIcon && navLinks) {
      menuIcon.addEventListener("click", () => {
        navLinks.classList.toggle("show");
      });
    }
  }, []);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">HH6 Influential</Link>
      </div>
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>
      <nav className={menuOpen ? "nav-links show" : "nav-links"}>
        <Link to="/">Home</Link>
        <Link to="/portfolio">Portfolio</Link>
        <Link to="/services">Services</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  );
}

export default Header;
