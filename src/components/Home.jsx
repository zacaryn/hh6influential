import React from "react";
import { Link } from "react-router-dom";
import "./../styles/Home.css";
import Seo from '../components/Seo';
import { ROUTE_TITLE_RULES, ROUTE_DESCRIPTIONS, BUSINESS_NAME, PRIMARY_DOMAIN, LOGO_URL, SAMEAS_PROFILES, HAS_ONSITE_SEARCH, SITE_SEARCH_TARGET } from '../components/seoConfig';
import { WebSiteSchema, OrganizationSchema } from '../components/Schema';

function Home() {
  // Top 3 services to display
  const topServices = [
    {
      title: "Custom Website Development",
      description: "Tailored solutions built with modern technologies",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3h18v4H3V3zm0 6h18v10c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V9zm2 3v2h2v-2H5zm4 0v2h6v-2H9z"/>
        </svg>
      )
    },
    {
      title: "Social Media Management",
      description: "Strategy, content, and growth across platforms",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3z"/>
        </svg>
      )
    },
    {
      title: "Video Creation & Editing",
      description: "Promotional videos, ads, and reels",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2z"/>
        </svg>
      )
    }
  ];



  return (
    <>
      <Seo
        title={ROUTE_TITLE_RULES.home}
        description={ROUTE_DESCRIPTIONS.home}
        path="/"
      />
      <WebSiteSchema
        name={BUSINESS_NAME}
        url={PRIMARY_DOMAIN}
        hasSearch={HAS_ONSITE_SEARCH}
        searchTarget={SITE_SEARCH_TARGET}
      />
      <OrganizationSchema
        name={BUSINESS_NAME}
        url={PRIMARY_DOMAIN}
        logoUrl={LOGO_URL}
        sameAs={SAMEAS_PROFILES}
        email="contact@hh6influential.com"
        telephone="(678) 842-3469"
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
          <h2>Our Top Services</h2>
          <p className="section-description">
            Our team specializes in a range of services designed to meet your
            business needs:
          </p>
          <div className="services-grid">
            {topServices.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">
                  {service.icon}
                </div>
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

        <section className="military-discount-section">
          <div className="discount-container">
            <div className="discount-image">
              <img src="/assets/images/militarydiscount.png" alt="Military Discount" />
            </div>
            <div className="discount-content">
              <h2>10% Military Discount</h2>
              <p>
                At HH6 Influential, we're proud to give back to our military community with an exclusive 10% discount on all our services. Whether you need a professional website, social media management, or a complete digital strategy, we're here to help your business thrive.
              </p>
              <p className="discount-note">Offer valid through October 1st, 2024</p>
              <div className="discount-cta">
                <Link to="/contact" className="cta-button">
                  Claim Your Discount
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
