import { ROUTE_TITLE_RULES, ROUTE_DESCRIPTIONS } from '@/lib/seo';
import { getServiceSchema, getOrganizationSchema, getBreadcrumbSchema, getFAQSchema } from '@/lib/schema';

export const metadata = {
  title: ROUTE_TITLE_RULES.seoMarketing,
  description: ROUTE_DESCRIPTIONS.seoMarketing,
};

export default function SEOMarketingLayout({ children }) {
  const serviceSchema = getServiceSchema({
    title: "SEO & Digital Marketing",
    description: ROUTE_DESCRIPTIONS.seoMarketing
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: "SEO & Digital Marketing", url: "/services/seo-marketing" }
  ]);

  const faqSchema = getFAQSchema([
    {
      question: "How long does it take to see SEO results?",
      answer: "SEO is a long-term strategy. You may see initial improvements in 3-6 months, but significant results typically take 6-12 months. We provide monthly reports showing progress and ranking improvements."
    },
    {
      question: "What's included in your SEO service?",
      answer: "Our SEO service includes keyword research, on-page optimization, technical SEO, content strategy, link building, local SEO, performance monitoring, and monthly reporting with detailed analytics."
    },
    {
      question: "Do you work with local businesses?",
      answer: "Yes! We specialize in local SEO for businesses targeting specific geographic areas. We optimize for local search results, Google My Business, and location-based keywords."
    },
    {
      question: "Can you help with Google Ads?",
      answer: "Absolutely! We create and manage Google Ads campaigns, Facebook Ads, and other paid advertising platforms. We focus on maximizing ROI and driving qualified traffic to your website."
    },
    {
      question: "How do you measure SEO success?",
      answer: "We track key metrics including keyword rankings, organic traffic growth, conversion rates, click-through rates, and revenue from organic search. We provide detailed monthly reports with actionable insights."
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
