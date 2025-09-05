'use client';

import { useState } from "react";
import Link from "next/link";
import FAQ from '@/components/FAQ';
import '@/styles/Services.css';

export default function SocialMediaService() {
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
  ];

  const faqs = [
    {
      question: "What's included in your social media management?",
      answer: (
        <div>
          <p>Our comprehensive social media management includes:</p>
          <ul>
            <li><strong>Content Creation & Curation:</strong> Custom graphics, videos, and written content tailored to your brand</li>
            <li><strong>Post Scheduling & Publishing:</strong> Consistent posting across all platforms with optimal timing</li>
            <li><strong>Community Engagement:</strong> Responding to comments, messages, and reviews to build relationships</li>
            <li><strong>Analytics & Reporting:</strong> Monthly performance reports with insights and recommendations</li>
            <li><strong>Brand Voice Development:</strong> Creating and maintaining a consistent brand personality</li>
            <li><strong>Hashtag Strategy:</strong> Research and implementation of effective hashtag campaigns</li>
            <li><strong>Influencer Outreach:</strong> Connecting with relevant influencers in your industry</li>
            <li><strong>Social Media Advertising:</strong> Paid campaigns to boost reach and engagement</li>
          </ul>
        </div>
      )
    },
    {
      question: "Which platforms do you manage?",
      answer: (
        <div>
          <p>We manage all major social media platforms:</p>
          <ul>
            <li><strong>Facebook:</strong> Business pages, groups, and advertising campaigns</li>
            <li><strong>Instagram:</strong> Posts, stories, reels, and shopping features</li>
            <li><strong>LinkedIn:</strong> Professional content and B2B networking</li>
            <li><strong>Twitter:</strong> Real-time engagement and trending topics</li>
            <li><strong>TikTok:</strong> Short-form video content and viral campaigns</li>
            <li><strong>YouTube:</strong> Video content strategy and channel optimization</li>
          </ul>
          <p>We can focus on specific platforms based on your target audience and business goals.</p>
        </div>
      )
    },
    {
      question: "How do you measure success?",
      answer: (
        <div>
          <p>We track key performance indicators (KPIs) to measure your social media success:</p>
          <ul>
            <li><strong>Engagement Metrics:</strong> Likes, comments, shares, and saves</li>
            <li><strong>Reach & Impressions:</strong> How many people see your content</li>
            <li><strong>Follower Growth:</strong> Quality follower acquisition over time</li>
            <li><strong>Website Traffic:</strong> Social media referrals to your website</li>
            <li><strong>Lead Generation:</strong> Inquiries and conversions from social media</li>
            <li><strong>Brand Awareness:</strong> Mentions, tags, and brand recognition</li>
          </ul>
          <p>We provide monthly reports with detailed analytics and actionable insights for improvement.</p>
        </div>
      )
    },
    {
      question: "What's your content creation process?",
      answer: (
        <div>
          <p>Our content creation follows a strategic approach:</p>
          <ul>
            <li><strong>Strategy Development:</strong> We create a content calendar based on your goals and audience</li>
            <li><strong>Content Planning:</strong> Mix of educational, promotional, and engaging content</li>
            <li><strong>Visual Design:</strong> Custom graphics, photos, and videos that match your brand</li>
            <li><strong>Copywriting:</strong> Compelling captions and copy that drive engagement</li>
            <li><strong>Platform Optimization:</strong> Content tailored for each platform's best practices</li>
            <li><strong>Performance Analysis:</strong> Regular review and optimization based on results</li>
          </ul>
          <p>All content is created in-house and aligns with your brand guidelines and voice.</p>
        </div>
      )
    },
    {
      question: "How often do you post?",
      answer: (
        <div>
          <p>Posting frequency varies by platform and your specific needs:</p>
          <ul>
            <li><strong>Facebook:</strong> 3-5 posts per week for optimal engagement</li>
            <li><strong>Instagram:</strong> 4-6 posts per week plus daily stories</li>
            <li><strong>LinkedIn:</strong> 3-4 posts per week for professional content</li>
            <li><strong>Twitter:</strong> 5-7 posts per week for real-time engagement</li>
            <li><strong>TikTok:</strong> 3-4 videos per week for consistent presence</li>
          </ul>
          <p>We adjust frequency based on your audience activity, industry trends, and content performance. Quality always takes priority over quantity.</p>
        </div>
      )
    },
    {
      question: "What about crisis management?",
      answer: (
        <div>
          <p>We provide comprehensive crisis management for social media:</p>
          <ul>
            <li><strong>Monitoring:</strong> 24/7 monitoring for mentions, reviews, and potential issues</li>
            <li><strong>Rapid Response:</strong> Quick response to negative comments or situations</li>
            <li><strong>Damage Control:</strong> Strategic communication to protect your reputation</li>
            <li><strong>Prevention:</strong> Proactive strategies to avoid potential crises</li>
            <li><strong>Recovery:</strong> Post-crisis communication and reputation rebuilding</li>
          </ul>
          <p>We work closely with you to develop appropriate responses and maintain your brand's integrity during challenging times.</p>
        </div>
      )
    }
  ];

  const technologies = ["Facebook", "Instagram", "LinkedIn", "Twitter", "TikTok", "YouTube"];

  return (
    <div className="page-container">
      <section className="service-hero">
        <div className="service-hero-content">
          <div className="service-breadcrumb">
            <Link href="/services">Services</Link>
            <span>/</span>
            <span>Social Media Management</span>
          </div>
          <h1>Social Media Management</h1>
          <p className="lead">
            Comprehensive social media strategy and management across all platforms
          </p>
          <div className="service-hero-actions">
            <Link href="/contact" className="cta-button primary">
              Get Started
            </Link>
            <Link href="/portfolio" className="cta-button secondary">
              See Our Results
            </Link>
          </div>
        </div>
        <div className="service-hero-image">
          <img src="/assets/images/social-media.jpg" alt="Social Media Management" />
        </div>
      </section>

      <section className="service-overview">
        <div className="service-overview-content">
          <h2>What We Do</h2>
          <p>
            We handle content creation, posting schedules, community engagement, and analytics to build your brand and connect with your audience effectively. 
            Our team develops platform-specific content strategies that drive engagement, increase followers, and convert social media traffic into customers.
          </p>
        </div>
      </section>

      <FAQ faqs={faqs} title="Social Media Management FAQ" />

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
