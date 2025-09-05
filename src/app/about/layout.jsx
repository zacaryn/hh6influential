import { ROUTE_TITLE_RULES, ROUTE_DESCRIPTIONS } from '@/lib/seo';

export const metadata = {
  title: ROUTE_TITLE_RULES.about,
  description: ROUTE_DESCRIPTIONS.about,
};

export default function AboutLayout({ children }) {
  return children;
}
