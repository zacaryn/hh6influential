import React from "react";
import { Link } from "react-router-dom";
import "./../styles/Home.css";
import PageHead from './common/PageHead';

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
    <>
      <PageHead 
        title="Home" 
        description="HH6 Influential provides exceptional digital solutions including web development, social media management, and graphic design. Veteran-owned and operated."
        keywords="digital solutions, veteran owned business, web development, social media management, graphic design, HH6, Household Six"
      />
      <div className="page-container">
        <section className="home-hero">
          <h1>Welcome to HH6 Influential</h1>
          <p className="lead">
            At Household Six Influential, we provide exceptional services to enhance
            your online presence through social media management, website
            development, and graphic design.
          </p>
          <div className="hero-actions">
            <a href="tel:+16788423469" className="phone-button">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              (678) 842-3469
            </a>
            <Link to="/portfolio" className="cta-button">
              Check Out Our Portfolio
            </Link>
          </div>
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
    </>
  );
}

export default Home;
