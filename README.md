# HH6 Influential Website – Internal Overview

This repository contains the production website for HH6 Influential. It is a Next.js application with a lightweight Express API service used for admin functionality, blog content management, and AWS integrations. The codebase emphasizes performance, maintainability, and strong on-page SEO for digital marketing services.

## What was built

- **Responsive marketing website** with service-specific content (Web Design, Graphic Design, Video Editing, SEO Marketing, Social Media, Web Hosting, Webmaster Services)
- **Conversion paths**: contact forms and QuickMessageWidget for lead capture
- **Admin dashboard** for blog content management and inquiry handling (Cognito-protected)
- **Blog system** with dynamic routing and AWS S3/CloudFront integration
- **Robust SEO implementation** (Next.js metadata API, Open Graph, Twitter cards, JSON-LD)
- **Production-ready architecture** with separate frontend/backend deployment structure

## Tech stack

- **Next.js (App Router)**, TypeScript, TailwindCSS
- **Express.js API service** in `/server/` directory for production deployment
- **AWS**: S3 (blog content), CloudFront (CDN), Cognito (admin auth), DynamoDB (inquiries)
- **Development**: Concurrent frontend/backend with `start-prod.js` orchestration

## Architecture highlights

- **UI**: `src/app/` directory with route-level metadata and JSON-LD where appropriate
- **Global SEO**: `src/app/layout.tsx` sets defaults (Open Graph, Twitter, verification, WebSite/Organization schema)
- **Components**: reusable UI in `src/components/` (FAQ, forms, navigation, etc.)
- **API service**: `server/server.js` exposes `/api/*` routes, integrates with AWS, includes CORS and JWT verification
- **Static assets and SEO files**: `public/` (robots.txt, sitemap.xml, manifests, images)
- **Production separation**: `/server/` directory mimics production deployment with its own dependencies

## SEO implementation

- **Next.js Metadata API** for titles/descriptions per page and Open Graph/Twitter tags
- **Structured data**: WebSite, Organization, WebPage, FAQPage, and relevant ImageObject JSON-LD
- **Canonicals and site name**: configured to the apex domain; alternateName provided to reinforce brand sitename in Google
- **robots and sitemap**: explicit robots.txt and sitemap.xml maintained in `public/`
- **Prerender.io integration** for SEO rendering of dynamic content

## Deployment notes

- **Frontend**: Next.js build deployed behind Nginx with 301 redirect from www to apex domain
- **Backend**: Express API service deployed separately with AWS credentials and environment variables
- **CDN**: CloudFront distribution for blog content and static assets
- **Environment variables**: Separate `.env.production` files for frontend and backend
- **Image optimization**: Static assets served from `public/` directory

## Environment/configuration

- **next.config.ts**: site URL configured, image domains set for AWS S3
- **server/server.js**: expects AWS credentials, Cognito configuration, and CORS settings
- **Production setup**: `/server/` directory with its own `package.json` and dependencies
- **Development**: Root directory contains both frontend and backend for local development

## Payment Structure

- **Web Design**: 50% deposit required before work begins, final payment due upon completion
- **All other services** (Graphic Design, Video Editing, etc.): Hourly billing, payment upon project completion
- **Terms**: Detailed in `/src/app/terms/page.jsx`

## Ownership and confidentiality

Copyright (c) 2025 HH6 Influential, LLC. All rights reserved.

This code is proprietary and confidential. No permission is granted to use, copy, modify, or distribute this software without prior written consent from HH6 Influential, LLC.

Pure analysis of features, secure, not for distribution, and our HH6 license.