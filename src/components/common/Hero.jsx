import React from 'react';
import './Hero.css';

function Hero({ title, description, className = '' }) {
  return (
    <section className={`hero-section ${className}`}>
      <h1>{title}</h1>
      {description && <p className="lead">{description}</p>}
    </section>
  );
}

export default Hero; 