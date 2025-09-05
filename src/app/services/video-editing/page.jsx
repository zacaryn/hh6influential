'use client';

import { useState } from "react";
import Link from "next/link";
import FAQ from '@/components/FAQ';
import '@/styles/Services.css';

export default function VideoEditingService() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % portfolio.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + portfolio.length) % portfolio.length);
  };

  const portfolio = [
    {
      video: "/assets/images/eventpromo.mp4",
      title: "Assault on Kennesaw Mountain 5K Memorial",
      description: "Classic landscape style promotional video for memorial event"
    },
    {
      video: "/assets/images/DanAdvertisement.mp4",
      title: "Dan Weihmiller Real Estate Ad",
      description: "Portrait/reel style advertisement for real estate services"
    },
    {
      video: "/assets/images/BlueBirdRefinanceReel.mp4",
      title: "Bluebird Mortgage Refinance Ad",
      description: "Quick advertisement reel for refinancing services"
    }
  ];

  const faqs = [
    {
      question: "What types of videos do you create?",
      answer: (
        <div>
          <p>We create a wide variety of video content for different purposes:</p>
          <ul>
            <li><strong>Promotional Videos:</strong> Business introductions, service showcases, and brand stories</li>
            <li><strong>Social Media Content:</strong> Reels, stories, and platform-specific videos for Instagram, TikTok, and YouTube</li>
            <li><strong>Advertisement Videos:</strong> Paid advertising content for Facebook, Google, and other platforms</li>
            <li><strong>Product Demonstrations:</strong> How-to videos, product showcases, and educational content</li>
            <li><strong>Event Videos:</strong> Conference highlights, event recaps, and promotional event content</li>
            <li><strong>Testimonial Videos:</strong> Customer success stories and case study videos</li>
          </ul>
        </div>
      )
    },
    {
      question: "What's included in your video production process?",
      answer: (
        <div>
          <p>Our video production follows a comprehensive process:</p>
          <ul>
            <li><strong>Pre-Production:</strong> Script writing, storyboarding, and planning</li>
            <li><strong>Production:</strong> Professional filming with high-quality equipment</li>
            <li><strong>Post-Production:</strong> Editing, color correction, and audio enhancement</li>
            <li><strong>Motion Graphics:</strong> Custom animations, titles, and visual effects</li>
            <li><strong>Format Optimization:</strong> Multiple formats for different platforms and uses</li>
            <li><strong>Final Delivery:</strong> High-resolution files ready for your marketing needs</li>
          </ul>
          <p>All projects include a 50% deposit before work begins, with final payment due upon completion and delivery.</p>
        </div>
      )
    },
    {
      question: "What video formats do you provide?",
      answer: (
        <div>
          <p>We deliver videos in all standard formats for maximum compatibility:</p>
          <ul>
            <li><strong>Social Media:</strong> MP4 optimized for Instagram, Facebook, TikTok, and YouTube</li>
            <li><strong>Web Use:</strong> WebM and MP4 with compression for fast loading</li>
            <li><strong>Broadcast Quality:</strong> High-resolution files for professional presentations</li>
            <li><strong>Mobile Optimization:</strong> Vertical and square formats for mobile viewing</li>
            <li><strong>Archive Files:</strong> Uncompressed master files for future use</li>
          </ul>
          <p>We provide multiple versions of each video to ensure optimal performance across all platforms.</p>
        </div>
      )
    },
    {
      question: "How long does video production take?",
      answer: (
        <div>
          <p>Production timelines vary based on project complexity:</p>
          <ul>
            <li><strong>Simple Edits:</strong> 3-5 business days for basic video editing</li>
            <li><strong>Social Media Content:</strong> 5-7 business days for reels and short-form content</li>
            <li><strong>Promotional Videos:</strong> 7-14 business days for custom promotional content</li>
            <li><strong>Complex Projects:</strong> 2-4 weeks for multi-scene videos with motion graphics</li>
            <li><strong>Rush Projects:</strong> Expedited delivery available for additional fees</li>
          </ul>
          <p>Timelines are provided in written proposals and include review periods for your feedback.</p>
        </div>
      )
    },
    {
      question: "Do you provide video hosting and distribution?",
      answer: (
        <div>
          <p>We offer comprehensive video hosting and distribution services:</p>
          <ul>
            <li><strong>Video Hosting:</strong> Reliable hosting with fast loading times and global CDN</li>
            <li><strong>Platform Upload:</strong> We can upload directly to your social media accounts</li>
            <li><strong>YouTube Management:</strong> Channel optimization and video SEO</li>
            <li><strong>Analytics Tracking:</strong> Performance monitoring and engagement metrics</li>
            <li><strong>Backup Storage:</strong> Secure cloud storage for all your video assets</li>
          </ul>
          <p>Hosting services are billed annually in advance and include technical support and maintenance.</p>
        </div>
      )
    },
    {
      question: "What about revisions and changes?",
      answer: (
        <div>
          <p>We include reasonable revisions in our video production process:</p>
          <ul>
            <li><strong>Initial Review:</strong> First draft review and feedback incorporation</li>
            <li><strong>Minor Revisions:</strong> Small changes to text, timing, or basic edits</li>
            <li><strong>Major Changes:</strong> Significant modifications may require additional fees</li>
            <li><strong>Scope Changes:</strong> New requirements outside the original proposal are quoted separately</li>
            <li><strong>Final Approval:</strong> Client approval required before final delivery</li>
          </ul>
          <p>All revision policies are clearly outlined in our written project proposals to avoid confusion.</p>
        </div>
      )
    }
  ];

  const technologies = ["Adobe Premiere Pro", "After Effects", "Final Cut Pro", "DaVinci Resolve"];

  return (
    <div className="page-container">
      <section className="service-hero">
        <div className="service-hero-content">
          <div className="service-breadcrumb">
            <Link href="/services">Services</Link>
            <span>/</span>
            <span>Video Creation & Editing</span>
          </div>
          <h1>Video Creation & Editing</h1>
          <p className="lead">
            Professional video content for promotions, ads, and social media
          </p>
          <div className="service-hero-actions">
            <Link href="/contact" className="cta-button primary">
              Start Your Video
            </Link>
            <Link href="/portfolio" className="cta-button secondary">
              Watch Our Work
            </Link>
          </div>
        </div>
        <div className="service-hero-image">
          <img src="/assets/images/video-editing.jpg" alt="Video Creation & Editing" />
        </div>
      </section>

      <section className="service-overview">
        <div className="service-overview-content">
          <h2>What We Do</h2>
          <p>
            From concept to final cut, we produce compelling visual stories that resonate with your audience. 
            Our video services include promotional videos, social media reels, advertisements, product demonstrations, 
            and complete video editing services with motion graphics and animation.
          </p>
        </div>
      </section>

      <FAQ faqs={faqs} title="Video Creation & Editing FAQ" />

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
                      <video 
                        src={project.video}
                        className="service-video"
                        muted
                        loop
                        playsInline
                        onMouseEnter={(e) => e.target.play()}
                        onMouseLeave={(e) => e.target.pause()}
                        onClick={() => setSelectedVideo(project)}
                      />
                      <div className="portfolio-overlay">
                        <h4>{project.title}</h4>
                        <p>{project.description}</p>
                        <div className="play-button">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
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
          <h2>Ready to Elevate Your Digital Presence?</h2>
          <p>Let's discuss how our comprehensive services can help grow your business and achieve your goals.</p>
          <div className="cta-actions">
            <Link href="/contact" className="cta-button primary">
              Get Started Today
            </Link>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="video-modal" onClick={() => setSelectedVideo(null)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="video-modal-close" onClick={() => setSelectedVideo(null)}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
            <video 
              src={selectedVideo.video}
              className="video-modal-video"
              controls
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="video-modal-info">
              <h3>{selectedVideo.title}</h3>
              <p>{selectedVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
