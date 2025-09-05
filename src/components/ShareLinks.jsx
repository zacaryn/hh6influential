'use client';

import { useState } from 'react';

export default function ShareLinks({ slug, title }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`https://hh6influential.com/blog/${slug}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="blog-post-share">
      <span className="share-label">Share this post:</span>
      <div className="share-links">
        <a 
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://hh6influential.com/blog/${slug}`)}`}
          target="_blank" 
          rel="noopener noreferrer" 
          className="share-link facebook"
          title="Share on Facebook"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
        <a 
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://hh6influential.com/blog/${slug}`)}&text=${encodeURIComponent(title)}`}
          target="_blank" 
          rel="noopener noreferrer" 
          className="share-link twitter"
          title="Share on X (Twitter)"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.244 2H21L13.5 10.59 22 22h-6.563l-5.09-6.656L4.5 22H2l8.062-9.28L2 2h6.688l4.594 6.094L18.244 2zm-1.125 18h1.5L7.03 4h-1.5l11.589 16z"/>
          </svg>
        </a>
        <a 
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://hh6influential.com/blog/${slug}`)}`}
          target="_blank" 
          rel="noopener noreferrer" 
          className="share-link linkedin"
          title="Share on LinkedIn"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
        <button 
          onClick={handleCopy}
          className={`share-link copy ${copied ? 'copied' : ''}`}
          title={copied ? "Link copied!" : "Copy link"}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
