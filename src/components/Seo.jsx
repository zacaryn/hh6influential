import React from "react";
import { Helmet } from "react-helmet-async";
import {
  BUSINESS_NAME,
  PRIMARY_DOMAIN,
  OPEN_GRAPH_DEFAULT_IMAGE,
  TWITTER_HANDLE
} from "./seoConfig";

function toAbsoluteUrl(path) {
  if (!path) return undefined;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${PRIMARY_DOMAIN}${path.startsWith("/") ? path : `/${path}`}`;
}

function buildCanonical(path) {
  if (!path || path === "/") return `${PRIMARY_DOMAIN}/`;
  return `${PRIMARY_DOMAIN}${path.startsWith("/") ? path : `/${path}`}`;
}

function Seo({ title, description, path = "/", ogImage, ogType = "website", noIndex = false }) {
  const canonical = buildCanonical(path);
  const image = toAbsoluteUrl(ogImage || OPEN_GRAPH_DEFAULT_IMAGE);

  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      {image && <meta name="twitter:card" content="summary_large_image" />}
      {TWITTER_HANDLE && <meta name="twitter:site" content={TWITTER_HANDLE} />}
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta name="twitter:image" content={image} />}

      {noIndex && <meta name="robots" content="noindex,nofollow" />}
    </Helmet>
  );
}

export default Seo;


