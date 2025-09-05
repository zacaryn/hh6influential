'use client';

import { useState } from "react";
import Link from "next/link";
import FAQ from '@/components/FAQ';
import '@/styles/Services.css';

export default function WebDesignService() {
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
      image: "/assets/images/bluebirdwebdesign.png",
      title: "Bluebird Mortgage",
      description: "Professional mortgage brokerage website"
    },
    {
      image: "/assets/images/danwebdesign.png", 
      title: "Dan Weihmiller Real Estate",
      description: "Custom real estate website with property integration"
    },
    {
      image: "/assets/images/georgiaguardwebdesign.png",
      title: "Georgia National Guard Foundation",
      description: "Non-profit website with donation platform"
    }
  ];

  const faqs = [
    {
      question: "What's included in your web design service?",
      answer: (
        <div>
          <p>Our comprehensive web design service includes:</p>
          <ul>
            <li><strong>Custom Responsive Design:</strong> Mobile-first approach ensuring your site looks perfect on all devices</li>
            <li><strong>E-commerce Solutions:</strong> Shopping carts, payment processing, and inventory management systems</li>
            <li><strong>Content Management Systems:</strong> Easy-to-use admin panels for updating content without technical knowledge</li>
            <li><strong>Performance Optimization:</strong> Fast loading times and smooth user experience</li>
            <li><strong>SEO-Ready Structure:</strong> Built with search engine optimization in mind</li>
            <li><strong>SSL Security:</strong> Secure connections and data protection</li>
            <li><strong>Cross-Browser Compatibility:</strong> Works seamlessly across all major browsers</li>
          </ul>
        </div>
      )
    },
    {
      question: "How does the project process work?",
      answer: (
        <div>
          <p>We follow a structured approach to ensure your project meets your expectations:</p>
          <ul>
            <li><strong>Discovery & Planning:</strong> We start with a 50% deposit and create a detailed written proposal outlining features, deliverables, and pricing</li>
            <li><strong>Design & Development:</strong> Custom design mockups and responsive development using modern technologies</li>
            <li><strong>Testing & Review:</strong> Comprehensive testing across devices and browsers</li>
            <li><strong>Launch & Support:</strong> Final payment due upon completion, with a 30-day post-launch grace period for minor updates within scope</li>
          </ul>
          <p>All work is defined by written proposals, and requests outside the agreed scope will be billed separately.</p>
        </div>
      )
    },
    {
      question: "What technologies do you use?",
      answer: (
        <div>
          <p>We use modern, industry-standard technologies to build your website:</p>
          <ul>
            <li><strong>Frontend:</strong> React, HTML5, CSS3, JavaScript for interactive, responsive designs</li>
            <li><strong>Backend:</strong> Node.js for server-side functionality and API development</li>
            <li><strong>Content Management:</strong> WordPress for easy content updates and management</li>
            <li><strong>E-commerce:</strong> Shopify integration for online stores and payment processing</li>
            <li><strong>Performance:</strong> Optimized hosting, CDN integration, and speed optimization</li>
          </ul>
        </div>
      )
    },
    {
      question: "Do you provide ongoing maintenance?",
      answer: (
        <div>
          <p>Yes, we offer comprehensive maintenance packages that include:</p>
          <ul>
            <li><strong>Regular Updates:</strong> Software updates, security patches, and plugin maintenance</li>
            <li><strong>Content Updates:</strong> Light content posting and minor text/image changes</li>
            <li><strong>Monitoring:</strong> 24/7 uptime monitoring and performance tracking</li>
            <li><strong>Backups:</strong> Automated daily backups and disaster recovery</li>
            <li><strong>Support:</strong> Technical support and troubleshooting</li>
          </ul>
          <p>Maintenance packages are billed in advance and include hosting, SSL certificates, and monitoring. After the 30-day grace period, updates are billed hourly or under a retainer agreement.</p>
        </div>
      )
    },
    {
      question: "What about hosting and domains?",
      answer: (
        <div>
          <p>We provide complete hosting and domain management services:</p>
          <ul>
            <li><strong>Hosting Services:</strong> Server space, SSL certificates, automated backups, and performance monitoring</li>
            <li><strong>Domain Management:</strong> Annual billing for domains managed by HH6, or support for client-managed domains</li>
            <li><strong>Migration:</strong> If you need to move your website from our hosting, we provide migration services at our standard hourly rate</li>
            <li><strong>Security:</strong> Regular security updates and monitoring to protect your site</li>
          </ul>
          <p>All hosting and domain services are billed annually in advance and are non-refundable once active.</p>
        </div>
      )
    },
    {
      question: "What happens if I need changes after launch?",
      answer: (
        <div>
          <p>We include a 30-day post-launch grace period for minor updates within the original project scope. After this period:</p>
          <ul>
            <li><strong>Minor Updates:</strong> Small text changes, image updates, and content modifications are billed hourly</li>
            <li><strong>Major Changes:</strong> New features or significant modifications require a new project proposal</li>
            <li><strong>Retainer Services:</strong> We offer monthly retainer packages for ongoing updates and maintenance</li>
            <li><strong>Scope Changes:</strong> Any requests outside the original written proposal will be quoted separately</li>
          </ul>
          <p>All work is clearly defined in written proposals to avoid any confusion about what's included.</p>
        </div>
      )
    }
  ];

  const technologies = ["React", "HTML5/CSS3", "JavaScript", "WordPress", "Shopify", "Node.js"];

  return (
    <div className="page-container">
      <section className="service-hero">
        <div className="service-hero-content">
          <div className="service-breadcrumb">
            <Link href="/services">Services</Link>
            <span>/</span>
            <span>Web Design & Development</span>
          </div>
          <h1>Web Design & Development</h1>
          <p className="lead">
            Custom websites built to drive results for your business
          </p>
          <div className="service-hero-actions">
            <Link href="/contact" className="cta-button primary">
              Get a Quote
            </Link>
            <Link href="/portfolio" className="cta-button secondary">
              View Our Work
            </Link>
          </div>
        </div>
        <div className="service-hero-image">
          <img src="/assets/images/web-design.jpg" alt="Web Design & Development" />
        </div>
      </section>

      <section className="service-overview">
        <div className="service-overview-content">
          <h2>What We Do</h2>
          <p>
            We create professional, responsive websites that engage your audience and convert visitors into customers. 
            From simple business sites to complex e-commerce platforms, we deliver solutions that grow with your business. 
            Our development process includes user experience design, mobile optimization, performance optimization, and ongoing maintenance support.
          </p>
        </div>
      </section>

      <FAQ faqs={faqs} title="Web Design & Development FAQ" />

      <section className="service-technologies">
        <div className="service-technologies-content">
          <h2>Technologies & Platforms</h2>
          <div className="tech-tags">
            {technologies.map((tech, index) => (
              <span key={index} className="tech-tag">{tech}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="service-portfolio">
        <div className="service-portfolio-content">
          <h2>Our Work</h2>
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
          <h2>Ready to Elevate Your Digital Presence?</h2>
          <p>Let's discuss how our comprehensive services can help grow your business and achieve your goals.</p>
          <div className="cta-actions">
            <Link href="/contact" className="cta-button primary">
              Get Started Today
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
