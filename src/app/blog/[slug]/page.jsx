import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { articleSchema, ROUTE_TITLE_RULES } from '@/lib/seo';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import ShareLinks from '@/components/ShareLinks';
import '@/styles/BlogPost.css';

export const dynamic = 'force-dynamic';
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

function toCdn(url) {
  if (!url) return url;
  if (/^https?:/i.test(url)) return url;
  
  // If it's a media path, use the API proxy (same as blog post content)
  if (url.startsWith('/media/')) {
    const API_BASE = process.env.NEXT_PUBLIC_BACKEND_API_URL?.replace(/\/$/, "") || 'http://localhost:8080';
    return `${API_BASE}/cdn${url}`;
  }
  
  // Otherwise use CDN directly
  const CDN_BASE = process.env.NEXT_PUBLIC_BLOG_CDN_URL?.replace(/\/$/, "");
  return `${CDN_BASE}${url.startsWith('/') ? url : `/${url}`}`;
}

async function getPost(slug) {
  const CDN_BASE = process.env.NEXT_PUBLIC_BLOG_CDN_URL?.replace(/\/$/, "");
  const API_BASE = process.env.NEXT_PUBLIC_BACKEND_API_URL?.replace(/\/$/, "") || 'http://localhost:8080';
  
  console.log(`Fetching post: ${slug}`);
  console.log(`CDN_BASE: ${CDN_BASE}`);
  console.log(`API_BASE: ${API_BASE}`);
  
  try {
    // First, get the index to find the correct post path (same as React SPA)
    let index;
    try {
      if (CDN_BASE) {
        const idxRes = await fetch(`${CDN_BASE}/index.json`, { 
          next: { revalidate: 300 }
        });
        if (idxRes.ok) {
          index = await idxRes.json();
        }
      }
    } catch (e) {
      console.log('CDN index failed, trying API');
    }
    
    // Fallback to API for index
    if (!index && API_BASE) {
      try {
        const idxRes2 = await fetch(`${API_BASE}/cdn/index.json`, { 
          next: { revalidate: 300 }
        });
        if (idxRes2.ok) {
          index = await idxRes2.json();
        }
      } catch (e) {
        console.log('API index failed');
      }
    }
    
    if (!index) {
      console.log('Could not load index.json');
      return null;
    }
    
    // Find the post entry in the index
    const entry = index.find((i) => i.slug === slug);
    if (!entry) {
      console.log('Post not found in index:', slug);
      return null;
    }
    
    // Get the post directory path (same logic as React SPA)
    const postDir = entry?.path?.replace(/^\/cdn\//, '/')?.replace(/\/?$/, '/') || `/posts/2025/01/${slug}/`;
    console.log(`Post directory: ${postDir}`);
    
    // Fetch post metadata
    let metaRes;
    try {
      if (CDN_BASE) {
        metaRes = await fetch(`${CDN_BASE}${postDir}post.json`, { 
          next: { revalidate: 300 }
        });
      }
    } catch (e) {
      console.log('CDN post.json failed');
    }
    
    if ((!metaRes || !metaRes.ok) && API_BASE) {
      metaRes = await fetch(`${API_BASE}/cdn${postDir}post.json`, { 
        next: { revalidate: 300 }
      });
    }
    
    if (!metaRes || !metaRes.ok) {
      console.log(`Failed to load post.json: ${metaRes?.status || 'no response'}`);
      return null;
    }
    
    const metaJson = await metaRes.json();
    console.log('Post metadata loaded:', metaJson.title);
    
    // Fetch post body content
    let bodyRes;
    try {
      if (CDN_BASE) {
        bodyRes = await fetch(`${CDN_BASE}${postDir}body.md`, { 
          next: { revalidate: 300 }
        });
      }
    } catch (e) {
      console.log('CDN body.md failed');
    }
    
    if ((!bodyRes || !bodyRes.ok) && API_BASE) {
      bodyRes = await fetch(`${API_BASE}/cdn${postDir}body.md`, { 
        next: { revalidate: 300 }
      });
    }
    
    if (bodyRes && bodyRes.ok) {
      const bodyText = await bodyRes.text();
      metaJson.content = bodyText; // Add content to metadata
      console.log('Post body loaded, length:', bodyText.length);
    } else {
      console.log(`Failed to load body.md: ${bodyRes?.status || 'no response'}`);
      metaJson.content = ''; // Set empty content if body fails
    }
    
    return metaJson;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | HH6 Influential',
      description: 'The blog post you are looking for could not be found.',
    };
  }

  let ogImage = post.coverImage ? toCdn(post.coverImage) : undefined;

  return {
    title: ROUTE_TITLE_RULES.blogPost(post.title),
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  const CDN_BASE = process.env.NEXT_PUBLIC_BLOG_CDN_URL?.replace(/\/$/, "") || '';
  
  if (!post) {
    notFound();
  }

  const schema = articleSchema({
    title: post.title,
    description: post.description,
    url: `https://hh6influential.com/blog/${slug}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    image: post.coverImage
  });

  return (
    <div className="blog-post-page-container">
      <Script id="ld-article" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      <article>
        <div className="blog-post-hero">
          {post.coverImage && <img src={toCdn(post.coverImage)} alt={post.title} className="blog-post-cover" />}
          <div className="blog-post-header">
            <h1 className="blog-post-title">{post.title}</h1>
            {post.description && <p className="blog-post-description">{post.description}</p>}
            <div className="blog-post-meta">
              <div className="blog-post-date">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
                             <span>{calculateReadingTime(post.content)} min read</span>
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="blog-post-tags">
                {post.tags.map(tag => (
                  <span key={tag} className="blog-post-tag">{tag}</span>
                ))}
              </div>
            )}
            
            <ShareLinks slug={slug} title={post.title} />
          </div>
        </div>

        <div className="blog-post-content">
          {post.content ? (
            <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>
              {post.content}
            </ReactMarkdown>
          ) : (
            <p>Content not available.</p>
          )}
        </div>

        <div className="blog-post-footer">
          <h4>Ready to get started?</h4>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Let's discuss how we can help with your web design, hosting, or digital marketing needs.
          </p>
          <Link href="/contact" className="blog-cta">
            Get in touch
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </Link>
        </div>
      </article>

      <div className="blog-navigation">
        <Link href="/blog" className="blog-nav-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          Back to Blog
        </Link>
        <Link href="/contact" className="blog-nav-link">
          Contact Us
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}