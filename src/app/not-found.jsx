import Link from "next/link";
import { ROUTE_TITLE_RULES, ROUTE_DESCRIPTIONS } from '@/lib/seo';

export const metadata = {
  title: ROUTE_TITLE_RULES.notFound,
  description: ROUTE_DESCRIPTIONS.notFound,
  robots: 'noindex,nofollow',
};

export default function NotFound() {
  return (
    <div className="page-container">
      <section className="not-found-container">
        <div className="not-found-content">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>The page you are looking for doesn't exist or has been moved.</p>
          <div className="actions">
            <Link href="/" className="home-button">Return to Homepage</Link>
            <Link href="/contact" className="contact-button">Contact Us</Link>
          </div>
        </div>
        <div className="not-found-image">
          <img src="/assets/images/hh6logo.png" alt="HH6 Influential Logo" />
        </div>
      </section>
    </div>
  );
}
