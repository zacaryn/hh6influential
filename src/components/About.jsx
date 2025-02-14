import React from "react";
import "./../styles/About.css"; // Page-specific styles
import PageHead from './common/PageHead';

function About() {
  const teamMembers = [
    {
      name: "Tim Head",
      role: "Founder",
      tags: ["Army Veteran", "Leadership", "Strategic Planning"],
      description: "Retired Lieutenant Colonel in the Army, later joining the Georgia National Guard. His experience and leadership inspire our commitment to helping veterans and families.",
      image: "/assets/images/ltc_head.png",
      linkedin: "https://www.linkedin.com/in/timothyahead/"
    },
    {
      name: "Zach and Max",
      role: "Development Team",
      tags: ["Web Development", "UI/UX Design", "Full Stack"],
      description: "The next-generation developers, passionate about technology and creating innovative solutions for our clients.",
      image: "/assets/images/zachary_maxwell.jpg",
      linkedin: ["https://www.linkedin.com/in/zachwhead/", "https://www.linkedin.com/in/maxwell-head-61933a2b2/"]
    },
    {
      name: "Leslie",
      role: "Co-Founder & Creative Director",
      tags: ["Creative Direction", "Brand Strategy", "Business Development"],
      description: "With expertise in graphic design and media, ensures creative excellence in all our work as co-founder and creative director.",
      image: "/assets/images/leslie.png",
      linkedin: "https://www.linkedin.com/in/leslieannhead/"
    }
  ];

  return (
    <>
      <PageHead title="About Us" />
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
                  <p>{member.description}</p>
                  <div className="social-links">
                    {Array.isArray(member.linkedin) ? (
                      <div className="dual-links">
                        <a href={member.linkedin[0]} target="_blank" rel="noopener noreferrer" className="linkedin-link">
                          <span className="linkedin-icon">in</span>
                          Zach
                        </a>
                        <span className="link-separator">|</span>
                        <a href={member.linkedin[1]} target="_blank" rel="noopener noreferrer" className="linkedin-link">
                          <span className="linkedin-icon">in</span>
                          Max
                        </a>
                      </div>
                    ) : (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin-link">
                        <span className="linkedin-icon">in</span>
                        LinkedIn Profile
                      </a>
                    )}
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