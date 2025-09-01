import React from "react";
import { Link } from "react-router-dom";
import Seo from '../components/Seo';
import { ROUTE_TITLE_RULES, ROUTE_DESCRIPTIONS } from '../components/seoConfig';
import "../styles/NotFound.css";

function NotFound() {
  return (
    <>
      <Seo
        title={ROUTE_TITLE_RULES.notFound}
        description={ROUTE_DESCRIPTIONS.notFound}
        path="/404"
        noIndex
      />
      <div className="page-container">
        <section className="not-found-container">
          <div className="not-found-content">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>The page you are looking for doesn't exist or has been moved.</p>
            <div className="actions">
              <Link to="/" className="home-button">Return to Homepage</Link>
              <Link to="/contact" className="contact-button">Contact Us</Link>
            </div>
          </div>
          <div className="not-found-image">
            <img src="/assets/images/hh6logo.png" alt="HH6 Influential Logo" />
          </div>
        </section>
      </div>
    </>
  );
}

export default NotFound; 