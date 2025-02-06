import React from "react";
import "./../styles/Home.css";

function Home() {
  return (
    <div className="page-container">
      {/* Hero Section */}
      <div className="section">
        <h1>Welcome to HH6 Influential</h1>
        <p>
          At Household Six Influential, we provide exceptional services to enhance
          your online presence, such as social media management, website
          development, and graphic design.
        </p>
        <a href="/portfolio" className="cta-button">
          Check Out Our Portfolio
        </a>
      </div>

      {/* Features Section */}
      <div className="section">
        <h2>What We Offer</h2>
        <p>
          Our team specializes in a range of services designed to meet your
          business needs:
        </p>
        <ul>
          <li>Custom Website Development</li>
          <li>Social Media Strategy and Management</li>
          <li>Creative Graphic Design Solutions</li>
        </ul>
        <a href="/services" className="cta-button">
          Learn More About Our Services
        </a>
        
      </div>
            {/* Our Pledge Section */}
            <div className="section">
        <h2>Our Pledge</h2>
        <p>
          As a veteran-owned company, we are committed to serving both civilians
          and service members with respect, integrity, and dedication. We meet
          our clients where they are, understanding their unique needs and
          delivering solutions that align with their vision.
        </p>
      </div>
    </div>
  );
}

export default Home;
