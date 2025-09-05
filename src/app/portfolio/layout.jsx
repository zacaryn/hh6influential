import { ROUTE_TITLE_RULES, ROUTE_DESCRIPTIONS } from '@/lib/seo';

export const metadata = {
  title: ROUTE_TITLE_RULES.portfolio,
  description: ROUTE_DESCRIPTIONS.portfolio,
};

export default function PortfolioLayout({ children }) {
  return children;
}
