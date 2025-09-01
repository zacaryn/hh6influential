// src/components/Services.jsx
import React, { useState } from "react";
import "./../styles/Services.css";
import Seo from '../components/Seo';
import { ROUTE_TITLE_RULES, ROUTE_DESCRIPTIONS, BUSINESS_NAME, PRIMARY_DOMAIN } from '../components/seoConfig';
import { ServiceSchema, BreadcrumbSchema } from '../components/Schema';

function Services() {
  const [expandedService, setExpandedService] = useState(null);
  const [currentSlide, setCurrentSlide] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  const toggleService = (index) => {
    setExpandedService(expandedService === index ? null : index);
  };

  const nextSlide = (serviceIndex, totalSlides) => {
    setCurrentSlide(prev => ({
      ...prev,
      [serviceIndex]: ((prev[serviceIndex] || 0) + 1) % totalSlides
    }));
  };

  const prevSlide = (serviceIndex, totalSlides) => {
    setCurrentSlide(prev => ({
      ...prev,
      [serviceIndex]: ((prev[serviceIndex] || 0) - 1 + totalSlides) % totalSlides
    }));
  };

  const servicesList = [
    {
      title: "Web Design & Development",
      shortDescription: "Custom websites built to drive results for your business",
      fullDescription: "We create professional, responsive websites that engage your audience and convert visitors into customers. From simple business sites to complex e-commerce platforms, we deliver solutions that grow with your business. Our development process includes user experience design, mobile optimization, performance optimization, and ongoing maintenance support.",
      features: [
        "Custom Responsive Design",
        "E-commerce Solutions & Shopping Carts", 
        "Content Management Systems (CMS)",
        "Performance Optimization & Speed",
        "Mobile-First Development",
        "SEO-Ready Structure",
        "SSL Security Implementation",
        "Cross-Browser Compatibility"
      ],
      technologies: ["React", "HTML5/CSS3", "JavaScript", "WordPress", "Shopify", "Node.js"],
      image: "/assets/images/web-design.jpg",
      portfolio: [
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
      ],
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3h18v4H3V3zm0 6h18v10c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V9zm2 3v2h2v-2H5zm4 0v2h6v-2H9z"/>
        </svg>
      )
    },
    {
      title: "Social Media Management",
      shortDescription: "Comprehensive social media strategy and management across all platforms",
      fullDescription: "We handle content creation, posting schedules, community engagement, and analytics to build your brand and connect with your audience effectively. Our team develops platform-specific content strategies that drive engagement, increase followers, and convert social media traffic into customers.",
      features: [
        "Content Creation & Curation",
        "Post Scheduling & Publishing",
        "Community Engagement & Response",
        "Analytics & Performance Reporting",
        "Brand Voice Development",
        "Hashtag Strategy & Research",
        "Influencer Outreach",
        "Social Media Advertising"
      ],
      technologies: ["Facebook", "Instagram", "LinkedIn", "Twitter", "TikTok", "YouTube"],
      image: "/assets/images/social-media.jpg",
      portfolio: [
        {
          image: "/assets/images/media1.png",
          title: "Timothy Head LinkedIn Professional Profile",
          description: "Professional LinkedIn profile management and content strategy"
        },
        {
          image: "/assets/images/media2.png",
          title: "Georgia National Guard Family Support Foundation Facebook", 
          description: "Non-profit Facebook page management and community engagement"
        },
        {
          image: "/assets/images/media3.png",
          title: "Dan Weihmiller LinkedIn Professional Profile",
          description: "Real estate professional LinkedIn content and networking strategy"
        }
      ],
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3z"/>
        </svg>
      )
    },
    {
      title: "Video Creation & Editing",
      shortDescription: "Professional video content for promotions, ads, and social media",
      fullDescription: "From concept to final cut, we produce compelling visual stories that resonate with your audience. Our video services include promotional videos, social media reels, advertisements, product demonstrations, and complete video editing services with motion graphics and animation.",
      features: [
        "Promotional Videos & Commercials",
        "Social Media Reels & Stories",
        "Advertisement Creation",
        "Product Demonstration Videos",
        "Video Editing & Post-Production",
        "Motion Graphics & Animation",
        "Color Correction & Audio Enhancement",
        "Multi-Platform Format Optimization"
      ],
      technologies: ["Adobe Premiere Pro", "After Effects", "Final Cut Pro", "DaVinci Resolve"],
      image: "/assets/images/video-editing.jpg",
      portfolio: [
        {
          video: "/assets/images/eventpromo.mp4",
          title: "Assault on Kennesaw Mountain 5K Memorial",
          description: "Classic landscape style promotional video for memorial event",
          type: "video"
        },
        {
          video: "/assets/images/DanAdvertisement.mp4",
          title: "Dan Weihmiller Real Estate Ad",
          description: "Portrait/reel style advertisement for real estate services",
          type: "video"
        },
        {
          video: "/assets/images/BlueBirdRefinanceReel.mp4",
          title: "Bluebird Mortgage Refinance Ad",
          description: "Quick advertisement reel for refinancing services",
          type: "video"
        }
      ],
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2z"/>
        </svg>
      )
    },
    {
      title: "Graphic Design & Marketing Materials",
      shortDescription: "Eye-catching visual content and marketing materials",
      fullDescription: "We design everything from flyers and brochures to social media graphics and brand identities that make your business stand out. Our design services help communicate your brand message effectively across all marketing channels with consistent, professional visual elements.",
      features: [
        "Flyer & Brochure Design",
        "Social Media Graphics & Templates",
        "Brand Identity & Logo Design",
        "Business Cards & Stationery",
        "Print-Ready Marketing Materials",
        "Digital Asset Creation",
        "Packaging Design",
        "Signage & Banner Design"
      ],
      technologies: ["Adobe Creative Suite", "Photoshop", "Illustrator", "InDesign", "Canva Pro"],
      image: "/assets/images/graphic-design.jpg",
      portfolio: [
        {
          image: "/assets/images/ggflogo.png",
          title: "Georgia National Guard Family Support Foundation Logo",
          description: "Professional logo design for non-profit military support organization"
        },
        {
          image: "/assets/images/bluebirdwebsite.jpg",
          title: "Bluebird Mortgage Splash Design",
          description: "Eye-catching website splash page design for mortgage services"
        },
        {
          image: "/assets/images/flyer1.png",
          title: "Clay National Guard Center Chapel Appreciation Day Flyer",
          description: "Event marketing flyer for military chapel appreciation ceremony"
        },
        {
          image: "/assets/images/flyer2.png",
          title: "Georgia Gives Partnership Promotion",
          description: "Donation campaign flyer for Georgia Gives partnered with GNGFSF"
        },
        {
          image: "/assets/images/flyer3.png",
          title: "Veterans Day Deals & Discounts Promotion",
          description: "Marketing material for Veterans Day special offers at GNGFSF"
        }
      ],
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      )
    },
    {
      title: "Web Hosting & Infrastructure",
      shortDescription: "Reliable web hosting with 24/7 technical support",
      fullDescription: "We provide managed hosting, domain registration, SSL certificates, automated backups, and performance monitoring to ensure your online presence is always available. Our hosting solutions are optimized for speed, security, and reliability with scalable options for growing businesses.",
      features: [
        "Managed Web Hosting",
        "Domain Registration & Management",
        "SSL Certificates & Security",
        "Automated Daily Backups",
        "Performance Monitoring & Optimization",
        "Email Hosting & Setup",
        "CDN Integration",
        "24/7 Technical Support"
      ],
      technologies: ["cPanel", "WordPress Hosting", "Cloud Hosting", "AWS", "Cloudflare"],
      image: "/assets/images/web-hosting.jpg",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 1h16c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2zm0 2v2h16V3H4zm0 4v2h16V7H4zm0 4v2h16v-2H4zm0 4v2h16v-2H4z"/>
        </svg>
      )
    },
    {
      title: "Webmaster & System Administration",
      shortDescription: "Complete website management and system administration",
      fullDescription: "We handle everything from routine updates and security monitoring to technical support and system optimization, so you can focus on your business. Our webmaster services ensure your website stays current, secure, and performing at its best.",
      features: [
        "Website Maintenance & Updates",
        "Security Monitoring & Patches",
        "Server Management & Optimization",
        "Database Management & Optimization",
        "Plugin & Software Updates",
        "Performance Monitoring",
        "Backup Management",
        "24/7 Technical Support"
      ],
      technologies: ["Linux", "Windows Server", "MySQL", "PHP", "WordPress", "cPanel"],
      image: "/assets/images/sys-admin.jpg",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
        </svg>
      )
    },
    {
      title: "SEO & Digital Marketing",
      shortDescription: "Strategic SEO optimization and digital advertising management",
      fullDescription: "We increase your online visibility and drive qualified traffic through strategic SEO optimization and digital advertising management. Our services include Google Ads, Meta advertising campaigns, keyword optimization, and detailed analytics to maximize your return on investment.",
      features: [
        "SEO Keyword Research & Optimization",
        "Google Ads Campaign Management",
        "Meta (Facebook/Instagram) Advertising",
        "Local SEO & Google My Business",
        "Analytics & Performance Tracking",
        "Conversion Rate Optimization",
        "Content Marketing Strategy",
        "Competitor Analysis & Research"
      ],
      technologies: ["Google Ads", "Facebook Ads Manager", "Google Analytics", "SEMrush", "Ahrefs"],
      image: "/assets/images/seo-marketing.jpg",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z"/>
        </svg>
      )
    }
  ];

  return (
    <>
      <Seo
        title={ROUTE_TITLE_RULES.services}
        description={ROUTE_DESCRIPTIONS.services}
        path="/services"
      />
      <ServiceSchema name="Custom Web Development" providerName={BUSINESS_NAME} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${PRIMARY_DOMAIN}/` },
          { name: 'Services', url: `${PRIMARY_DOMAIN}/services` }
        ]}
      />
      <div className="page-container">
        <section className="services-hero">
          <h1>Our Services</h1>
          <p className="lead">
            Comprehensive digital solutions tailored to your needs
          </p>
        </section>

        <div className="services-accordion">
          {servicesList.map((service, index) => (
            <div key={index} className={`service-item ${expandedService === index ? 'expanded' : ''}`}>
              <div className="service-header" onClick={() => toggleService(index)}>
                <div className="service-header-content">
                  <div className="service-icon">{service.icon}</div>
                  <div className="service-title-section">
                    <h2>{service.title}</h2>
                    <p className="service-short-description">{service.shortDescription}</p>
                  </div>
                </div>
                <div className="expand-arrow">
                  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10l5 5 5-5z"/>
                  </svg>
                </div>
              </div>
              
              <div className="service-content">
                <div className="service-details">
                  <div className="service-image-section">
                    <div className="service-main-image">
                      <img src={service.image} alt={service.title} className="service-image" />
                    </div>
                    
                    {service.portfolio && (
                      <div className="portfolio-slideshow">
                        <h4>Our Work</h4>
                        <div className="slideshow-container">
                          <div 
                            className="slideshow-wrapper"
                            style={{
                              transform: `translateX(-${(currentSlide[index] || 0) * 100}%)`
                            }}
                          >
                            {service.portfolio.map((item, slideIndex) => (
                              <div 
                                key={slideIndex} 
                                className="portfolio-slide"
                                onClick={() => {
                                  console.log('Media clicked:', item);
                                  if (item.type === 'video') {
                                    setSelectedImage({ ...item, src: item.video, isVideo: true });
                                  } else {
                                    setSelectedImage({ ...item, src: item.image });
                                  }
                                }}
                              >
                                {item.type === 'video' ? (
                                  <video 
                                    src={item.video} 
                                    className="portfolio-image"
                                    muted
                                    loop
                                    playsInline
                                    onMouseEnter={(e) => e.target.play()}
                                    onMouseLeave={(e) => e.target.pause()}
                                  />
                                ) : (
                                  <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="portfolio-image"
                                  />
                                )}
                                <div className="portfolio-overlay">
                                  <h5>{item.title}</h5>
                                  <p>{item.description}</p>
                                  <p style={{ fontSize: '0.7rem', opacity: 0.8, marginTop: '5px' }}>
                                    Click to view {item.type === 'video' ? 'full video' : 'full image'}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          {service.portfolio.length > 1 && (
                            <>
                              <button 
                                className="slideshow-btn prev"
                                onClick={() => prevSlide(index, service.portfolio.length)}
                              >
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                                </svg>
                              </button>
                              <button 
                                className="slideshow-btn next"
                                onClick={() => nextSlide(index, service.portfolio.length)}
                              >
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                                </svg>
                              </button>
                              
                              <div className="slideshow-indicators">
                                {service.portfolio.map((_, slideIndex) => (
                                  <button
                                    key={slideIndex}
                                    className={`indicator ${(currentSlide[index] || 0) === slideIndex ? 'active' : ''}`}
                                    onClick={() => setCurrentSlide(prev => ({...prev, [index]: slideIndex}))}
                                  />
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="service-info">
                    <div className="service-description">
                      <h3>What We Do</h3>
                      <p>{service.fullDescription}</p>
                    </div>
                    
                    <div className="service-features">
                      <h3>Services Included</h3>
                      <ul>
                        {service.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="service-technologies">
                      <h3>Technologies & Platforms</h3>
                      <div className="tech-tags">
                        {service.technologies.map((tech, i) => (
                          <span key={i} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="services-cta">
          <div className="cta-content">
            <h2>Ready to Elevate Your Digital Presence?</h2>
            <p>Let's discuss how our comprehensive services can help grow your business and achieve your goals.</p>
            <a href="/contact" className="cta-button">Get Started Today</a>
          </div>
        </section>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="image-modal-close" onClick={() => setSelectedImage(null)}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
            {selectedImage.isVideo ? (
              <video 
                src={selectedImage.src} 
                className="image-modal-img"
                controls
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <img 
                src={selectedImage.src} 
                alt={selectedImage.title} 
                className="image-modal-img"
              />
            )}
            <div className="image-modal-info">
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Services;
