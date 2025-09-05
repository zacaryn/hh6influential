import { ROUTE_TITLE_RULES, ROUTE_DESCRIPTIONS } from '@/lib/seo';
import { getOrganizationSchema, getBreadcrumbSchema } from '@/lib/schema';

export const metadata = {
  title: ROUTE_TITLE_RULES.services,
  description: ROUTE_DESCRIPTIONS.services,
};

export default function ServicesLayout({ children }) {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
      {children}
    </>
  );
}
