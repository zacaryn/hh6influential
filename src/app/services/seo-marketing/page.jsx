'use client';

import Link from "next/link";
import FAQ from '@/components/FAQ';
import '@/styles/Services.css';

export default function SEOMarketingService() {
  const faqs = [
    {
      question: "What SEO and marketing services do you provide?",
      answer: (
        <div>
          <p>Our comprehensive SEO and digital marketing services include:</p>
          <ul>
            <li><strong>SEO Keyword Research & Optimization:</strong> Strategic keyword targeting and on-page optimization</li>
            <li><strong>Google Ads Campaign Management:</strong> Paid search campaigns to drive qualified traffic</li>
            <li><strong>Meta Advertising:</strong> Facebook and Instagram ad campaigns for social media marketing</li>
            <li><strong>Local SEO & Google My Business:</strong> Local search optimization and Google My Business management</li>
            <li><strong>Analytics & Performance Tracking:</strong> Detailed reporting and performance analysis</li>
            <li><strong>Conversion Rate Optimization:</strong> Improving website performance and user experience</li>
            <li><strong>Content Marketing Strategy:</strong> SEO-optimized content that ranks and converts</li>
            <li><strong>Competitor Analysis:</strong> Research and analysis of competitor strategies</li>
          </ul>
        </div>
      )
    },
    {
      question: "How do you measure SEO success?",
      answer: (
        <div>
          <p>We track comprehensive metrics to measure your SEO success:</p>
          <ul>
            <li><strong>Keyword Rankings:</strong> Position tracking for target keywords</li>
            <li><strong>Organic Traffic:</strong> Growth in search engine traffic</li>
            <li><strong>Conversion Rates:</strong> Visitor-to-customer conversion improvements</li>
            <li><strong>Click-Through Rates:</strong> CTR improvements in search results</li>
            <li><strong>Domain Authority:</strong> Overall website authority and trust metrics</li>
            <li><strong>Local Visibility:</strong> Google My Business performance and local rankings</li>
            <li><strong>Revenue Attribution:</strong> Direct revenue from SEO efforts</li>
          </ul>
          <p>We provide monthly reports with detailed analytics and actionable insights for improvement.</p>
        </div>
      )
    },
    {
      question: "How long does SEO take to show results?",
      answer: (
        <div>
          <p>SEO is a long-term strategy with varying timelines:</p>
          <ul>
            <li><strong>Technical Issues:</strong> 2-4 weeks for technical SEO fixes</li>
            <li><strong>Content Optimization:</strong> 1-3 months for content-based improvements</li>
            <li><strong>Keyword Rankings:</strong> 3-6 months for significant ranking improvements</li>
            <li><strong>Traffic Growth:</strong> 4-8 months for substantial organic traffic increases</li>
            <li><strong>Local SEO:</strong> 2-4 months for local search visibility improvements</li>
            <li><strong>Long-term Growth:</strong> 6-12 months for comprehensive SEO results</li>
          </ul>
          <p>Results vary based on competition, website age, and current SEO status. We provide realistic timelines in our proposals.</p>
        </div>
      )
    },
    {
      question: "What's included in your Google Ads management?",
      answer: (
        <div>
          <p>Our Google Ads management includes comprehensive campaign optimization:</p>
          <ul>
            <li><strong>Campaign Setup:</strong> Strategic campaign structure and targeting</li>
            <li><strong>Keyword Research:</strong> High-converting keyword identification and bidding</li>
            <li><strong>Ad Creation:</strong> Compelling ad copy and creative development</li>
            <li><strong>Bid Management:</strong> Optimized bidding strategies for maximum ROI</li>
            <li><strong>Landing Page Optimization:</strong> Conversion-focused landing page improvements</li>
            <li><strong>Performance Monitoring:</strong> Daily monitoring and optimization</li>
            <li><strong>Budget Management:</strong> Efficient budget allocation across campaigns</li>
          </ul>
          <p>All Google Ads work is included in our retainer packages with detailed monthly reporting.</p>
        </div>
      )
    },
    {
      question: "Do you provide content creation services?",
      answer: (
        <div>
          <p>Yes, we offer comprehensive content creation services:</p>
          <ul>
            <li><strong>Blog Posts:</strong> SEO-optimized articles that rank and engage</li>
            <li><strong>Website Content:</strong> Service pages, about pages, and landing pages</li>
            <li><strong>Meta Descriptions:</strong> Compelling meta descriptions for better CTR</li>
            <li><strong>Title Tags:</strong> Optimized title tags for search engines</li>
            <li><strong>Local Content:</strong> Location-specific content for local SEO</li>
            <li><strong>Content Strategy:</strong> Editorial calendars and content planning</li>
          </ul>
          <p>All content is created with SEO best practices and is included in our service packages.</p>
        </div>
      )
    },
    {
      question: "How do you handle reporting and communication?",
      answer: (
        <div>
          <p>We provide comprehensive reporting and regular communication:</p>
          <ul>
            <li><strong>Monthly Reports:</strong> Detailed performance reports with insights and recommendations</li>
            <li><strong>Dashboard Access:</strong> Real-time access to key performance metrics</li>
            <li><strong>Regular Check-ins:</strong> Scheduled calls to discuss progress and strategy</li>
            <li><strong>Quick Updates:</strong> Immediate notification of significant changes or issues</li>
            <li><strong>Strategy Reviews:</strong> Quarterly strategy reviews and adjustments</li>
            <li><strong>Transparent Communication:</strong> Clear explanations of all activities and results</li>
          </ul>
          <p>We believe in transparent communication and keep you informed of all our activities and results.</p>
        </div>
      )
    }
  ];

  const technologies = ["Google Ads", "Facebook Ads Manager", "Google Analytics", "SEMrush", "Ahrefs"];

  const seoServices = [
    {
      category: "Technical SEO",
      description: "Optimize your website's technical foundation for better search rankings",
      services: [
        "Site speed optimization",
        "Mobile responsiveness",
        "Schema markup implementation",
        "XML sitemap creation",
        "Robots.txt optimization",
        "Canonical URL management"
      ]
    },
    {
      category: "Local SEO",
      description: "Improve your visibility in local search results",
      services: [
        "Google My Business optimization",
        "Local citation building",
        "Location-based keyword targeting",
        "Local content creation",
        "Review management",
        "Local link building"
      ]
    },
    {
      category: "Content SEO",
      description: "Create content that ranks and converts",
      services: [
        "Keyword research and strategy",
        "Content planning and creation",
        "On-page optimization",
        "Internal linking strategy",
        "Content performance analysis",
        "Competitor content analysis"
      ]
    },
    {
      category: "Link Building",
      description: "Build authoritative backlinks to improve domain authority",
      services: [
        "Link prospecting and outreach",
        "Guest posting campaigns",
        "Resource page submissions",
        "Broken link building",
        "Local directory submissions",
        "Link quality analysis"
      ]
    }
  ];

  const adServices = [
    {
      platform: "Google Ads",
      description: "Search and display advertising on Google's network",
      features: [
        "Search campaign setup and management",
        "Display network advertising",
        "Shopping campaigns",
        "YouTube advertising",
        "Performance tracking and optimization",
        "A/B testing and conversion optimization"
      ]
    },
    {
      platform: "Meta Advertising",
      description: "Facebook and Instagram advertising campaigns",
      features: [
        "Facebook and Instagram ad creation",
        "Audience targeting and segmentation",
        "Lookalike audience development",
        "Retargeting campaigns",
        "Video and carousel ads",
        "Performance analytics and reporting"
      ]
    },
    {
      platform: "LinkedIn Advertising",
      description: "Professional B2B advertising on LinkedIn",
      features: [
        "Sponsored content campaigns",
        "LinkedIn lead generation",
        "Sponsored InMail campaigns",
        "Account-based marketing",
        "Professional audience targeting",
        "B2B conversion optimization"
      ]
    }
  ];

  const servicePackages = [
    {
      name: "SEO Starter",
      price: "$800/month",
      description: "Essential SEO for small businesses",
      features: [
        "Monthly keyword research",
        "On-page optimization",
        "Google My Business setup",
        "Monthly reporting",
        "Basic link building",
        "Email support"
      ]
    },
    {
      name: "SEO Professional",
      price: "$1,500/month",
      description: "Comprehensive SEO for growing businesses",
      features: [
        "Weekly keyword research",
        "Technical SEO audit",
        "Content strategy and creation",
        "Advanced link building",
        "Competitor analysis",
        "Monthly strategy calls",
        "Priority support"
      ]
    },
    {
      name: "Full Digital Marketing",
      price: "$2,500/month",
      description: "Complete SEO and advertising management",
      features: [
        "All SEO Professional features",
        "Google Ads management",
        "Social media advertising",
        "Conversion rate optimization",
        "Advanced analytics",
        "Dedicated account manager",
        "Weekly strategy calls"
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
            <span>SEO & Digital Marketing</span>
          </div>
          <h1>SEO & Digital Marketing</h1>
          <p className="lead">
            Strategic SEO optimization and digital advertising management
          </p>
          <div className="service-hero-actions">
            <Link href="/contact" className="cta-button primary">
              Get Started
            </Link>
            <Link href="/portfolio" className="cta-button secondary">
              View Results
            </Link>
          </div>
        </div>
        <div className="service-hero-image">
          <img src="/assets/images/seo-marketing.jpg" alt="SEO & Digital Marketing" />
        </div>
      </section>

      <section className="service-overview">
        <div className="service-overview-content">
          <h2>What We Do</h2>
          <p>
            We increase your online visibility and drive qualified traffic through strategic SEO optimization and digital advertising management. 
            Our services include Google Ads, Meta advertising campaigns, keyword optimization, and detailed analytics to maximize your return on investment.
          </p>
        </div>
      </section>

      <FAQ faqs={faqs} title="SEO & Digital Marketing FAQ" />

      <section className="service-categories">
        <div className="service-categories-content">
          <h2>SEO Services</h2>
          <div className="categories-grid">
            {seoServices.map((category, index) => (
              <div key={index} className="category-card">
                <h3>{category.category}</h3>
                <p>{category.description}</p>
                <div className="category-services">
                  <h4>Services Include:</h4>
                  <ul>
                    {category.services.map((service, i) => (
                      <li key={i}>{service}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="service-advertising">
        <div className="service-advertising-content">
          <h2>Digital Advertising Services</h2>
          <div className="ad-platforms">
            {adServices.map((platform, index) => (
              <div key={index} className="ad-platform">
                <h3>{platform.platform}</h3>
                <p>{platform.description}</p>
                <div className="platform-features">
                  <ul>
                    {platform.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
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
          <h2>Tools & Platforms</h2>
          <div className="tech-tags">
            {technologies.map((tech, index) => (
              <span key={index} className="tech-tag">{tech}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="service-cta">
        <div className="cta-content">
          <h2>Ready to Increase Your Online Visibility?</h2>
          <p>Let's create a comprehensive SEO and digital marketing strategy that drives qualified traffic and converts visitors into customers.</p>
          <div className="cta-actions">
            <Link href="/contact" className="cta-button primary">
              Start Your Campaign
            </Link>
            <Link href="/portfolio" className="cta-button secondary">
              See Our Results
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
