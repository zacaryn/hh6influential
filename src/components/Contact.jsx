// src/components/Contact.jsx
import React from "react";
import "./../styles/Contact.css";
import Seo from '../components/Seo';
import { ROUTE_TITLE_RULES, ROUTE_DESCRIPTIONS, PRIMARY_DOMAIN } from '../components/seoConfig';
import { BreadcrumbSchema } from '../components/Schema';

function Contact() {
  return (
    <>
      <Seo
        title={ROUTE_TITLE_RULES.contact}
        description={ROUTE_DESCRIPTIONS.contact}
        path="/contact"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${PRIMARY_DOMAIN}/` },
          { name: 'Contact', url: `${PRIMARY_DOMAIN}/contact` }
        ]}
      />
      <div className="page-container">
        <section className="contact-hero">
          <h1>Get In Touch</h1>
          <p className="lead">
            Ready to elevate your digital presence? Let's discuss how we can help bring your vision to life.
          </p>
          
          <div className="hero-social">
            <p className="social-label">Connect with us:</p>
            <div className="hero-social-links">
              <a 
                href="https://www.linkedin.com/company/hh6-influential/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hero-social-link linkedin"
                title="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="https://x.com/HH6Influential" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hero-social-link x"
                title="X (Twitter)"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2H21L13.5 10.59 22 22h-6.563l-5.09-6.656L4.5 22H2l8.062-9.28L2 2h6.688l4.594 6.094L18.244 2zm-1.125 18h1.5L7.03 4h-1.5l11.589 16z"/>
                </svg>
              </a>
              
              <a 
                href="https://www.facebook.com/HH6Influential" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hero-social-link facebook"
                title="Facebook"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              
              <a 
                href="https://www.youtube.com/@HH6Influential" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hero-social-link youtube"
                title="YouTube"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </section>

        <section className="contact-info">
          <div className="contact-grid">
            {/* Email Contact */}
            <div className="contact-card">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Email Us</h3>
              <p>For business inquiries and project discussions</p>
              <a href="mailto:contact@hh6influential.com?subject=Business Inquiry" className="contact-link">
                contact@hh6influential.com
              </a>
            </div>

            {/* Phone Contact */}
            <div className="contact-card">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Call Us</h3>
              <p>Speak directly with our team</p>
              <a href="tel:+16788423469" className="contact-link">
                (678) 842-3469
              </a>
            </div>

            {/* Review Link */}
            <div className="contact-card">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Leave a Review</h3>
              <p>Share your experience with our services</p>
              <a 
                href="https://share.google/PdkwzZFFGWgAtNToD" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-link"
              >
                Write a Google Review
              </a>
            </div>
          </div>
        </section>



        <section className="contact-cta">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Let's discuss how we can help transform your digital presence and grow your business.</p>
            <a href="mailto:contact@hh6influential.com?subject=Project Inquiry" className="cta-button">
              Start Your Project Today
            </a>
          </div>
        </section>
      </div>
    </>
  );
}

export default Contact;
