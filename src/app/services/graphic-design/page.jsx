'use client';

import { useState } from "react";
import Link from "next/link";
import FAQ from '@/components/FAQ';
import '@/styles/Services.css';

export default function GraphicDesignService() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % portfolio.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + portfolio.length) % portfolio.length);
  };

  const portfolio = [
    {
      image: "/assets/images/ggflogo.png",
      title: "Georgia National Guard Family Support Foundation Logo",
      description: "Professional logo design for non-profit military support organization",
      type: "Logo Design",
      category: "Brand Identity"
    },
    {
      image: "/assets/images/bluebirdwebsite.jpg",
      title: "Bluebird Mortgage Splash Design",
      description: "Eye-catching website splash page design for mortgage services",
      type: "Web Design",
      category: "Digital Marketing"
    },
    {
      image: "/assets/images/flyer1.png",
      title: "Clay National Guard Center Chapel Appreciation Day Flyer",
      description: "Event marketing flyer for military chapel appreciation ceremony",
      type: "Event Flyer",
      category: "Print Marketing"
    },
    {
      image: "/assets/images/flyer2.png",
      title: "Georgia Gives Partnership Promotion",
      description: "Donation campaign flyer for Georgia Gives partnered with GNGFSF",
      type: "Campaign Flyer",
      category: "Print Marketing"
    },
    {
      image: "/assets/images/flyer3.png",
      title: "Veterans Day Deals & Discounts Promotion",
      description: "Marketing material for Veterans Day special offers at GNGFSF",
      type: "Promotional Flyer",
      category: "Print Marketing"
    }
  ];

  const faqs = [
    {
      question: "What graphic design services do you offer?",
      answer: (
        <div>
          <p>Our comprehensive graphic design services include:</p>
          <ul>
            <li><strong>Brand Identity & Logo Design:</strong> Complete brand packages with logos, color schemes, and style guides</li>
            <li><strong>Print Marketing Materials:</strong> Brochures, flyers, business cards, and promotional materials</li>
            <li><strong>Social Media Graphics:</strong> Custom templates, posts, and stories for all platforms</li>
            <li><strong>Digital Asset Creation:</strong> Website graphics, UI elements, and online marketing materials</li>
            <li><strong>Packaging Design:</strong> Product packaging and label design for retail items</li>
            <li><strong>Signage & Banner Design:</strong> Large format printing and display materials</li>
          </ul>
        </div>
      )
    },
    {
      question: "What's your design process?",
      answer: (
        <div>
          <p>We follow a structured design process to ensure your vision comes to life:</p>
          <ul>
            <li><strong>Discovery & Briefing:</strong> Detailed project brief and requirements gathering</li>
            <li><strong>Concept Development:</strong> Initial design concepts and mood boards</li>
            <li><strong>Design Creation:</strong> Professional design work using industry-standard software</li>
            <li><strong>Review & Revisions:</strong> Client feedback and design refinements</li>
            <li><strong>Final Delivery:</strong> High-resolution files in all required formats</li>
            <li><strong>Brand Guidelines:</strong> Style guides and usage instructions for ongoing consistency</li>
          </ul>
          <p>All projects are defined by written proposals, and requests outside the agreed scope will be billed separately. Payment is based on hourly time spent and is due upon project completion.</p>
        </div>
      )
    },
    {
      question: "What file formats do you provide?",
      answer: (
        <div>
          <p>We deliver designs in all standard formats for maximum versatility:</p>
          <ul>
            <li><strong>Print Formats:</strong> PDF, EPS, and high-resolution TIFF files</li>
            <li><strong>Web Formats:</strong> PNG, JPG, and SVG for online use</li>
            <li><strong>Editable Files:</strong> Adobe Illustrator (.ai) and Photoshop (.psd) source files</li>
            <li><strong>Vector Graphics:</strong> Scalable formats for any size application</li>
            <li><strong>Social Media:</strong> Platform-specific sizes and formats</li>
          </ul>
          <p>All files are organized and labeled for easy use by your team or other vendors.</p>
        </div>
      )
    },
    {
      question: "How long does design work take?",
      answer: (
        <div>
          <p>Design timelines vary based on project complexity:</p>
          <ul>
            <li><strong>Simple Graphics:</strong> 3-5 business days for basic designs</li>
            <li><strong>Logo Design:</strong> 7-10 business days for complete brand identity</li>
            <li><strong>Marketing Materials:</strong> 5-7 business days for brochures and flyers</li>
            <li><strong>Complex Projects:</strong> 10-14 business days for comprehensive design packages</li>
            <li><strong>Rush Projects:</strong> Expedited delivery available for additional fees</li>
          </ul>
          <p>Timelines include review periods and are outlined in our written project proposals.</p>
        </div>
      )
    },
    {
      question: "Do you provide ongoing design support?",
      answer: (
        <div>
          <p>Yes, we offer ongoing design support and maintenance:</p>
          <ul>
            <li><strong>Design Updates:</strong> Minor changes to existing designs</li>
            <li><strong>New Materials:</strong> Additional designs using established brand guidelines</li>
            <li><strong>Template Creation:</strong> Custom templates for your team to use</li>
            <li><strong>Brand Consistency:</strong> Ensuring all materials maintain brand standards</li>
            <li><strong>File Management:</strong> Organized storage and easy access to all design assets</li>
          </ul>
          <p>Ongoing support is available through retainer packages or hourly billing after the initial project completion.</p>
        </div>
      )
    },
    {
      question: "What about copyright and usage rights?",
      answer: (
        <div>
          <p>We handle intellectual property rights professionally:</p>
          <ul>
            <li><strong>Client Ownership:</strong> You retain full ownership of completed designs after final payment</li>
            <li><strong>Usage Rights:</strong> Full commercial usage rights for all delivered designs</li>
            <li><strong>Source Files:</strong> Editable files provided for future modifications</li>
            <li><strong>Portfolio Rights:</strong> We may display work in our portfolio unless restricted by NDA</li>
            <li><strong>Font Licensing:</strong> All fonts used are properly licensed for commercial use</li>
          </ul>
          <p>All rights and usage terms are clearly outlined in our project agreements.</p>
        </div>
      )
    }
  ];

  const technologies = ["Adobe Creative Suite", "Photoshop", "Illustrator", "InDesign", "Canva Pro"];

  const designCategories = [
    {
      category: "Brand Identity",
      description: "Complete brand identity packages including logos, business cards, and brand guidelines",
      examples: ["Logo Design", "Business Cards", "Letterhead", "Brand Guidelines"]
    },
    {
      category: "Print Marketing",
      description: "Traditional marketing materials designed for print and distribution",
      examples: ["Flyers", "Brochures", "Posters", "Banners", "Business Cards"]
    },
    {
      category: "Digital Marketing",
      description: "Graphics optimized for digital platforms and social media",
      examples: ["Social Media Posts", "Web Graphics", "Email Templates", "Digital Ads"]
    },
    {
      category: "Event Marketing",
      description: "Specialized materials for events, promotions, and campaigns",
      examples: ["Event Flyers", "Promotional Materials", "Signage", "Programs"]
    }
  ];


  return (
    <div className="page-container">
      <section className="service-hero">
        <div className="service-hero-content">
          <div className="service-breadcrumb">
            <Link href="/services">Services</Link>
            <span>/</span>
            <span>Graphic Design & Marketing Materials</span>
          </div>
          <h1>Graphic Design & Marketing Materials</h1>
          <p className="lead">
            Eye-catching visual content and marketing materials
          </p>
          <div className="service-hero-actions">
            <Link href="/contact" className="cta-button primary">
              Start Your Design
            </Link>
            <Link href="/portfolio" className="cta-button secondary">
              View Our Work
            </Link>
          </div>
        </div>
        <div className="service-hero-image">
          <img src="/assets/images/graphic-design.jpg" alt="Graphic Design & Marketing Materials" />
        </div>
      </section>

      <section className="service-overview">
        <div className="service-overview-content">
          <h2>What We Do</h2>
          <p>
            We design everything from flyers and brochures to social media graphics and brand identities 
            that make your business stand out. Our design services help communicate your brand message 
            effectively across all marketing channels with consistent, professional visual elements.
          </p>
        </div>
      </section>

      <FAQ faqs={faqs} title="Graphic Design & Marketing Materials FAQ" />

      <section className="service-categories">
        <div className="service-categories-content">
          <h2>Design Categories</h2>
          <div className="categories-grid">
            {designCategories.map((category, index) => (
              <div key={index} className="category-card">
                <h3>{category.category}</h3>
                <p>{category.description}</p>
                <div className="category-examples">
                  <h4>Examples:</h4>
                  <ul>
                    {category.examples.map((example, i) => (
                      <li key={i}>{example}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="service-technologies">
        <div className="service-technologies-content">
          <h2>Professional Design Tools</h2>
          <div className="tech-tags">
            {technologies.map((tech, index) => (
              <span key={index} className="tech-tag">{tech}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="service-portfolio">
        <div className="service-portfolio-content">
          <h2>Featured Design Projects</h2>
          <div className="service-slideshow">
            <div className="service-slideshow-container">
              <div 
                className="service-slideshow-wrapper"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {portfolio.map((project, index) => (
                  <div key={index} className="service-slide">
                    <div className="service-image-container">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="service-image"
                        onClick={() => setSelectedImage(project)}
                      />
                      <div className="portfolio-overlay">
                        <h4>{project.title}</h4>
                        <p>{project.description}</p>
                        <div className="project-details">
                          <span className="detail-tag">{project.type}</span>
                          <span className="detail-tag">{project.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {portfolio.length > 1 && (
                <>
                  <button className="slideshow-btn prev" onClick={prevSlide}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                    </svg>
                  </button>
                  <button className="slideshow-btn next" onClick={nextSlide}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                    </svg>
                  </button>
                  
                  <div className="slideshow-indicators">
                    {portfolio.map((_, index) => (
                      <button
                        key={index}
                        className={`indicator ${currentSlide === index ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="service-cta">
        <div className="cta-content">
          <h2>Ready to Elevate Your Brand with Professional Design?</h2>
          <p>Let's create visual materials that make your business stand out and communicate your message effectively.</p>
          <div className="cta-actions">
            <Link href="/contact" className="cta-button primary">
              Start Your Design Project
            </Link>
            <Link href="/portfolio" className="cta-button secondary">
              See More Examples
            </Link>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="image-modal-close" onClick={() => setSelectedImage(null)}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
            <img 
              src={selectedImage.image} 
              alt={selectedImage.title} 
              className="image-modal-img"
            />
            <div className="image-modal-info">
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.description}</p>
              <div className="project-details">
                <span className="detail-tag">{selectedImage.type}</span>
                <span className="detail-tag">{selectedImage.category}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
