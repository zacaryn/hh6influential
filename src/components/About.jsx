import React, { useState } from "react";
import "./../styles/About.css"; // Page-specific styles
import Seo from '../components/Seo';
import { ROUTE_TITLE_RULES, ROUTE_DESCRIPTIONS, PRIMARY_DOMAIN } from '../components/seoConfig';
import { BreadcrumbSchema } from '../components/Schema';

function About() {
  const [expandedCards, setExpandedCards] = useState({});

  const toggleDescription = (index) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  const teamMembers = [
    {
      name: "Tim Head",
      role: "Co-Founder",
      tags: ["Army Veteran", "Leadership", "Strategic Planning"],
      description: "Retired Lieutenant Colonel in the Army, later joining the Georgia National Guard. His experience and leadership inspire our commitment to helping veterans and families.",
      image: "/assets/images/ltc_head.png",
      linkedin: "https://www.linkedin.com/in/timothyahead/"
    },
    {
      name: "Zach Head",
      role: "Lead Developer",
      tags: ["Full Stack Development", "Frontend & Backend", "React"],
      description: "Lead full-stack developer with expertise in both frontend and backend technologies. Specializes in creating seamless user experiences while building robust server-side architectures.",
      image: "/assets/images/zachary.jpg",
      linkedin: "https://www.linkedin.com/in/zachwhead/"
    },
    {
      name: "Max Head",
      role: "Sys Admin & Developer",
      tags: ["System Administration", "Backend Development", "Infrastructure"],
      description: "Systems administrator and backend developer focused on server infrastructure, database optimization, and ensuring reliable, scalable backend solutions for our applications.",
      image: "/assets/images/maxwell.jpg",
      linkedin: "https://www.linkedin.com/in/maxwell-head-61933a2b2/"
    },
    {
      name: "Leslie Head",
      role: "Co-Founder & Creative Director",
      tags: ["Creative Direction", "Brand Strategy", "Business Development"],
      description: "With expertise in graphic design and media, ensures creative excellence in all our work as co-founder and creative director.",
      image: "/assets/images/leslie.png",
      linkedin: "https://www.linkedin.com/in/leslieannhead/"
    }
  ];

  return (
    <>
      <Seo
        title={ROUTE_TITLE_RULES.about}
        description={ROUTE_DESCRIPTIONS.about}
        path="/about"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${PRIMARY_DOMAIN}/` },
          { name: 'About', url: `${PRIMARY_DOMAIN}/about` }
        ]}
      />
      <div className="page-container">
        <section className="about-hero">
          <h1>Meet Our Team</h1>
          <p className="lead">
            A diverse group of professionals dedicated to delivering exceptional digital solutions.
          </p>
        </section>

        <section className="team-section">
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-image-wrapper">
                  <img src={member.image} alt={member.name} className="team-image" />
                  <div className="team-image-overlay">
                    <span className="role-tag">{member.role}</span>
                  </div>
                </div>
                <div className="team-content">
                  <h3>{member.name}</h3>
                  <div className="skill-tags">
                    {member.tags.map((tag, i) => (
                      <span key={i} className="skill-tag">{tag}</span>
                    ))}
                  </div>
                  <div className={`team-description ${expandedCards[index] ? '' : 'collapsed'}`}>
                    <p>{member.description}</p>
                  </div>
                  {member.description.length > 100 && (
                    <button 
                      className="read-more-btn"
                      onClick={() => toggleDescription(index)}
                    >
                      {expandedCards[index] ? 'Read Less' : 'Read More'}
                    </button>
                  )}
                  <div className="social-links">
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin-link">
                      <span className="linkedin-icon">in</span>
                      LinkedIn Profile
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="about-cta">
          <div className="cta-content">
            <h2>Join Our Journey</h2>
            <p>Ready to transform your digital presence? Let's create something amazing together.</p>
            <a href="/contact" className="cta-button">Get in Touch</a>
          </div>
        </section>
      </div>
    </>
  );
}

export default About;