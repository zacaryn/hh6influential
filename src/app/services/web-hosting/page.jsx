'use client';

import Link from "next/link";
import FAQ from '@/components/FAQ';
import '@/styles/Services.css';

export default function WebHostingService() {
  const faqs = [
    {
      question: "What hosting services do you provide?",
      answer: (
        <div>
          <p>Our comprehensive hosting services include:</p>
          <ul>
            <li><strong>Managed Web Hosting:</strong> Reliable server space with optimized performance</li>
            <li><strong>Domain Registration & Management:</strong> Annual domain registration and DNS management</li>
            <li><strong>SSL Certificates & Security:</strong> Free SSL certificates and security monitoring</li>
            <li><strong>Automated Daily Backups:</strong> Daily backups with easy restoration options</li>
            <li><strong>Performance Monitoring:</strong> 24/7 uptime monitoring and optimization</li>
            <li><strong>Email Hosting:</strong> Professional email setup and management</li>
            <li><strong>CDN Integration:</strong> Global content delivery for faster loading</li>
            <li><strong>Technical Support:</strong> 24/7 support for hosting-related issues</li>
          </ul>
        </div>
      )
    },
    {
      question: "How does hosting billing work?",
      answer: (
        <div>
          <p>Our hosting services are billed annually in advance:</p>
          <ul>
            <li><strong>Annual Billing:</strong> Hosting services are billed yearly in advance</li>
            <li><strong>Non-Refundable:</strong> Once hosting services begin, annual fees are non-refundable</li>
            <li><strong>Domain Management:</strong> Domains managed by HH6 are billed annually</li>
            <li><strong>Client-Managed Domains:</strong> You maintain responsibility for domains you manage</li>
            <li><strong>Migration Fees:</strong> Moving websites from our hosting incurs hourly migration fees</li>
          </ul>
          <p>All billing terms are clearly outlined in our hosting agreements.</p>
        </div>
      )
    },
    {
      question: "What's included in managed hosting?",
      answer: (
        <div>
          <p>Our managed hosting includes comprehensive server management:</p>
          <ul>
            <li><strong>Server Maintenance:</strong> Regular updates and security patches</li>
            <li><strong>Performance Optimization:</strong> Server tuning for optimal website speed</li>
            <li><strong>Security Monitoring:</strong> 24/7 security monitoring and threat detection</li>
            <li><strong>Backup Management:</strong> Automated daily backups with retention policies</li>
            <li><strong>Uptime Monitoring:</strong> Continuous monitoring with instant alerts</li>
            <li><strong>Technical Support:</strong> Expert support for hosting-related issues</li>
          </ul>
          <p>We handle all technical aspects so you can focus on your business.</p>
        </div>
      )
    },
    {
      question: "Can I migrate my existing website?",
      answer: (
        <div>
          <p>Yes, we provide website migration services:</p>
          <ul>
            <li><strong>Free Migration:</strong> Basic website migration is included with new hosting</li>
            <li><strong>Complex Migrations:</strong> Advanced migrations are billed at our hourly rate</li>
            <li><strong>Data Transfer:</strong> Complete transfer of files, databases, and email</li>
            <li><strong>DNS Updates:</strong> Domain name system configuration and updates</li>
            <li><strong>Testing:</strong> Thorough testing to ensure everything works correctly</li>
            <li><strong>Support:</strong> Assistance throughout the migration process</li>
          </ul>
          <p>Migration timelines vary based on website complexity and are quoted in advance.</p>
        </div>
      )
    },
    {
      question: "What about email hosting?",
      answer: (
        <div>
          <p>We provide professional email hosting services:</p>
          <ul>
            <li><strong>Email Setup:</strong> Professional email addresses using your domain</li>
            <li><strong>Webmail Access:</strong> Access email from any device via web browser</li>
            <li><strong>Mobile Configuration:</strong> Setup for mobile devices and email clients</li>
            <li><strong>Spam Protection:</strong> Advanced spam filtering and security</li>
            <li><strong>Storage:</strong> Generous email storage with upgrade options</li>
            <li><strong>Support:</strong> Technical support for email configuration and issues</li>
          </ul>
          <p>Email hosting is included with all hosting packages at no additional cost.</p>
        </div>
      )
    },
    {
      question: "How do I cancel hosting services?",
      answer: (
        <div>
          <p>Hosting cancellation follows our terms of service:</p>
          <ul>
            <li><strong>30-Day Notice:</strong> Hosting services may be canceled with 30 days' notice</li>
            <li><strong>Annual Fees:</strong> Annual hosting fees are non-refundable after service begins</li>
            <li><strong>Data Export:</strong> We provide assistance with data export before cancellation</li>
            <li><strong>Domain Transfer:</strong> Help with domain transfer if needed</li>
            <li><strong>Migration Support:</strong> Assistance with moving to another hosting provider</li>
          </ul>
          <p>All cancellation requests must be submitted in writing to ensure proper processing.</p>
        </div>
      )
    }
  ];

  const technologies = ["cPanel", "WordPress Hosting", "Cloud Hosting", "AWS", "Cloudflare"];

  const hostingPlans = [
    {
      name: "Starter",
      price: "$29/month",
      description: "Perfect for small business websites",
      features: [
        "5GB Storage",
        "50GB Bandwidth",
        "1 Domain",
        "5 Email Accounts",
        "SSL Certificate",
        "Daily Backups",
        "24/7 Support"
      ]
    },
    {
      name: "Professional",
      price: "$59/month",
      description: "Ideal for growing businesses",
      features: [
        "25GB Storage",
        "250GB Bandwidth",
        "5 Domains",
        "25 Email Accounts",
        "SSL Certificate",
        "Daily Backups",
        "CDN Integration",
        "Priority Support"
      ]
    },
    {
      name: "Enterprise",
      price: "$99/month",
      description: "Complete hosting solution",
      features: [
        "100GB Storage",
        "Unlimited Bandwidth",
        "Unlimited Domains",
        "Unlimited Email Accounts",
        "SSL Certificate",
        "Daily Backups",
        "CDN Integration",
        "Dedicated Support",
        "Performance Monitoring"
      ]
    }
  ];

  const benefits = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      title: "Reliability",
      description: "99.9% uptime guarantee with redundant systems and monitoring"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
        </svg>
      ),
      title: "Security",
      description: "Advanced security measures including SSL certificates and regular updates"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
        </svg>
      ),
      title: "Performance",
      description: "Fast loading times with CDN integration and optimized servers"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      title: "Support",
      description: "24/7 technical support from experienced hosting professionals"
    }
  ];

  return (
    <div className="page-container">
      <section className="service-hero">
        <div className="service-hero-content">
          <div className="service-breadcrumb">
            <Link href="/services">Services</Link>
            <span>/</span>
            <span>Web Hosting & Infrastructure</span>
          </div>
          <h1>Web Hosting & Infrastructure</h1>
          <p className="lead">
            Reliable web hosting with 24/7 technical support
          </p>
          <div className="service-hero-actions">
            <Link href="/contact" className="cta-button primary">
              Get Hosting
            </Link>
            <Link href="/portfolio" className="cta-button secondary">
              View Our Work
            </Link>
          </div>
        </div>
        <div className="service-hero-image">
          <img src="/assets/images/web-hosting.jpg" alt="Web Hosting & Infrastructure" />
        </div>
      </section>

      <section className="service-overview">
        <div className="service-overview-content">
          <h2>What We Do</h2>
          <p>
            We provide managed hosting, domain registration, SSL certificates, automated backups, and performance monitoring to ensure your online presence is always available. 
            Our hosting solutions are optimized for speed, security, and reliability with scalable options for growing businesses.
          </p>
        </div>
      </section>

      <FAQ faqs={faqs} title="Web Hosting & Infrastructure FAQ" />


      <section className="service-technologies">
        <div className="service-technologies-content">
          <h2>Hosting Technologies</h2>
          <div className="tech-tags">
            {technologies.map((tech, index) => (
              <span key={index} className="tech-tag">{tech}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="service-cta">
        <div className="cta-content">
          <h2>Ready to Get Reliable Hosting?</h2>
          <p>Let's set up hosting that keeps your website fast, secure, and always available.</p>
          <div className="cta-actions">
            <Link href="/contact" className="cta-button primary">
              Get Started
            </Link>
            <Link href="/services" className="cta-button secondary">
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
