import Link from 'next/link';
import Script from 'next/script';
import { blogSchema } from '@/lib/seo';
import '@/styles/Blog.css';

export const revalidate = 300;

function calculateReadingTime(content) {
  if (!content) return 0;
  
  // Remove markdown syntax and count actual words
  const cleanContent = content
    .replace(/[#*`~\[\]()]/g, '') // Remove markdown symbols
    .replace(/\n/g, ' ') // Replace newlines with spaces
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
  
  const wordCount = cleanContent.split(' ').filter(word => word.length > 0).length;
  return Math.ceil(wordCount / 225);
}

export const metadata = {
  title: 'Blog | HH6 Influential',
  description: 'Latest insights, tips, and FAQs from our team.',
};

async function getPosts() {
  const CDN_BASE = process.env.NEXT_PUBLIC_BLOG_CDN_URL?.replace(/\/$/, "");
  const API_BASE = process.env.NEXT_PUBLIC_BACKEND_API_URL?.replace(/\/$/, "") || 'http://localhost:8080';
  
  try {
    // Try CDN first
    if (CDN_BASE) {
      const res = await fetch(`${CDN_BASE}/index.json`, { 
        next: { revalidate: 300 }
      });
      if (res.ok) {
        const data = await res.json();
        return [...data].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
      }
    }
    
    // Fallback to API (server.js proxy)
    const res2 = await fetch(`${API_BASE}/cdn/index.json`, { 
      next: { revalidate: 300 }
    });
    if (res2.ok) {
      const data2 = await res2.json();
      return [...data2].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

async function getPostContent(slug, path) {
  const CDN_BASE = process.env.NEXT_PUBLIC_BLOG_CDN_URL?.replace(/\/$/, "");
  const API_BASE = process.env.NEXT_PUBLIC_BACKEND_API_URL?.replace(/\/$/, "") || 'http://localhost:8080';
  
  const postDir = path?.replace(/^\/cdn\//, '/')?.replace(/\/?$/, '/') || `/posts/2025/01/${slug}/`;
  
  try {
    // Try CDN first
    if (CDN_BASE) {
      const res = await fetch(`${CDN_BASE}${postDir}body.md`, { 
        next: { revalidate: 300 }
      });
      if (res.ok) {
        return await res.text();
      }
    }
    
    // Fallback to API
    const res2 = await fetch(`${API_BASE}/cdn${postDir}body.md`, { 
      next: { revalidate: 300 }
    });
    if (res2.ok) {
      return await res2.text();
    }
    
    return '';
  } catch (error) {
    console.error(`Error fetching content for ${slug}:`, error);
    return '';
  }
}

export default async function BlogIndexPage() {
  const posts = await getPosts();
  const CDN_BASE = process.env.NEXT_PUBLIC_BLOG_CDN_URL?.replace(/\/$/, "") || '';
  
  // Fetch content for each post to calculate reading time
  const postsWithContent = await Promise.all(
    posts.map(async (post) => {
      const content = await getPostContent(post.slug, post.path);
      return {
        ...post,
        content,
        readingTime: calculateReadingTime(content)
      };
    })
  );
  
  const allTags = [...new Set(postsWithContent.flatMap(p => p.tags || []))].sort();

  return (
    <>
      <Script id="ld-blog" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema()) }} />
      
      <div className="blog-page-container">
        <div className="blog-hero">
          <div className="blog-hero-content">
            <h1>HH6 Blog</h1>
            <p>Insights, tips, and behind-the-scenes from our team. Practical guides for web design, hosting, SEO, and digital strategy.</p>
          </div>
        </div>

        <div className="blog-content-wrapper">
          <main className="blog-main">
            {posts.length === 0 ? (
              <div className="blog-empty">
                <h3>No posts yet</h3>
                <p>We're working on some great content for you. Check back soon for insights, tips, and practical guides from our team!</p>
                <Link href="/contact" className="blog-cta">
                  Get notified when we publish
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </Link>
              </div>
            ) : (
              <div className="blog-posts">
                <div className="blog-posts-header">
                  <h2>Latest Posts</h2>
                  <span className="posts-count">{postsWithContent.length} article{postsWithContent.length !== 1 ? 's' : ''}</span>
                </div>
                
                <div className="posts-grid">
                  {postsWithContent.map((post) => {
                    // Handle image URL with proper media path routing
                    let imageUrl = '/assets/images/web-design.jpg'; // default
                    if (post.coverImage) {
                      if (post.coverImage.startsWith("http")) {
                        imageUrl = post.coverImage;
                      } else if (post.coverImage.startsWith("/media/")) {
                        // Media paths go through API proxy
                        imageUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:8080'}/cdn${post.coverImage}`;
                      } else {
                        // Other paths go directly to CDN
                        imageUrl = `${CDN_BASE}${post.coverImage}`;
                      }
                    }
                    
                    return (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="post-card">
                      <img 
                        src={imageUrl} 
                        alt={post.title}
                        className="post-cover"
                      />
                      <div className="post-content">
                        <div className="post-meta">
                          <span className="post-date">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                              <line x1="16" y1="2" x2="16" y2="6"/>
                              <line x1="8" y1="2" x2="8" y2="6"/>
                              <line x1="3" y1="10" x2="21" y2="10"/>
                            </svg>
                            {new Date(post.publishedAt).toLocaleDateString()}
                          </span>
                          <span>{post.readingTime} min read</span>
                        </div>
                        <h3>{post.title}</h3>
                        <p>{post.description}</p>
                        {post.tags && post.tags.length > 0 && (
                          <div className="post-tags">
                            {post.tags.slice(0, 3).map(tag => (
                              <span key={tag} className="post-tag">{tag}</span>
                            ))}
                            {post.tags.length > 3 && <span className="post-tag">+{post.tags.length - 3}</span>}
                          </div>
                        )}
                      </div>
                    </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </main>

          <aside className="blog-sidebar">
            <div className="sidebar-section">
              <h3>Categories</h3>
              {allTags.length > 0 ? (
                <div className="tag-cloud">
                  {allTags.map(tag => (
                    <Link key={tag} href={`/blog?tag=${tag}`} className="tag-chip">
                      {tag}
                    </Link>
                  ))}
                </div>
              ) : (
                <p style={{ color: '#999', fontSize: '0.9rem' }}>No tags yet</p>
              )}
            </div>

            <div className="sidebar-section">
              <h3>Recent Posts</h3>
              {postsWithContent.length > 0 ? (
                <ul className="recent-posts">
                  {postsWithContent.slice(0, 5).map(post => (
                    <li key={post.slug}>
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      <div className="post-date">{new Date(post.publishedAt).toLocaleDateString()}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: '#999', fontSize: '0.9rem' }}>No posts yet</p>
              )}
            </div>

            <div className="sidebar-section">
              <h3>Get Updates</h3>
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '16px' }}>
                Stay informed about new posts and digital marketing tips.
              </p>
              <Link href="/contact" className="blog-cta sidebar-cta">
                Contact Us
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}