import { ROUTE_TITLE_RULES, ROUTE_DESCRIPTIONS } from '@/lib/seo';
import { getServiceSchema, getOrganizationSchema, getBreadcrumbSchema, getFAQSchema } from '@/lib/schema';

export const metadata = {
  title: ROUTE_TITLE_RULES.videoEditing,
  description: ROUTE_DESCRIPTIONS.videoEditing,
};

export default function VideoEditingLayout({ children }) {
  const serviceSchema = getServiceSchema({
    title: "Video Creation & Editing",
    description: ROUTE_DESCRIPTIONS.videoEditing
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: "Video Creation & Editing", url: "/services/video-editing" }
  ]);

  const faqSchema = getFAQSchema([
    {
      question: "What types of videos do you create?",
      answer: "We create promotional videos, social media content, explainer videos, product demos, event coverage, testimonials, and training videos. We tailor our approach to your specific needs and target audience."
    },
    {
      question: "What video formats do you deliver?",
      answer: "We deliver videos in all standard formats including MP4, MOV, AVI, and WebM. We optimize videos for different platforms and provide multiple resolutions for web, social media, and mobile viewing."
    },
    {
      question: "How long does video production take?",
      answer: "Production time varies by project complexity. Simple social media videos take 1-2 weeks, while complex promotional videos may take 4-6 weeks. We provide detailed timelines during the planning phase."
    },
    {
      question: "Do you provide video editing services only?",
      answer: "We offer both full video production (concept to final cut) and editing-only services. Whether you have raw footage or need complete video creation, we can accommodate your needs."
    },
    {
      question: "Can you help with video marketing strategy?",
      answer: "Yes! We don't just create videos - we help develop video marketing strategies, optimize for different platforms, and provide guidance on distribution and promotion to maximize your video's impact."
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
