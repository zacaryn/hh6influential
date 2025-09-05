import { ROUTE_TITLE_RULES, ROUTE_DESCRIPTIONS } from '@/lib/seo';
import { getServiceSchema, getOrganizationSchema, getBreadcrumbSchema, getFAQSchema } from '@/lib/schema';

export const metadata = {
  title: ROUTE_TITLE_RULES.webHosting,
  description: ROUTE_DESCRIPTIONS.webHosting,
};

export default function WebHostingLayout({ children }) {
  const serviceSchema = getServiceSchema({
    title: "Web Hosting & Infrastructure",
    description: ROUTE_DESCRIPTIONS.webHosting
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: "Web Hosting & Infrastructure", url: "/services/web-hosting" }
  ]);

  const faqSchema = getFAQSchema([
    {
      question: "What hosting plans do you offer?",
      answer: "We offer shared hosting, VPS hosting, dedicated servers, and cloud hosting solutions. We can recommend the best plan based on your website's traffic, storage needs, and performance requirements."
    },
    {
      question: "Do you provide SSL certificates?",
      answer: "Yes, we include free SSL certificates with all hosting plans. We also help with SSL installation and configuration to ensure your website is secure and trusted by visitors."
    },
    {
      question: "How often do you backup websites?",
      answer: "We perform automated daily backups of all hosted websites. Backups are stored securely and can be restored quickly if needed. We also provide manual backup options upon request."
    },
    {
      question: "What kind of support do you provide?",
      answer: "We provide 24/7 technical support via email, phone, and live chat. Our support team can help with hosting issues, website migrations, security concerns, and performance optimization."
    },
    {
      question: "Can you migrate my existing website?",
      answer: "Yes, we offer free website migration services. We'll handle the entire migration process including file transfer, database migration, and DNS configuration to minimize downtime."
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
