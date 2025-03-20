// src/components/Services.jsx
import React from "react";
import "./../styles/Services.css";
import PageHead from './common/PageHead';

function Services() {
  const servicesList = [
    {
      title: "Web Design & Development",
      description: "Custom-built websites tailored for small businesses and brands. We create a professional online presence that reflects your identity.",
      features: [
        "Responsive Design",
        "SEO Optimization",
        "Custom Functionality",
        "Content Management Systems"
      ]
    },
    {
      title: "Logo & Graphic Design",
      description: "Professional graphic and logo design services to help you establish a strong brand identity and market presence.",
      features: [
        "Brand Identity Design",
        "Marketing Materials",
        "Social Media Graphics",
        "Print-Ready Designs"
      ]
    },
    {
      title: "Social Media Management",
      description: "We provide content creation, post scheduling, and strategic planning to expand your brand's reach across platforms.",
      features: [
        "Content Strategy",
        "Engagement Monitoring",
        "Analytics Reporting",
        "Campaign Management"
      ]
    }
  ];

  return (
    <>
      <PageHead 
        title="Services" 
        description="Comprehensive digital solutions including web development, social media management, and graphic design services tailored for your business needs."
        keywords="web development services, social media management, graphic design, custom websites, digital marketing, business solutions"
      />
      <div className="page-container">
        <section className="services-hero">
          <h1>Our Services</h1>
          <p className="lead">
            Comprehensive digital solutions tailored to your needs
          </p>
        </section>

        <div className="services-grid">
          {servicesList.map((service, index) => (
            <section key={index} className="service-card">
              <div className="service-content">
                <h2>{service.title}</h2>
                <p>{service.description}</p>
                <ul className="features-list">
                  {service.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}

export default Services;
