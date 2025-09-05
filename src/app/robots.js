import { PRIMARY_DOMAIN } from '@/lib/seo';

export default function robots() {
  const base = PRIMARY_DOMAIN.replace(/\/$/, '');
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}


