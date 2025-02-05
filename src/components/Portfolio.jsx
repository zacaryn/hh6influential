// src/components/Portfolio.jsx
import React, { useEffect } from "react";
import "./../styles/Portfolio.css"; // Page-specific styles

function Portfolio() {
  useEffect(() => {
    // Initialize slideshow functionality from script.js
  }, []);

  return (
    <main className="portfolio">
      <h1>Our Work</h1>

      <section className="portfolio-section">
        <h2>
          <a href="https://georgiaguardfamily.org/" target="_blank" rel="noopener noreferrer">
            Georgia National Guard Family Support Foundation
          </a>
        </h2>
        <p>
          We developed an SQL database for managing the foundation's events and created a custom admin panel for management.
        </p>
      </section>

      <section className="portfolio-section">
        <h2>Graphics & Flyers</h2>
        <p>
          Engaging social media flyers designed to raise awareness for veteran support programs. Optimized for maximum impact.
        </p>

        {/* Slideshow container */}
        <div className="slideshow-container">
          <div className="slide fade">
            <img src="/assets/images/flyer1.png" alt="Flyer 1" />
          </div>
          <div className="slide fade">
            <img src="/assets/images/flyer2.png" alt="Flyer 2" />
          </div>
          <div className="slide fade">
            <img src="/assets/images/flyer3.png" alt="Flyer 3" />
          </div>
          <div className="slide fade">
            <img src="/assets/images/flyer4.png" alt="Flyer 4" />
          </div>
          <div className="slide fade">
            <img src="/assets/images/flyer5.png" alt="Flyer 5" />
          </div>
          <div className="slide fade">
            <img src="/assets/images/ggflogo.png" alt="Flyer 6" />
          </div>

          {/* Navigation buttons */}
          <a className="prev" onClick={() => window.plusSlides(-1)}>
            &#10094;
          </a>
          <a className="next" onClick={() => window.plusSlides(1)}>
            &#10095;
          </a>
        </div>
      </section>

      <section className="portfolio-section">
        <h2>Social Media Management</h2>
        <p>
          We manage Facebook, Instagram, and other platforms, boosting engagement and reach for brands and organizations.
        </p>
      </section>
    </main>
  );
}

export default Portfolio;
