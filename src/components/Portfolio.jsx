// src/components/Portfolio.jsx
import React, { useState, useEffect } from "react";
import "./../styles/Portfolio.css";
import PageHead from './common/PageHead';

function Portfolio() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const portfolioItems = [
    {
      title: "Georgia National Guard Family Support Foundation",
      category: "Web Development",
      description: "Developed a comprehensive SQL database system with custom admin panel for managing the foundation's events and operations.",
      image: "/assets/images/ggflogo.png",
      link: "https://georgiaguardfamily.org/"
    },
    {
      title: "Veteran Support Programs",
      category: "Social Media & Design",
      description: "Created engaging social media campaigns and promotional materials to raise awareness for veteran support initiatives.",
      images: [
        "/assets/images/flyer1.png",
        "/assets/images/flyer2.png",
        "/assets/images/flyer3.png",
        "/assets/images/flyer4.png",
        "/assets/images/flyer5.png"
      ],
      link: "#"
    },
    {
      title: "Social Media Management",
      category: "Digital Marketing",
      description: "Comprehensive social media strategy and content management across Facebook, Instagram, and other platforms, boosting engagement and reach for brands and organizations.",
      image: "/assets/images/media1.png",
      link: "#"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (portfolioItems[1].images) {
        setCurrentSlide((prev) => (prev + 1) % portfolioItems[1].images.length);
      }
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <PageHead title="Portfolio" />
      <div className="page-container">
        <section className="portfolio-hero">
          <h1>Our Portfolio</h1>
          <p className="lead">
            Explore our work and see how we've helped organizations transform their digital presence.
          </p>
        </section>

        <section className="portfolio-grid">
          {portfolioItems.map((item, index) => (
            <div key={index} className="portfolio-card">
              <div className="portfolio-image">
                {item.images ? (
                  <>
                    <img 
                      src={item.images[currentSlide]} 
                      alt={`${item.title} - Slide ${currentSlide + 1}`}
                    />
                    <div className="slideshow-controls">
                      <span className="slide-counter">
                        {currentSlide + 1} / {item.images.length}
                      </span>
                    </div>
                  </>
                ) : (
                  <img src={item.image} alt={item.title} />
                )}
                <div className="portfolio-overlay">
                  <a 
                    href={item.link} 
                    className="view-project"
                    target={item.link !== "#" ? "_blank" : undefined}
                    rel={item.link !== "#" ? "noopener noreferrer" : undefined}
                  >
                    View Project
                  </a>
                </div>
              </div>
              <div className="portfolio-content">
                <span className="category">{item.category}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="portfolio-cta">
          <div className="cta-content">
            <h2>Ready to Start Your Project?</h2>
            <p>Let's work together to create something amazing for your organization.</p>
            <a href="/contact" className="cta-button">Get in Touch</a>
          </div>
        </section>
      </div>
    </>
  );
}

export default Portfolio;
