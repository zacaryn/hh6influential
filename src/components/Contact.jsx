// src/components/Contact.jsx
import React, { useEffect } from "react";
import "./../styles/Contact.css"; // Page-specific styles

function Contact() {
  useEffect(() => {
    // Ensuring any script functions run properly
  }, []);

  return (
    <main className="contact">
      <h1>Contact Us</h1>
      <p>
        If you wish to contact Household Six Influential regarding a business inquiry, please email us at{" "}
        <a href="mailto:contact@hh6influential.com?subject=Business Inquiry">
          contact@hh6influential.com
        </a>
      </p>
    </main>
  );
}

export default Contact;
