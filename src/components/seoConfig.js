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

export const HAS_ONSITE_SEARCH = false;
export const SITE_SEARCH_TARGET = "https://hh6influential.com/search?q={search_term_string}";

export const OPEN_GRAPH_DEFAULT_IMAGE = "https://hh6influential.com/assets/images/og-image.jpg";
export const TWITTER_HANDLE = ""; // e.g., "@hh6influential" if available

export const ROUTE_TITLE_RULES = {
  home: `${BRAND_TAGLINE} | ${BUSINESS_NAME}`,
  services: `Custom Web Development | ${BUSINESS_NAME}`,
  seo: `SEO & Content Strategy | ${BUSINESS_NAME}`,
  about: `About Us | ${BUSINESS_NAME}`,
  contact: `Contact | ${BUSINESS_NAME}`,
  blogPost: (postTitle) => `${postTitle} | ${BUSINESS_NAME}`,
  portfolio: `Portfolio | ${BUSINESS_NAME}`,
  notFound: `Page Not Found | ${BUSINESS_NAME}`
};

export const ROUTE_DESCRIPTIONS = {
  home: "Custom websites, SEO, and growth-focused strategy. Fast, modern sites that convert—without plugin bloat or hidden costs.",
  services: "Fast, modern, conversion-focused web development for growing businesses.",
  seo: "Improve rankings and conversions with technical SEO, content, and structured data.",
  about: "Who we are, how we work, and the results we deliver.",
  contact: "Get a quote or schedule a consult—let’s plan your next build.",
  portfolio: "Featured client projects and success stories across industries.",
  notFound: "The page you are looking for could not be found."
};


