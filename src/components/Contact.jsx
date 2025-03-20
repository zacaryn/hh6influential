// src/components/Contact.jsx
import React from "react";
import "./../styles/Contact.css"; // Page-specific styles
import PageHead from './common/PageHead';

function Contact() {
  return (
    <>
      <PageHead 
        title="Contact" 
        description="Get in touch with HH6 Influential. Contact us about web development, social media management, and graphic design services."
        keywords="contact us, hire web developer, social media services, get in touch, business inquiry, consultation"
      />
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
              <div className="contact-icon">💼</div>
              <h3>Connect With Us</h3>
              <p>Follow our company page:</p>
              <a 
                href="https://www.linkedin.com/company/hh6-influential" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="linkedin-button"
              >
                HH6 Influential on LinkedIn
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Contact;
