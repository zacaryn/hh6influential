// src/components/Services.jsx
import React from "react";
import "./../styles/Services.css"; // Page-specific styles

function Services() {
  return (
    <main className="services">
      <h1>Our Services</h1>

      <section className="service-section">
        <h2>Web Design & Development</h2>
        <p>
          Custom-built websites tailored for small businesses and brands. We create a professional online presence that reflects your identity.
        </p>
      </section>

      <section className="service-section">
        <h2>Logo & Graphic Design</h2>
        <p>
          Professional graphic and logo design services to help you establish a strong brand identity and market presence.
        </p>
      </section>

      <section className="service-section">
        <h2>Social Media Management & Marketing</h2>
        <p>
          We provide content creation, post scheduling, and strategic planning to expand your brand’s reach across platforms.
        </p>
      </section>
    </main>
  );
}

export default Services;
