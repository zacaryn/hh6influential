// Centralized SEO configuration
export const BUSINESS_NAME = "HH6 Influential";
export const PRIMARY_DOMAIN = "https://hh6influential.com";
export const BRAND_TAGLINE = "Transform Your Digital Presence";
export const LOGO_URL = "https://hh6influential.com/assets/images/hh6logo.png";
export const CONTACT_EMAIL = "contact@hh6influential.com";
export const CONTACT_PHONE = "(678) 842-3469";

export const SAMEAS_PROFILES = [
  "https://www.linkedin.com/company/hh6-influential",
  "https://www.facebook.com/hh6influential",
  "https://x.com/hh6influential",
  "https://instagram.com/hh6influential",
  "https://www.youtube.com/@HH6Influential",
  "https://share.google/s9aXn0en8yYPH4WDD"
];

export const OPEN_GRAPH_DEFAULT_IMAGE = "https://hh6influential.com/assets/images/og-image.jpg";
export const TWITTER_HANDLE = "@HH6Influential";

export const ROUTE_TITLE_RULES = {
  home: `${BRAND_TAGLINE} | ${BUSINESS_NAME}`,
  services: `Custom Web Development | ${BUSINESS_NAME}`,
  webDesign: `Custom Website Design & Development | Veteran-Owned Agency | ${BUSINESS_NAME}`,
  socialMedia: `Social Media Management & Strategy | ${BUSINESS_NAME}`,
  videoEditing: `Video Creation & Editing Services | ${BUSINESS_NAME}`,
  graphicDesign: `Graphic Design & Marketing Materials | ${BUSINESS_NAME}`,
  webHosting: `Web Hosting & Infrastructure | ${BUSINESS_NAME}`,
  webmaster: `Webmaster & System Administration | ${BUSINESS_NAME}`,
  seoMarketing: `SEO & Digital Marketing | ${BUSINESS_NAME}`,
  seo: `SEO & Content Strategy | ${BUSINESS_NAME}`,
  about: `About Us | ${BUSINESS_NAME}`,
  contact: `Contact | ${BUSINESS_NAME}`,
  blog: `Blog | ${BUSINESS_NAME}`,
  blogPost: (postTitle) => `${postTitle} | ${BUSINESS_NAME}`,
  portfolio: `Portfolio | ${BUSINESS_NAME}`,
  notFound: `Page Not Found | ${BUSINESS_NAME}`
};

export const ROUTE_DESCRIPTIONS = {
  home: "Custom websites, SEO, and growth-focused strategy. Fast, modern sites that convert—without plugin bloat or hidden costs.",
  services: "Fast, modern, conversion-focused web development for growing businesses.",
  webDesign: "Professional, responsive websites that engage your audience and convert visitors into customers. From simple business sites to complex e-commerce platforms.",
  socialMedia: "Comprehensive social media strategy and management across all platforms. Content creation, posting schedules, community engagement, and analytics.",
  videoEditing: "Professional video content for promotions, ads, and social media. From concept to final cut, we produce compelling visual stories that resonate with your audience.",
  graphicDesign: "Eye-catching visual content and marketing materials. We design everything from flyers and brochures to social media graphics and brand identities.",
  webHosting: "Reliable web hosting with 24/7 technical support. Managed hosting, domain registration, SSL certificates, automated backups, and performance monitoring.",
  webmaster: "Complete website management and system administration. We handle everything from routine updates and security monitoring to technical support and optimization.",
  seoMarketing: "Strategic SEO optimization and digital advertising management. We increase your online visibility and drive qualified traffic to maximize your ROI.",
  seo: "Improve rankings and conversions with technical SEO, content, and structured data.",
  about: "Who we are, how we work, and the results we deliver.",
  contact: "Get a quote or schedule a consult—let's plan your next build.",
  portfolio: "Featured client projects and success stories across industries.",
  blog: "Latest insights, tips, and practical guides for web design, hosting, SEO, and digital strategy.",
  notFound: "The page you are looking for could not be found."
};

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BUSINESS_NAME,
    url: PRIMARY_DOMAIN,
  };
}

export function orgSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BUSINESS_NAME,
    url: PRIMARY_DOMAIN,
    logo: LOGO_URL,
  };
}

export function blogSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${BUSINESS_NAME} Blog`,
    url: `${PRIMARY_DOMAIN}/blog`,
    publisher: {
      "@type": "Organization",
      name: BUSINESS_NAME,
      logo: LOGO_URL,
    },
  };
}

export function articleSchema({ title, description, url, datePublished, dateModified, image }) {
  // Transform relative image paths to full URLs
  let imageUrl = image;
  if (image && !image.startsWith('http')) {
    // If it's a relative path, make it absolute
    imageUrl = image.startsWith('/') ? `${PRIMARY_DOMAIN}${image}` : `${PRIMARY_DOMAIN}/${image}`;
  }

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    image: imageUrl ? [imageUrl] : undefined,
    author: { "@type": "Organization", name: BUSINESS_NAME },
    publisher: { "@type": "Organization", name: BUSINESS_NAME, logo: LOGO_URL },
  };
}


