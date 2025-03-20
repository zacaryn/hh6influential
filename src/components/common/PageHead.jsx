import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

function PageHead({ 
  title, 
  description = "HH6 Influential provides digital solutions including web development, social media management, and graphic design. Veteran-owned and operated.",
  keywords = "digital solutions, veteran owned, web development, social media management, graphic design",
  image = "/assets/images/og-image.jpg",
  canonicalUrl
}) {
  const location = useLocation();
  const siteUrl = "https://hh6influential.com";
  const pageUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : '');
  
  // Force document title update when route changes
  useEffect(() => {
    document.title = title ? `${title} | HH6 Influential` : "HH6 Influential - Digital Solutions";
  }, [title, location.pathname]);

  return (
    <Helmet>
      <title>{title ? `${title} | HH6 Influential` : "HH6 Influential - Digital Solutions"}</title>
      
      {/* Basic Meta Tags */}
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      {pageUrl && <link rel="canonical" href={pageUrl} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={title ? `${title} | HH6 Influential` : "HH6 Influential - Digital Solutions"} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image.startsWith('http') ? image : `${siteUrl}${image}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title ? `${title} | HH6 Influential` : "HH6 Influential - Digital Solutions"} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image.startsWith('http') ? image : `${siteUrl}${image}`} />

      {/* Favicon */}
      <link rel="icon" href="/assets/images/favicon.ico" type="image/x-icon" />
      <link rel="shortcut icon" href="/assets/images/favicon.ico" type="image/x-icon" />
      <link rel="apple-touch-icon" href="/assets/images/apple-touch-icon.png" />
    </Helmet>
  );
}

export default PageHead; 