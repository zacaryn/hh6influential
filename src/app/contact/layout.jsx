import { ROUTE_TITLE_RULES, ROUTE_DESCRIPTIONS } from '@/lib/seo';

export const metadata = {
  title: ROUTE_TITLE_RULES.contact,
  description: ROUTE_DESCRIPTIONS.contact,
};

export default function ContactLayout({ children }) {
  return children;
}
