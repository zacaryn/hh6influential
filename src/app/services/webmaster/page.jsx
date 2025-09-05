'use client';

import Link from "next/link";
import FAQ from '@/components/FAQ';
import '@/styles/Services.css';

export default function WebmasterService() {
  const faqs = [
    {
      question: "What webmaster services do you provide?",
      answer: (
        <div>
          <p>Our comprehensive webmaster services include:</p>
          <ul>
            <li><strong>Website Maintenance & Updates:</strong> Regular updates to keep your site current and secure</li>
            <li><strong>Security Monitoring & Patches:</strong> 24/7 security monitoring and immediate threat response</li>
            <li><strong>Server Management:</strong> Server optimization and performance tuning</li>
            <li><strong>Database Management:</strong> Database optimization and cleanup</li>
            <li><strong>Plugin & Software Updates:</strong> Regular updates to all website components</li>
            <li><strong>Performance Monitoring:</strong> Continuous monitoring of site speed and uptime</li>
            <li><strong>Backup Management:</strong> Automated daily backups with easy restoration</li>
            <li><strong>Technical Support:</strong> Expert troubleshooting and issue resolution</li>
          </ul>
        </div>
      )
    },
    {
      question: "How does webmaster billing work?",
      answer: (
        <div>
          <p>Our webmaster services are billed in advance:</p>
          <ul>
            <li><strong>Monthly Retainers:</strong> Ongoing maintenance packages billed monthly in advance</li>
            <li><strong>Non-Refundable:</strong> Retainer fees are non-refundable once active</li>
            <li><strong>Hourly Billing:</strong> Additional work outside retainer scope is billed hourly</li>
            <li><strong>Scope Definition:</strong> All services clearly defined in written agreements</li>
            <li><strong>Payment Terms:</strong> Monthly billing with 15-day payment terms</li>
          </ul>
          <p>All billing terms are outlined in our service agreements to avoid confusion.</p>
        </div>
      )
    },
    {
      question: "What's included in website maintenance?",
      answer: (
        <div>
          <p>Our maintenance packages include comprehensive website care:</p>
          <ul>
            <li><strong>Software Updates:</strong> Regular updates to WordPress, plugins, and themes</li>
            <li><strong>Security Patches:</strong> Immediate application of security updates</li>
            <li><strong>Performance Monitoring:</strong> Continuous monitoring of site speed and uptime</li>
            <li><strong>Backup Management:</strong> Daily automated backups with retention policies</li>
            <li><strong>Content Updates:</strong> Minor text changes and image updates</li>
            <li><strong>Technical Support:</strong> Quick response to technical issues</li>
          </ul>
          <p>We handle all routine maintenance so your website stays secure and up-to-date.</p>
        </div>
      )
    },
    {
      question: "How quickly do you respond to issues?",
      answer: (
        <div>
          <p>We provide rapid response to website issues:</p>
          <ul>
            <li><strong>Critical Issues:</strong> Response within 2 hours for site-down situations</li>
            <li><strong>Security Issues:</strong> Immediate response to security threats</li>
            <li><strong>General Issues:</strong> Response within 24 hours for non-critical problems</li>
            <li><strong>Maintenance Windows:</strong> Scheduled maintenance during low-traffic periods</li>
            <li><strong>Emergency Support:</strong> 24/7 emergency support for critical issues</li>
          </ul>
          <p>Response times are guaranteed in our service level agreements.</p>
        </div>
      )
    },
    {
      question: "Can you help with website migrations?",
      answer: (
        <div>
          <p>Yes, we provide comprehensive website migration services:</p>
          <ul>
            <li><strong>Host Migration:</strong> Moving websites between hosting providers</li>
            <li><strong>Platform Migration:</strong> Converting between different content management systems</li>
            <li><strong>Data Transfer:</strong> Complete transfer of files, databases, and content</li>
            <li><strong>DNS Updates:</strong> Domain configuration and DNS management</li>
            <li><strong>Testing:</strong> Thorough testing to ensure everything works correctly</li>
            <li><strong>Support:</strong> Assistance throughout the migration process</li>
          </ul>
          <p>Migration services are billed hourly and quoted in advance based on complexity.</p>
        </div>
      )
    },
    {
      question: "What about emergency situations?",
      answer: (
        <div>
          <p>We provide comprehensive emergency support:</p>
          <ul>
            <li><strong>Site Recovery:</strong> Rapid restoration from backups if needed</li>
            <li><strong>Security Breaches:</strong> Immediate response to security incidents</li>
            <li><strong>Performance Issues:</strong> Quick diagnosis and resolution of speed problems</li>
            <li><strong>Plugin Conflicts:</strong> Rapid resolution of plugin or theme conflicts</li>
            <li><strong>Database Issues:</strong> Expert database repair and optimization</li>
            <li><strong>Communication:</strong> Regular updates during emergency resolution</li>
          </ul>
          <p>Emergency support is included with all maintenance packages at no additional cost.</p>
        </div>
      )
    }
  ];

  const technologies = ["Linux", "Windows Server", "MySQL", "PHP", "WordPress", "cPanel"];

  const maintenanceTasks = [
    {
      category: "Security",
      tasks: [
        "Regular security scans and vulnerability assessments",
        "SSL certificate monitoring and renewal",
        "Firewall configuration and monitoring",
        "Malware detection and removal",
        "Security patch installation"
      ]
    },
    {
      category: "Performance",
      tasks: [
        "Website speed optimization",
        "Database optimization and cleanup",
        "CDN configuration and monitoring",
        "Image optimization and compression",
        "Caching implementation and tuning"
      ]
    },
    {
      category: "Updates",
      tasks: [
        "WordPress core and plugin updates",
        "Theme updates and compatibility checks",
        "Server software updates",
        "Third-party integration updates",
        "Browser compatibility testing"
      ]
    },
    {
      category: "Monitoring",
      tasks: [
        "Uptime monitoring and alerts",
        "Performance metrics tracking",
        "Error log analysis and resolution",
        "Traffic analysis and reporting",
        "Backup verification and testing"
      ]
    }
  ];

  const serviceLevels = [
    {
      name: "Basic Maintenance",
      price: "$99/month",
      description: "Essential maintenance for small websites",
      features: [
        "Monthly security updates",
        "Plugin updates",
        "Basic performance monitoring",
        "Email support",
        "Monthly backup verification"
      ]
    },
    {
      name: "Professional Maintenance",
      price: "$199/month",
      description: "Comprehensive maintenance for business websites",
      features: [
        "Weekly security updates",
        "Performance optimization",
        "Uptime monitoring",
        "Priority support",
        "Daily backups",
        "Monthly reports"
      ]
    },
    {
      name: "Enterprise Maintenance",
      price: "$399/month",
      description: "Full-service maintenance for high-traffic sites",
      features: [
        "Daily security monitoring",
        "Real-time performance optimization",
        "24/7 monitoring and alerts",
        "Dedicated support",
        "Multiple daily backups",
        "Weekly detailed reports",
        "Emergency response"
      ]
    }
  ];

  return (
    <div className="page-container">
      <section className="service-hero">
        <div className="service-hero-content">
          <div className="service-breadcrumb">
            <Link href="/services">Services</Link>
            <span>/</span>
            <span>Webmaster & System Administration</span>
          </div>
          <h1>Webmaster & System Administration</h1>
          <p className="lead">
            Complete website management and system administration
          </p>
          <div className="service-hero-actions">
            <Link href="/contact" className="cta-button primary">
              Get Maintenance
            </Link>
            <Link href="/portfolio" className="cta-button secondary">
              View Our Work
            </Link>
          </div>
        </div>
        <div className="service-hero-image">
          <img src="/assets/images/sys-admin.jpg" alt="Webmaster & System Administration" />
        </div>
      </section>

      <section className="service-overview">
        <div className="service-overview-content">
          <h2>What We Do</h2>
          <p>
            We handle everything from routine updates and security monitoring to technical support and system optimization, so you can focus on your business. 
            Our webmaster services ensure your website stays current, secure, and performing at its best.
          </p>
        </div>
      </section>

      <FAQ faqs={faqs} title="Webmaster & System Administration FAQ" />

      <section className="service-tasks">
        <div className="service-tasks-content">
          <h2>Maintenance Tasks by Category</h2>
          <div className="tasks-grid">
            {maintenanceTasks.map((category, index) => (
              <div key={index} className="task-category">
                <h3>{category.category}</h3>
                <ul>
                  {category.tasks.map((task, i) => (
                    <li key={i}>{task}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="service-technologies">
        <div className="service-technologies-content">
          <h2>Technical Expertise</h2>
          <div className="tech-tags">
            {technologies.map((tech, index) => (
              <span key={index} className="tech-tag">{tech}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="service-cta">
        <div className="cta-content">
          <h2>Ready to Keep Your Website Running Smoothly?</h2>
          <p>Let's set up comprehensive maintenance that keeps your website secure, fast, and always available.</p>
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
