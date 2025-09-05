import { ROUTE_TITLE_RULES, ROUTE_DESCRIPTIONS } from '@/lib/seo';
import { getServiceSchema, getOrganizationSchema, getBreadcrumbSchema, getFAQSchema } from '@/lib/schema';

export const metadata = {
  title: ROUTE_TITLE_RULES.webmaster,
  description: ROUTE_DESCRIPTIONS.webmaster,
};

export default function WebmasterLayout({ children }) {
  const serviceSchema = getServiceSchema({
    title: "Webmaster & System Administration",
    description: ROUTE_DESCRIPTIONS.webmaster
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: "Webmaster & System Administration", url: "/services/webmaster" }
  ]);

  const faqSchema = getFAQSchema([
    {
      question: "What does webmaster service include?",
      answer: "Our webmaster service includes website maintenance, security monitoring, performance optimization, content updates, plugin management, database optimization, and 24/7 technical support."
    },
    {
      question: "How often do you perform maintenance?",
      answer: "We perform regular maintenance tasks weekly, including security scans, performance checks, and updates. Critical security updates are applied immediately, and we provide detailed reports of all maintenance activities."
    },
    {
      question: "Do you monitor website uptime?",
      answer: "Yes, we monitor your website's uptime 24/7 and receive instant alerts if there are any issues. We also track performance metrics and provide monthly uptime reports."
    },
    {
      question: "Can you help with website security?",
      answer: "Absolutely! We implement security measures including SSL certificates, malware scanning, firewall configuration, and regular security updates. We also provide security monitoring and incident response."
    },
    {
      question: "What if my website goes down?",
      answer: "We provide 24/7 monitoring and rapid response to downtime issues. Our team is notified immediately and works to restore your website as quickly as possible, typically within minutes of detection."
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
