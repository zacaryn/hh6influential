'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import '@/styles/FloatingHub.css';

const HIDDEN_ROUTES = ['/admin', '/blog', '/contact'];

function shouldHide(pathname) {
  return HIDDEN_ROUTES.some(
    (r) => pathname === r || pathname.startsWith(r + '/')
  );
}

function getPostImage(post, cdnBase) {
  const fallback = '/assets/images/web-design.jpg';
  if (!post?.coverImage) return fallback;
  if (post.coverImage.startsWith('http')) return post.coverImage;
  return `${cdnBase}${post.coverImage}`;
}

export default function FloatingActionHub() {
  const pathname = usePathname();
  const panelRef = useRef(null);
  const fabRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('message');

  // Message form state
  const [formData, setFormData] = useState({
    fullName: '',
    contactEmail: '',
    phone: '',
    inquiryText: '',
    company: '',
  });
  const [formStartTime] = useState(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Blog state
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState(false);

  const cdnBase =
    (typeof window !== 'undefined' &&
      process.env.NEXT_PUBLIC_BLOG_CDN_URL?.replace(/\/$/, '')) ||
    '';

  // Fetch blog posts on first open of the blog tab
  const fetchPosts = useCallback(async () => {
    if (posts.length > 0 || postsLoading) return;
    setPostsLoading(true);
    setPostsError(false);

    const CDN =
      process.env.NEXT_PUBLIC_BLOG_CDN_URL?.replace(/\/$/, '') || '';
    const API =
      process.env.NEXT_PUBLIC_BACKEND_API_URL?.replace(/\/$/, '') ||
      'http://localhost:8080';

    try {
      let data = null;
      if (CDN) {
        const res = await fetch(`${CDN}/index.json`, { cache: 'no-store' });
        if (res.ok) data = await res.json();
      }
      if (!data) {
        const res = await fetch(`${API}/cdn/index.json`, {
          cache: 'no-store',
        });
        if (res.ok) data = await res.json();
      }
      if (data) {
        const sorted = [...data]
          .sort(
            (a, b) =>
              new Date(b.publishedAt).getTime() -
              new Date(a.publishedAt).getTime()
          )
          .slice(0, 3);
        setPosts(sorted);
      }
    } catch {
      setPostsError(true);
    } finally {
      setPostsLoading(false);
    }
  }, [posts.length, postsLoading]);

  // Trigger fetch when switching to blog tab
  useEffect(() => {
    if (isOpen && activeTab === 'blog') fetchPosts();
  }, [isOpen, activeTab, fetchPosts]);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const onClick = (e) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        fabRef.current &&
        !fabRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [isOpen]);

  // Close panel on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleClose = () => {
    setIsOpen(false);
    setSubmitStatus(null);
    setFormData({
      fullName: '',
      contactEmail: '',
      phone: '',
      inquiryText: '',
      company: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const API_BASE =
        process.env.NEXT_PUBLIC_BACKEND_API_URL?.replace(/\/$/, '') ||
        'http://localhost:8080';

      const response = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          _formStartTime: formStartTime,
          source: 'quick-message',
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: result.message });
        setFormData({
          fullName: '',
          contactEmail: '',
          phone: '',
          inquiryText: '',
          company: '',
        });

        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'form_submit', {
            event_category: 'engagement',
            event_label: 'quick-message-form',
            form_name: 'quick-message-form',
            form_destination: 'quick-widget',
            content_group1: 'Website',
            content_group2: 'Quick Message',
            value: 1,
          });
        }

        setTimeout(() => {
          setIsOpen(false);
          setSubmitStatus(null);
        }, 3000);
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Failed to send message',
        });
      }
    } catch {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (shouldHide(pathname)) return null;

  return (
    <div className="fab-hub">
      {isOpen && (
        <div className="fab-panel" ref={panelRef} role="dialog" aria-label="Quick actions">
          <div className="fab-panel-header">
            <div className="fab-tabs">
              <button
                className={`fab-tab ${activeTab === 'message' ? 'fab-tab--active' : ''}`}
                onClick={() => setActiveTab('message')}
              >
                Message Us
              </button>
              <button
                className={`fab-tab ${activeTab === 'blog' ? 'fab-tab--active' : ''}`}
                onClick={() => setActiveTab('blog')}
              >
                Latest Posts
              </button>
            </div>
            <button onClick={handleClose} className="fab-close" aria-label="Close panel">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {activeTab === 'message' && (
            <div className="fab-content">
              {submitStatus && (
                <div className={`fab-alert fab-alert--${submitStatus.type}`}>
                  {submitStatus.message}
                </div>
              )}
              <form onSubmit={handleSubmit} data-form-name="quick-message-form">
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  tabIndex="-1"
                  autoComplete="off"
                  style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }}
                  aria-hidden="true"
                />
                <div className="fab-field">
                  <label htmlFor="fab-fullName">Name *</label>
                  <input
                    type="text"
                    id="fab-fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="fab-input"
                    placeholder="Your name"
                  />
                </div>
                <div className="fab-field">
                  <label htmlFor="fab-contactEmail">Email *</label>
                  <input
                    type="email"
                    id="fab-contactEmail"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    required
                    className="fab-input"
                    placeholder="your@email.com"
                  />
                </div>
                <div className="fab-field">
                  <label htmlFor="fab-phone">Phone</label>
                  <input
                    type="tel"
                    id="fab-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="fab-input"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div className="fab-field">
                  <label htmlFor="fab-inquiryText">Message *</label>
                  <textarea
                    id="fab-inquiryText"
                    name="inquiryText"
                    value={formData.inquiryText}
                    onChange={handleInputChange}
                    required
                    className="fab-input fab-textarea"
                    placeholder="How can we help you?"
                    rows={3}
                  />
                </div>
                <button type="submit" disabled={isSubmitting} className="fab-submit">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'blog' && (
            <div className="fab-content">
              {postsLoading && <p className="fab-empty">Loading posts...</p>}
              {postsError && <p className="fab-empty">Could not load posts.</p>}
              {!postsLoading && !postsError && posts.length === 0 && (
                <p className="fab-empty">No posts yet. Check back soon.</p>
              )}
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="fab-post"
                >
                  <div className="fab-post-thumb">
                    <img
                      src={getPostImage(post, cdnBase)}
                      alt={post.title}
                      loading="lazy"
                    />
                  </div>
                  <div className="fab-post-info">
                    <h4>{post.title}</h4>
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                </Link>
              ))}
              {posts.length > 0 && (
                <Link href="/blog" className="fab-view-all">
                  View All Posts
                </Link>
              )}
            </div>
          )}
        </div>
      )}

      <button
        ref={fabRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`fab-button ${isOpen ? 'fab-button--open' : ''}`}
        aria-label={isOpen ? 'Close quick actions' : 'Open quick actions'}
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}
