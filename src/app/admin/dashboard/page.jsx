'use client';

import React from "react";
import { getIdToken, clearAuth } from "../../../utils/auth";
import Logo from "../../../components/Logo";
import AuthGuard from "../../../components/AuthGuard";
import "../../../styles/Admin.css";

function AdminDashboard() {
  const [activePanel, setActivePanel] = React.useState('posts');
  const [crawlUrl, setCrawlUrl] = React.useState('');
  const [crawlResults, setCrawlResults] = React.useState(null);
  const [crawlLoading, setCrawlLoading] = React.useState(false);
  const [posts, setPosts] = React.useState([]);
  const [inquiries, setInquiries] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [editingPost, setEditingPost] = React.useState(null);
  const [selectedInquiry, setSelectedInquiry] = React.useState(null);
  const [inquiryFilters, setInquiryFilters] = React.useState({
    status: 'all',
    search: '',
    page: 1
  });
  const [inquiryPagination, setInquiryPagination] = React.useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0
  });
  const [form, setForm] = React.useState({
    title: "",
    slug: "",
    description: "",
    tags: [],
    coverImage: "",
    body: "# New Post\n\nWrite here...",
    publishedAt: new Date().toISOString().slice(0, 16)
  });
  const [tagInput, setTagInput] = React.useState("");
  const [uploading, setUploading] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const API_BASE = process.env.NEXT_PUBLIC_BACKEND_API_URL?.replace(/\/$/, "") || 'http://localhost:8080';
  const CDN_BASE = process.env.NEXT_PUBLIC_BLOG_CDN_URL?.replace(/\/$/, "") || '';

  // Crawl test function
  const testCrawl = async (url) => {
    if (!url) return;
    
    setCrawlLoading(true);
    try {
      const response = await fetch(`/api/crawl-test?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      setCrawlResults(data);
    } catch (error) {
      setCrawlResults({ error: 'Failed to test URL' });
    }
    setCrawlLoading(false);
  };

  // Load posts on mount
  React.useEffect(() => {
    if (activePanel === 'posts') {
      loadPosts();
    } else if (activePanel === 'inquiries') {
      loadInquiries();
    }
  }, [activePanel, inquiryFilters]);

  async function loadPosts() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/admin/posts`, {
        credentials: 'include'
      });
      if (!res.ok) throw new Error(`Failed to load posts: ${res.status}`);
      const data = await res.json();
      setPosts(data.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)));
    } catch (e) {
      setError(e.message || String(e));
    } finally {
      setLoading(false);
    }
  }

  async function loadPostForEdit(slug) {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/posts/${slug}`, {
        credentials: 'include'
      });
      if (!res.ok) throw new Error(`Failed to load post: ${res.status}`);
      const data = await res.json();
      setForm({
        title: data.meta.title || "",
        slug: data.meta.slug || "",
        description: data.meta.description || "",
        tags: data.meta.tags || [],
        coverImage: data.meta.coverImage || "",
        body: data.body || "",
        publishedAt: data.meta.publishedAt ? new Date(data.meta.publishedAt).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16)
      });
      setEditingPost(slug);
      setActivePanel('create');
    } catch (e) {
      setError(e.message || String(e));
    } finally {
      setLoading(false);
    }
  }

  async function savePost() {
    if (!form.title || !form.slug) {
      setError("Title and slug are required");
      return;
    }
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const postMeta = {
        title: form.title,
        slug: form.slug,
        description: form.description,
        tags: form.tags,
        coverImage: form.coverImage,
        publishedAt: new Date(form.publishedAt).toISOString()
      };
      const endpoint = editingPost ? `${API_BASE}/api/admin/posts/${editingPost}` : `${API_BASE}/api/admin/posts`;
      const method = editingPost ? 'PUT' : 'POST';
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ postMeta, body: form.body, format: 'md' })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || JSON.stringify(data));
      setMessage(editingPost ? "Post updated successfully!" : "Post created successfully!");
      setTimeout(() => {
        setActivePanel('posts');
        setEditingPost(null);
        resetForm();
        loadPosts();
      }, 1500);
    } catch (e) {
      setError(e.message || String(e));
    } finally {
      setLoading(false);
    }
  }

  async function deletePost(slug) {
    if (!confirm(`Delete post "${slug}"? This cannot be undone.`)) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/posts/${slug}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!res.ok) throw new Error(`Failed to delete post: ${res.status}`);
      setMessage("Post deleted successfully!");
      loadPosts();
    } catch (e) {
      setError(e.message || String(e));
    } finally {
      setLoading(false);
    }
  }

  async function loadInquiries() {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        page: inquiryFilters.page,
        limit: 20,
        ...(inquiryFilters.status !== 'all' && { status: inquiryFilters.status }),
        ...(inquiryFilters.search && { search: inquiryFilters.search })
      });
      
      const res = await fetch(`${API_BASE}/api/admin/inquiries?${params}`, {
        credentials: 'include'
      });
      if (!res.ok) throw new Error(`Failed to load inquiries: ${res.status}`);
      const data = await res.json();
      setInquiries(data.inquiries);
      setInquiryPagination(data.pagination);
    } catch (e) {
      setError(e.message || String(e));
    } finally {
      setLoading(false);
    }
  }

  async function updateInquiryStatus(id, status) {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/inquiries/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error(`Failed to update status: ${res.status}`);
      setMessage(`Inquiry marked as ${status}!`);
      loadInquiries();
    } catch (e) {
      setError(e.message || String(e));
    } finally {
      setLoading(false);
    }
  }

  async function deleteInquiry(id) {
    if (!confirm('Delete this inquiry? This cannot be undone.')) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/inquiries/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!res.ok) throw new Error(`Failed to delete inquiry: ${res.status}`);
      setMessage("Inquiry deleted successfully!");
      loadInquiries();
    } catch (e) {
      setError(e.message || String(e));
    } finally {
      setLoading(false);
    }
  }

  function getStatusColor(status) {
    switch (status) {
      case 'new': return '#ef4444';
      case 'read': return '#3b82f6';
      case 'replied': return '#10b981';
      case 'archived': return '#6b7280';
      default: return '#6b7280';
    }
  }

  function getStatusLabel(status) {
    switch (status) {
      case 'new': return 'New';
      case 'read': return 'Read';
      case 'replied': return 'Replied';
      case 'archived': return 'Archived';
      default: return status;
    }
  }

  function resetForm() {
    setForm({
      title: "",
      slug: "",
      description: "",
      tags: [],
      coverImage: "",
      body: "# New Post\n\nWrite here...",
      publishedAt: new Date().toISOString().slice(0, 16)
    });
    setTagInput("");
  }

  function generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  function addTag() {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      setForm(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      setTagInput("");
    }
  }

  function removeTag(tag) {
    setForm(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  }

  async function uploadImage(file) {
    if (!file) return;
    setUploading(true);
    setError("");
    setMessage("");
    try {
      const date = new Date();
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const key = `media/${yyyy}/${mm}/${Date.now()}-${file.name}`;
      
      console.log('Uploading file:', file.name, 'to key:', key);
      
      // Convert file to base64 for backend upload
      const base64Data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result;
          // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
          const base64 = result.split(',')[1];
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      
      // Upload via backend proxy
      const uploadRes = await fetch(`${API_BASE}/api/admin/media/upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ 
          key, 
          contentType: file.type,
          data: base64Data 
        })
      });
      
      if (!uploadRes.ok) {
        const errorData = await uploadRes.text();
        console.error('Upload error:', uploadRes.status, errorData);
        throw new Error(`Upload failed: ${uploadRes.status} - ${errorData}`);
      }
      
      const { url: imageUrl } = await uploadRes.json();
      setForm(prev => ({ ...prev, coverImage: imageUrl }));
      setMessage("Image uploaded successfully!");
      console.log('Upload successful:', imageUrl);
    } catch (e) {
      console.error('Upload error:', e);
      setError(e.message || String(e));
    } finally {
      setUploading(false);
    }
  }



  async function signOut() {
    try {
      await fetch(`${API_BASE}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch {}
    clearAuth();
    window.location.href = '/admin';
  }

  return (
    <AuthGuard>
      <div className="admin-dashboard">
        <nav className="admin-nav">
          <div className="admin-nav-content">
            <div className="logo-container">
              <a href="/">
                <img src="/assets/images/hh6logo.png" alt="HH6 Logo" className="logo" />
              </a>
            </div>
            <div className="admin-nav-actions">
              <a href="/blog" target="_blank">View Blog</a>
              <button onClick={signOut}>Sign Out</button>
            </div>
          </div>
        </nav>

        <main className="admin-main">
          <div className="admin-content">
            <aside className="admin-sidebar">
              <h3>Navigation</h3>
              <nav className="sidebar-nav">
                <button 
                  className={activePanel === 'posts' ? 'active' : ''} 
                  onClick={() => setActivePanel('posts')}
                >
                  All Posts
                </button>
                <button 
                  className={activePanel === 'create' ? 'active' : ''} 
                  onClick={() => { setActivePanel('create'); resetForm(); }}
                >
                  Create Post
                </button>
                <button 
                  className={activePanel === 'inquiries' ? 'active' : ''} 
                  onClick={() => setActivePanel('inquiries')}
                >
                  Contact Inquiries
                </button>
                <button 
                  className={activePanel === 'crawl' ? 'active' : ''} 
                  onClick={() => setActivePanel('crawl')}
                >
                  Crawl Test
                </button>
              </nav>
            </aside>

            <div className="admin-panel">
        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}

        {activePanel === 'posts' && (
          <>
            <div className="panel-header">
              <h2>All Posts ({posts.length})</h2>
              <button 
                className="btn btn-primary" 
                onClick={() => { setActivePanel('create'); resetForm(); }}
              >
                Create New Post
              </button>
            </div>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <div className="loading-spinner"></div>
                <p>Loading posts...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="empty-state">
                <h3>No posts yet</h3>
                <p>Create your first blog post to get started.</p>
                <button 
                  className="btn btn-primary" 
                  onClick={() => { setActivePanel('create'); resetForm(); }}
                >
                  Create First Post
                </button>
              </div>
            ) : (
                              <div className="posts-grid">
                {posts.map(post => {
                  // Handle image URL properly (same logic as blog)
                  let imageUrl = '/assets/images/web-design.jpg'; // default
                  if (post.coverImage) {
                    if (post.coverImage.startsWith("http")) {
                      imageUrl = post.coverImage;
                    } else if (post.coverImage.startsWith("/media/")) {
                      // Media paths go through API proxy (same as blog)
                      imageUrl = `${API_BASE}/cdn${post.coverImage}`;
                    } else {
                      // CDN paths
                      imageUrl = `${CDN_BASE}${post.coverImage}`;
                    }
                  }
                  
                  return (
                  <div key={post.slug} className="post-card">
                    <img 
                      src={imageUrl} 
                      alt={post.title}
                      className="post-cover"
                    />
                    <div className="post-info">
                      <h4>{post.title}</h4>
                      <p>{post.description}</p>
                      <div className="post-meta">
                        <span>/{post.slug}</span>
                        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                        {post.tags && post.tags.length > 0 && (
                          <span>{post.tags.join(', ')}</span>
                        )}
                      </div>
                    </div>
                    <div className="post-actions">
                      <a 
                        href={`/blog/${post.slug}`} 
                        target="_blank" 
                        className="btn btn-small btn-outline"
                      >
                        View
                      </a>
                      <button 
                        className="btn btn-small btn-outline" 
                        onClick={() => loadPostForEdit(post.slug)}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn btn-small btn-danger" 
                        onClick={() => deletePost(post.slug)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {activePanel === 'create' && (
          <>
            <div className="panel-header">
              <h2>{editingPost ? 'Edit Post' : 'Create New Post'}</h2>
              <button 
                className="btn btn-secondary" 
                onClick={() => { setActivePanel('posts'); resetForm(); }}
              >
                Cancel
              </button>
            </div>
            <form className="post-form" onSubmit={(e) => { e.preventDefault(); savePost(); }}>
              <div className="form-row">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setForm(prev => ({ 
                        ...prev, 
                        title,
                        slug: prev.slug || generateSlug(title)
                      }));
                    }}
                    className="form-input"
                    placeholder="Enter post title"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Slug</label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value }))}
                    className="form-input"
                    placeholder="post-slug"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                  className="form-input"
                  placeholder="Brief description for SEO and cards"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Tags</label>
                  <div className="tag-input">
                    {form.tags.map(tag => (
                      <span key={tag} className="tag-chip">
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)}>×</button>
                      </span>
                    ))}
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ',') {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                      placeholder="Add tags..."
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Publish Date</label>
                  <input
                    type="datetime-local"
                    value={form.publishedAt}
                    onChange={(e) => setForm(prev => ({ ...prev, publishedAt: e.target.value }))}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Cover Image</label>
                <div 
                  className={`image-upload ${uploading ? 'uploading' : ''}`}
                  onClick={() => !uploading && document.getElementById('image-input').click()}
                >
                  {form.coverImage ? (
                    <img 
                      src={form.coverImage.startsWith('http') ? form.coverImage : `${CDN_BASE}${form.coverImage}`}
                      alt="Cover preview"
                      className="image-preview"
                    />
                  ) : (
                    <div>
                      <p>{uploading ? 'Uploading...' : 'Click to upload cover image'}</p>
                      <small>JPG, PNG, WebP up to 5MB</small>
                    </div>
                  )}
                </div>
                <input
                  id="image-input"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) uploadImage(file);
                  }}
                />
              </div>

              <div className="form-group">
                <label>Content (Markdown)</label>
                <textarea
                  value={form.body}
                  onChange={(e) => setForm(prev => ({ ...prev, body: e.target.value }))}
                  className="form-input form-textarea"
                  placeholder="Write your post content in Markdown..."
                  rows={12}
                />
              </div>

              <button 
                type="submit" 
                disabled={loading || uploading} 
                className="btn btn-primary"
              >
                {loading ? (editingPost ? 'Updating...' : 'Creating...') : (editingPost ? 'Update Post' : 'Create Post')}
              </button>
            </form>
          </>
        )}

        {activePanel === 'inquiries' && (
          <>
            <div className="panel-header">
              <h2>Contact Inquiries ({inquiryPagination.total})</h2>
              <div className="inquiry-filters">
                <select 
                  value={inquiryFilters.status} 
                  onChange={(e) => setInquiryFilters(prev => ({ ...prev, status: e.target.value, page: 1 }))}
                  className="filter-select"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                  <option value="archived">Archived</option>
                </select>
                <input
                  type="text"
                  placeholder="Search inquiries..."
                  value={inquiryFilters.search}
                  onChange={(e) => setInquiryFilters(prev => ({ ...prev, search: e.target.value, page: 1 }))}
                  className="search-input"
                />
              </div>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <div className="loading-spinner"></div>
                <p>Loading inquiries...</p>
              </div>
            ) : inquiries.length === 0 ? (
              <div className="empty-state">
                <h3>No inquiries yet</h3>
                <p>Contact form submissions will appear here.</p>
              </div>
            ) : (
              <div className="inquiries-container">
                <div className="inquiries-list">
                  {inquiries.map(inquiry => (
                    <div key={inquiry.id} className="inquiry-item">
                      <div className="inquiry-header">
                        <div className="inquiry-info">
                          <h4>{inquiry.name}</h4>
                          <p className="inquiry-email">{inquiry.email}</p>
                          <p className="inquiry-date">
                            {new Date(inquiry.createdAt).toLocaleDateString()} at {new Date(inquiry.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                        <div className="inquiry-status">
                          <span 
                            className="status-badge"
                            style={{ backgroundColor: getStatusColor(inquiry.status) }}
                          >
                            {getStatusLabel(inquiry.status)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="inquiry-content">
                        <p className="inquiry-message">{inquiry.message}</p>
                        {inquiry.phone && (
                          <p className="inquiry-phone">📞 {inquiry.phone}</p>
                        )}
                        <p className="inquiry-source">Source: {inquiry.source}</p>
                      </div>
                      
                      <div className="inquiry-actions">
                        <select 
                          value={inquiry.status}
                          onChange={(e) => updateInquiryStatus(inquiry.id, e.target.value)}
                          className="status-select"
                        >
                          <option value="new">Mark as New</option>
                          <option value="read">Mark as Read</option>
                          <option value="replied">Mark as Replied</option>
                          <option value="archived">Archive</option>
                        </select>
                        <button 
                          onClick={() => deleteInquiry(inquiry.id)}
                          className="btn btn-small btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {inquiryPagination.pages > 1 && (
                  <div className="pagination">
                    <button 
                      onClick={() => setInquiryFilters(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                      disabled={inquiryPagination.page === 1}
                      className="btn btn-outline"
                    >
                      Previous
                    </button>
                    <span className="pagination-info">
                      Page {inquiryPagination.page} of {inquiryPagination.pages}
                    </span>
                    <button 
                      onClick={() => setInquiryFilters(prev => ({ ...prev, page: Math.min(inquiryPagination.pages, prev.page + 1) }))}
                      disabled={inquiryPagination.page === inquiryPagination.pages}
                      className="btn btn-outline"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {activePanel === 'crawl' && (
          <div className="crawl-test-panel">
            <div className="panel-header">
              <h2>SEO Crawl Test</h2>
              <p>Test how search engines see your pages</p>
            </div>

            <div className="crawl-input-section">
              <div className="quick-links">
                <h3>Quick Test Pages</h3>
                <div className="quick-link-buttons">
                  {[
                    { name: 'Home', url: '/' },
                    { name: 'Services', url: '/services' },
                    { name: 'Web Design', url: '/services/web-design' },
                    { name: 'Social Media', url: '/services/social-media' },
                    { name: 'Video Editing', url: '/services/video-editing' },
                    { name: 'Graphic Design', url: '/services/graphic-design' },
                    { name: 'Web Hosting', url: '/services/web-hosting' },
                    { name: 'Webmaster', url: '/services/webmaster' },
                    { name: 'SEO Marketing', url: '/services/seo-marketing' },
                    { name: 'About', url: '/about' },
                    { name: 'Contact', url: '/contact' },
                    { name: 'Blog', url: '/blog' }
                  ].map((page) => (
                    <button
                      key={page.url}
                      onClick={() => {
                        setCrawlUrl(page.url);
                        testCrawl(page.url);
                      }}
                      className="quick-link-btn"
                    >
                      {page.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="manual-test">
                <h3>Manual URL Test</h3>
                <div className="url-input-group">
                  <input
                    type="text"
                    value={crawlUrl}
                    onChange={(e) => setCrawlUrl(e.target.value)}
                    placeholder="Enter URL to test (e.g., /services/web-design)"
                    className="url-input"
                  />
                  <button
                    onClick={() => testCrawl(crawlUrl)}
                    disabled={crawlLoading || !crawlUrl}
                    className="test-btn"
                  >
                    {crawlLoading ? 'Testing...' : 'Test URL'}
                  </button>
                </div>
              </div>
            </div>

            {crawlResults && (
              <div className="crawl-results">
                <h3>Test Results</h3>
                
                {/* Google Search Result Preview */}
                <div className="search-preview">
                  <h4>Google Search Result Preview</h4>
                  <div className="search-result-card">
                    <div className="search-url">{crawlResults.url}</div>
                    <div className="search-title">{crawlResults.seo?.title || 'No Title'}</div>
                    <div className="search-description">{crawlResults.seo?.description || 'No description available'}</div>
                    
                    {crawlResults.faqData?.count > 0 && (
                      <div className="rich-snippet-indicator">
                        📋 FAQ Rich Snippets Available ({crawlResults.faqData.count} questions)
                      </div>
                    )}
                    
                    {crawlResults.structuredData?.count > 0 && (
                      <div className="rich-snippet-indicator">
                        🏷️ Structured Data: {crawlResults.structuredData.schemas.join(', ')}
                      </div>
                    )}

                    {crawlResults.faqData?.questions?.length > 0 && (
                      <div className="faq-preview">
                        <div className="faq-header">People also ask:</div>
                        {crawlResults.faqData.questions.slice(0, 3).map((question, index) => (
                          <div key={index} className="faq-question">{question}</div>
                        ))}
                        {crawlResults.faqData.questions.length > 3 && (
                          <div className="faq-more">+{crawlResults.faqData.questions.length - 3} more questions</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Raw Data */}
                <div className="raw-data">
                  <h4>Raw Technical Data</h4>
                  <div className="data-summary">
                    <div className="data-item">
                      <strong>Status:</strong> {crawlResults.status}
                    </div>
                    <div className="data-item">
                      <strong>Content Length:</strong> {crawlResults.contentLength?.toLocaleString()} chars
                    </div>
                    <div className="data-item">
                      <strong>H1 Tags:</strong> {crawlResults.headings?.h1?.length || 0}
                    </div>
                    <div className="data-item">
                      <strong>H2 Tags:</strong> {crawlResults.headings?.h2?.length || 0}
                    </div>
                    <div className="data-item">
                      <strong>Structured Data:</strong> {crawlResults.structuredData?.count || 0} schemas
                    </div>
                    <div className="data-item">
                      <strong>FAQ Schemas:</strong> {crawlResults.faqData?.count || 0}
                    </div>
                  </div>
                  
                  <details className="raw-json">
                    <summary>View Full JSON Data</summary>
                    <pre>{JSON.stringify(crawlResults, null, 2)}</pre>
                  </details>
                </div>
              </div>
            )}
          </div>
        )}
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}

export default AdminDashboard;
