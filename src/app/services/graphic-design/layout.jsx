import { ROUTE_TITLE_RULES, ROUTE_DESCRIPTIONS } from '@/lib/seo';
import { getServiceSchema, getOrganizationSchema, getBreadcrumbSchema, getFAQSchema } from '@/lib/schema';

export const metadata = {
  title: ROUTE_TITLE_RULES.graphicDesign,
  description: ROUTE_DESCRIPTIONS.graphicDesign,
};

export default function GraphicDesignLayout({ children }) {
  const serviceSchema = getServiceSchema({
    title: "Graphic Design & Marketing Materials",
    description: ROUTE_DESCRIPTIONS.graphicDesign
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: "Graphic Design & Marketing Materials", url: "/services/graphic-design" }
  ]);

  const faqSchema = getFAQSchema([
    {
      question: "What types of graphic design do you offer?",
      answer: "We create logos, business cards, flyers, brochures, social media graphics, website graphics, banners, posters, and complete brand identity packages. We design for both print and digital media."
    },
    {
      question: "Do you work with existing brand guidelines?",
      answer: "Yes, we can work within your existing brand guidelines or help develop new ones. We ensure all designs maintain consistency with your brand identity and messaging."
    },
    {
      question: "What file formats do you provide?",
      answer: "We provide files in all standard formats including AI, PSD, PDF, PNG, JPG, and SVG. We ensure you have the right formats for both print and digital use."
    },
    {
      question: "How many revisions are included?",
      answer: "We include 2-3 rounds of revisions in our standard packages. Additional revisions can be accommodated and are billed separately if needed."
    },
    {
      question: "Can you help with print production?",
      answer: "Yes, we work with trusted print partners and can handle everything from design to print production. We ensure your designs are print-ready and meet quality standards."
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
