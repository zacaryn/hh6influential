// src/components/About.jsx
import React from "react";
import "./../styles/About.css"; // Page-specific styles

function About() {
  return (
    <main className="about">
      <h1>About Us</h1>
      <p>We are a family-owned business with a strong veteran background.</p>

      <section className="team-section">
        <h2>Meet the Team</h2>
        <p>
          Founder and father, Tim Head, is a retired Lieutenant Colonel in the Army, later joining the Georgia National Guard. His experience and leadership inspire our commitment to helping veterans and families.
        </p>
        
        <div className="image-row">
          <div className="image-container">
            <img src="/assets/images/ltc_head.png" alt="Lieutenant Colonel Tim Head" className="responsive-image" />
          </div>
          <div className="image-container">
            <img src="/assets/images/ltc_head2.jpg" alt="Lieutenant Colonel Tim Head" className="responsive-image" />
          </div>
        </div>

        <p>
          Zach and Max, the next-generation developers, are passionate about tech, while Leslie, with expertise in graphic design and media, ensures creative excellence in all our work.
        </p>

        <div className="image-container">
          <img src="/assets/images/zachary_maxwell.jpg" alt="Zachary and Maxwell" className="responsive-image" />
        </div>
      </section>
    </main>
  );
}

export default About;
