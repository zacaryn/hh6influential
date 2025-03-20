import React from "react";
import { Link } from "react-router-dom";
import PageHead from './common/PageHead';
import "../styles/NotFound.css";

function NotFound() {
  return (
    <>
      <PageHead 
        title="Page Not Found" 
        description="The page you are looking for could not be found. Please check the URL or navigate back to the home page."
        keywords="404, page not found, error, navigation"
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