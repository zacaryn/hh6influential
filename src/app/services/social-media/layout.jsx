import { ROUTE_TITLE_RULES, ROUTE_DESCRIPTIONS } from '@/lib/seo';
import { getServiceSchema, getOrganizationSchema, getBreadcrumbSchema, getFAQSchema } from '@/lib/schema';

export const metadata = {
  title: ROUTE_TITLE_RULES.socialMedia,
  description: ROUTE_DESCRIPTIONS.socialMedia,
};

export default function SocialMediaLayout({ children }) {
  const serviceSchema = getServiceSchema({
    title: "Social Media Management",
    description: ROUTE_DESCRIPTIONS.socialMedia
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: "Social Media Management", url: "/services/social-media" }
  ]);

  const faqSchema = getFAQSchema([
    {
      question: "What platforms do you manage?",
      answer: "We manage all major social media platforms including Facebook, Instagram, Twitter, LinkedIn, YouTube, and TikTok. We tailor our strategy to your target audience and business goals."
    },
    {
      question: "How often do you post content?",
      answer: "Posting frequency depends on your industry and audience engagement. We typically post 3-5 times per week on Facebook and Instagram, daily on Twitter, and 2-3 times per week on LinkedIn."
    },
    {
      question: "Do you create original content?",
      answer: "Yes, we create original graphics, videos, and written content tailored to your brand. We also curate relevant industry content and create engaging posts that resonate with your audience."
    },
    {
      question: "How do you measure success?",
      answer: "We track key metrics including engagement rates, follower growth, reach, clicks, and conversions. We provide monthly reports with detailed analytics and insights for continuous improvement."
    },
    {
      question: "Can you help with social media advertising?",
      answer: "Absolutely! We create and manage paid social media campaigns across all platforms, including Facebook Ads, Instagram Ads, LinkedIn Ads, and Twitter Ads to maximize your ROI."
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
