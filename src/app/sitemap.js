import { PRIMARY_DOMAIN } from '@/lib/seo';

export const revalidate = 300;

export default async function sitemap() {
  const base = PRIMARY_DOMAIN.replace(/\/$/, '');
  const staticRoutes = [
    '', 
    '/about', 
    '/services', 
    '/services/web-design',
    '/services/social-media',
    '/services/video-editing',
    '/services/graphic-design',
    '/services/web-hosting',
    '/services/webmaster',
    '/services/seo-marketing',
    '/portfolio', 
    '/contact', 
    '/terms', 
    '/blog',
  ].map((p) => ({ 
    url: `${base}${p}`, 
    changeFrequency: 'weekly', 
    priority: p === '' || p === '/services' ? 0.9 : 0.7 
  }));

  try {
    const indexRes = await fetch(`${process.env.NEXT_PUBLIC_BLOG_CDN_URL || ''}/index.json`, { next: { revalidate: 300 } });
    const posts = indexRes.ok ? await indexRes.json() : [];
    const postRoutes = posts.map((p) => ({ url: `${base}/blog/${p.slug}`, changeFrequency: 'weekly', priority: 0.6 }));
    return [...staticRoutes, ...postRoutes];
  } catch {
    return staticRoutes;
  }
}


