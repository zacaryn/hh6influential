import React from "react";

function Script({ data }) {
  return (
    <script type="application/ld+json">{JSON.stringify(data)}</script>
  );
}

export function WebSiteSchema({ name, url, hasSearch = false, searchTarget }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    ...(hasSearch ? {
      potentialAction: {
        "@type": "SearchAction",
        target: searchTarget,
        "query-input": "required name=search_term_string"
      }
    } : {})
  };
  return <Script data={data} />;
}

export function OrganizationSchema({ name, url, logoUrl, sameAs = [], email, telephone }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo: logoUrl,
    sameAs,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email,
        telephone
      }
    ]
  };
  return <Script data={data} />;
}

export function LocalBusinessSchema({ name, url, logoUrl, sameAs = [], address, telephone }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    url,
    logo: logoUrl,
    sameAs,
    address,
    telephone
  };
  return <Script data={data} />;
}

export function ServiceSchema({ name, providerName, areaServed }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    provider: {
      "@type": "Organization",
      name: providerName
    },
    ...(areaServed ? { areaServed } : {})
  };
  return <Script data={data} />;
}

export function BreadcrumbSchema({ items = [] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
  return <Script data={data} />;
}

export function ArticleSchema({ headline, datePublished, dateModified, authorName, image }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    datePublished,
    dateModified,
    author: {
      "@type": "Person",
      name: authorName
    },
    ...(image ? { image } : {})
  };
  return <Script data={data} />;
}

export function FAQSchema({ faqs = [] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(f => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer
      }
    }))
  };
  return <Script data={data} />;
}


