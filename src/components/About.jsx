import React from "react";
import "./../styles/About.css"; // Page-specific styles

function About() {
  const teamMembers = [
    {
      name: "Tim Head",
      role: "Founder",
      description: "Retired Lieutenant Colonel in the Army, later joining the Georgia National Guard. His experience and leadership inspire our commitment to helping veterans and families.",
      image: "/assets/images/ltc_head.png",
      image2: "/assets/images/ltc_head2.jpg"
    },
    {
      name: "Zach and Max",
      role: "Development Team",
      description: "The next-generation developers, passionate about technology and creating innovative solutions for our clients.",
      image: "/assets/images/zachary_maxwell.jpg"
    },
    {
      name: "Leslie",
      role: "Creative Director",
      description: "With expertise in graphic design and media, ensures creative excellence in all our work.",
      image: "/assets/images/leslie.png" // Add this image if available
    }
  ];

  return (
    <div className="page-container">
      <section className="about-hero">
        <h1>About Us</h1>
        <p className="lead">
          We are a family-owned business with a strong veteran background, dedicated to delivering exceptional digital solutions.
        </p>
      </section>

      <section className="team-section">
        <h2>Meet the Team</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <div className="team-images">
                <img src={member.image} alt={member.name} className="team-image" />
                {member.image2 && (
                  <img src={member.image2} alt={member.name} className="team-image" />
                )}
              </div>
              <div className="team-content">
                <h3>{member.name}</h3>
                <h4>{member.role}</h4>
                <p>{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;