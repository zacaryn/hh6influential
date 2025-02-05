// src/components/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./../styles/Home.css"; // Page-specific styles

function Home() {
  return (
    <main className="home">
      <h1>Welcome to HH6 Influential</h1>
      <p>
        At Household Six Influential, we provide social media management, website development, and graphic design services.
      </p>

      <section className="home-intro">
        <h2>Our Pledge</h2>
        <p>
          As a veteran-owned company, we are committed to serving both civilians and service members with respect, integrity, and dedication.
        </p>
        <img src="/assets/images/pledge.png" alt="Our Pledge" className="responsive-image" />
        <p>
          Whether it's custom web design, logos, flyers, or ongoing support, we work diligently to provide high-quality, tailored services that make an impact.
        </p>
      </section>

      <div className="portfolio-button-container">
        <Link to="/portfolio" className="portfolio-button">Check Out Our Portfolio</Link>
      </div>
    </main>
  );
}

export default Home;
