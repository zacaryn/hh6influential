'use client';

import { useState } from 'react';

export default function TeamGrid({ teamMembers }) {
  const [expandedCards, setExpandedCards] = useState({});

  const toggleDescription = (index) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
      {teamMembers.map((member, index) => (
        <div key={index} className="team-card" style={{ border: '1px solid #eaeaea', borderRadius: 12, overflow: 'hidden' }}>
          <div className="team-image-wrapper" style={{ position: 'relative' }}>
            <img src={member.image} alt={member.name} className="team-image" style={{ width: '100%', height: 200, objectFit: 'cover' }} />
            <div className="team-image-overlay" style={{ position: 'absolute', top: 8, right: 8 }}>
              <span className="role-tag" style={{ background: 'rgba(0,42,110,0.9)', color: 'white', padding: '4px 8px', borderRadius: 4, fontSize: '0.8rem' }}>{member.role}</span>
            </div>
          </div>
          <div className="team-content" style={{ padding: 16 }}>
            <h3 style={{ margin: '0 0 8px' }}>{member.name}</h3>
            <div className="skill-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 12 }}>
              {member.tags.map((tag, i) => (
                <span key={i} className="skill-tag" style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: 3, fontSize: '0.75rem' }}>{tag}</span>
              ))}
            </div>
            <div className={`team-description ${expandedCards[index] ? '' : 'collapsed'}`} style={{ 
              maxHeight: expandedCards[index] ? 'none' : '60px', 
              overflow: 'hidden',
              marginBottom: 12
            }}>
              <p style={{ margin: 0 }}>{member.description}</p>
            </div>
            {member.description.length > 100 && (
              <button 
                className="read-more-btn"
                onClick={() => toggleDescription(index)}
                style={{ background: 'none', border: 'none', color: '#002a6e', cursor: 'pointer', fontSize: '0.9rem' }}
              >
                {expandedCards[index] ? 'Read Less' : 'Read More'}
              </button>
            )}
            <div className="social-links" style={{ marginTop: 12 }}>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin-link" style={{ color: '#0077b5', textDecoration: 'none', fontSize: '0.9rem' }}>
                <span className="linkedin-icon">in</span> LinkedIn Profile
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
