// src/components/Contact.jsx
import React from "react";
import "./../styles/Contact.css"; // Page-specific styles

function Contact() {
  return (
    <div className="page-container">
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p className="lead">
          Ready to start your next project? We're here to help turn your vision into reality.
        </p>
      </section>

      <section className="contact-content">
        <div className="contact-methods">
          <div className="contact-card">
            <div className="contact-icon">✉️</div>
            <h3>Email Us</h3>
            <p>For business inquiries:</p>
            <a href="mailto:contact@hh6influential.com?subject=Business Inquiry" className="contact-link">
              contact@hh6influential.com
            </a>
          </div>

          <div className="contact-card">
            <div className="contact-icon">💬</div>
            <h3>Social Media</h3>
            <p>Follow us for updates:</p>
            <div className="social-links">
              <a href="#" className="social-link">LinkedIn</a>
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">Facebook</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
