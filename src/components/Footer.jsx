// src/components/Footer.jsx
import React from "react";
import "./../styles/Footer.css"; // Page-specific styles

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} HH6 Influential. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
