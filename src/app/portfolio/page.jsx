import Link from "next/link";

export default function Portfolio() {
  const featuredClients = [
    {
      name: "Bluebird Mortgage",
      type: "Mortgage Brokerage",
      location: "Colorado Springs, CO",
      description: "Professional mortgage brokerage website featuring loan calculators, client testimonials, and specialized programs for VA, FHA, and conventional loans. Streamlined the mortgage application process for Colorado Springs homebuyers.",
      image: "/assets/images/bluebirdwebsite.jpg",
      website: "https://bluebirdmortgage.com/",
      services: ["Website Development", "Loan Calculator Integration", "Client Portal", "SEO Optimization"]
    },
    {
      name: "Dan Weihmiller Real Estate",
      type: "Real Estate Professional", 
      location: "Colorado Springs, CO",
      description: "Custom real estate website for an eXp Realty agent featuring property listings integration, neighborhood guides, market insights, and lead generation systems to establish credibility in the Colorado Springs market.",
      image: "/assets/images/danswebsite.jpg",
      website: "https://danweihmiller.com/",
      services: ["Website Development", "Property Integration", "Lead Generation", "Market Analytics"]
    },
    {
      name: "Georgia National Guard Family Support Foundation",
      type: "Non-Profit Organization",
      location: "Marietta, GA", 
      description: "Comprehensive digital solution for a 501(c)(3) non-profit supporting Georgia National Guard families since 1994. Built custom database systems, donation platforms, and event management tools.",
      image: "/assets/images/guardwebsite.jpg",
      website: "https://georgiaguardfamily.org/",
      services: ["Website Development", "Database Systems", "Donation Platform", "Event Management"]
    }
  ];

  return (
    <div className="page-container">
      <section className="page-hero">
        <div className="page-hero-content">
          <h1>Featured Client Work</h1>
          <p className="lead">
            Professional digital solutions that drive real results for our clients nationwide.
          </p>
        </div>
      </section>

      {featuredClients.map((client, index) => (
        <div key={index} className="client-showcase-card">
          <div className="client-image-wrapper">
            <img 
              src={client.image} 
              alt={`${client.name} website`}
              className="client-website-image"
            />
          </div>
          
          <div className="client-details">
            <div className="client-meta">
              <span className="client-type">{client.type}</span>
              <span className="client-location">{client.location}</span>
            </div>
            
            <h2 className="client-name">{client.name}</h2>
            <p className="client-description">{client.description}</p>
            
            <a 
              href={client.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="visit-website-btn"
            >
              Visit Website →
            </a>
          </div>
        </div>
      ))}

      <section className="portfolio-cta">
        <div className="cta-content">
          <h2>Ready to Start Your Project?</h2>
          <p>Let's work together to create something amazing for your organization.</p>
          <Link href="/contact" className="cta-button">Get in Touch</Link>
        </div>
      </section>
    </div>
  );
}