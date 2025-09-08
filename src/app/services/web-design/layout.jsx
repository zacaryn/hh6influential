import { ROUTE_TITLE_RULES, ROUTE_DESCRIPTIONS } from '@/lib/seo';
import { getServiceSchema, getOrganizationSchema, getBreadcrumbSchema, getFAQSchema } from '@/lib/schema';

export const metadata = {
  title: ROUTE_TITLE_RULES.webDesign,
  description: ROUTE_DESCRIPTIONS.webDesign,
};

export default function WebDesignLayout({ children }) {
  const serviceSchema = getServiceSchema({
    title: "Web Design & Development",
    description: ROUTE_DESCRIPTIONS.webDesign
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: "Web Design & Development", url: "/services/web-design" }
  ]);

  const faqSchema = getFAQSchema([
    {
      question: "What's included in your web design service?",
      answer: "Our comprehensive web design service includes custom responsive design, e-commerce solutions, content management systems, performance optimization, SEO-ready structure, SSL security, and cross-browser compatibility."
    },
    {
      question: "How does the project process work?",
      answer: "We follow a structured approach: Discovery & Planning with 50% deposit and detailed written proposal, Design & Development with custom mockups, Testing & Review across devices, and Launch & Support with final payment due upon completion and 30-day post-launch grace period."
    },
    {
      question: "Do you provide ongoing maintenance?",
      answer: "Yes, we offer ongoing maintenance packages that include updates, security monitoring, backups, and light content posting. Maintenance is billed in advance and includes regular performance monitoring."
    },
    {
      question: "What technologies do you use?",
      answer: "We use modern technologies including React, HTML5/CSS3, JavaScript, WordPress, Shopify, and Node.js. We choose the best technology stack based on your specific project requirements."
    },
    {
      question: "Can you redesign my existing website?",
      answer: "Absolutely! We can redesign your existing website to improve performance, user experience, and conversion rates. We'll analyze your current site and create a plan for improvement."
    }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />
      {children}
    </>
  );
}
