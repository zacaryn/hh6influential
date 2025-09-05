import { 
  BUSINESS_NAME, 
  PRIMARY_DOMAIN, 
  LOGO_URL, 
  CONTACT_PHONE,
  SAMEAS_PROFILES
} from './seo';

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BUSINESS_NAME,
    url: PRIMARY_DOMAIN,
  };
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BUSINESS_NAME,
    url: PRIMARY_DOMAIN,
    logo: LOGO_URL,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CONTACT_PHONE,
      contactType: "customer service",
      areaServed: "US",
      availableLanguage: "English"
    },
    sameAs: SAMEAS_PROFILES
  };
}

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BUSINESS_NAME,
    image: LOGO_URL,
    "@id": PRIMARY_DOMAIN,
    url: PRIMARY_DOMAIN,
    telephone: CONTACT_PHONE,
    address: {
      "@type": "PostalAddress",
      addressCountry: "US"
    },
    sameAs: SAMEAS_PROFILES
  };
}

export function getBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url ? `${PRIMARY_DOMAIN}${item.url}` : undefined
    }))
  };
}

export function getServiceSchema(service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    provider: {
      "@type": "Organization",
      name: BUSINESS_NAME
    },
    description: service.description,
    areaServed: {
      "@type": "Country",
      name: "United States"
    }
  };
}

export function getFAQSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

// Helper to combine multiple schemas
export function combineSchemas(...schemas) {
  return schemas.filter(Boolean);
}
