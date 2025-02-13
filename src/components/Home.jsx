import React from "react";
import { Link } from "react-router-dom";
import "./../styles/Home.css";

function Home() {
  const services = [
    {
      title: "Custom Website Development",
      description: "Tailored solutions built with modern technologies"
    },
    {
      title: "Social Media Strategy",
      description: "Comprehensive management and growth strategies"
    },
    {
      title: "Creative Graphic Design",
      description: "Eye-catching visuals that tell your story"
    }
  ];

  return (
    <div className="page-container">
      <section className="home-hero">
        <h1>Welcome to HH6 Influential</h1>
        <p className="lead">
          At Household Six Influential, we provide exceptional services to enhance
          your online presence through social media management, website
          development, and graphic design.
        </p>
        <Link to="/portfolio" className="cta-button">
          Check Out Our Portfolio
        </Link>
      </section>

      <section className="home-services">
        <h2>What We Offer</h2>
        <p className="section-description">
          Our team specializes in a range of services designed to meet your
          business needs:
        </p>
        <div className="services-container">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
        <div className="services-cta">
          <div className="cta-content">
            <h3>Ready to Transform Your Digital Presence?</h3>
            <p>
              Discover how our comprehensive suite of services can help your business thrive in the digital landscape. From custom web solutions to engaging social media strategies, we're here to help you succeed.
            </p>
          </div>
          <Link to="/services" className="cta-button">
            Explore Our Services
          </Link>
        </div>
      </section>

      <section className="pledge-section">
        <h2>Our Pledge</h2>
        <p>
          As a veteran-owned company, we are committed to serving both civilians
          and service members with respect, integrity, and dedication. We meet
          our clients where they are, understanding their unique needs and
          delivering solutions that align with their vision.
        </p>
      </section>
    </div>
  );
}

export default Home;
