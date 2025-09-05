'use client';

import React from "react";
import { generateCodeVerifierAndChallenge, buildAuthorizeUrl, getIdToken, clearAuth, saveAuth } from "../../utils/auth";
import Logo from "../../components/Logo";
import "../../styles/Admin.css";

function AdminLogin() {
  const [credentials, setCredentials] = React.useState({ username: '', password: '' });
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [npSession, setNpSession] = React.useState("");
  const [npUsername, setNpUsername] = React.useState("");
  const [newPassword, setNewPassword] = React.useState({ password: '', confirm: '' });
  const [isLoggedIn, setIsLoggedIn] = React.useState(null);
  const [checkingLogin, setCheckingLogin] = React.useState(true);

  React.useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL?.replace(/\/$/, '') || 'http://localhost:8080';
        const response = await fetch(`${backendUrl}/api/admin/posts`, {
          credentials: 'include'
        });
        setIsLoggedIn(response.ok);
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setCheckingLogin(false);
      }
    };

    checkLoginStatus();
  }, []);

  async function handleLogin() {
    if (!credentials.username || !credentials.password) {
      setError('Please enter both username and password');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL?.replace(/\/$/, '') || 'http://localhost:8080';
      const res = await fetch(`${backendUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username: credentials.username, password: credentials.password })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.challenge === 'NEW_PASSWORD_REQUIRED') {
        setNpSession(data.session);
        setNpUsername(data.username);
      } else if (res.ok) {
        // Login successful, session cookies are set by backend
        console.log('Login successful, redirecting to dashboard');
        window.location.href = '/admin/dashboard';
      } else {
        setError(data?.detail || 'Login failed');
      }
    } catch (e) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleNewPassword() {
    if (!newPassword.password || newPassword.password !== newPassword.confirm) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL?.replace(/\/$/, '') || 'http://localhost:8080';
      const res = await fetch(`${backendUrl}/api/auth/complete-new-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username: npUsername, newPassword: newPassword.password, session: npSession })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        // New password set successfully, session cookies are set by backend
        console.log('New password set, redirecting to dashboard');
        window.location.href = '/admin/dashboard';
      } else {
        setError(data?.detail || 'Failed to set new password');
      }
    } catch (e) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  // Show loading while checking login status
  if (checkingLogin) {
    return (
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="admin-header">
            <div className="loading-spinner" style={{
              width: '40px',
              height: '40px',
              border: '3px solid #f3f3f3',
              borderTop: '3px solid #002a6e',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '20px auto'
            }}></div>
            <p>Checking login status...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoggedIn) {
    return (
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="admin-header">
            <div className="admin-logo admin-logo-large admin-logo-centered">
              <img src="/assets/icons/hh6logo.svg" alt="HH6 Logo" className="admin-logo-svg" />
            </div>
            <p>Secure admin dashboard access</p>
          </div>
          <div className="admin-actions">
            <a href="/admin/dashboard" className="btn btn-primary">Go to Dashboard</a>
            <button 
              onClick={() => { clearAuth(); window.location.reload(); }}
              className="btn btn-secondary"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (npSession) {
    return (
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="admin-header">
            <h1>Set New Password</h1>
            <p>Please set a new password for your account</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); handleNewPassword(); }} className="admin-form">
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                value={newPassword.password}
                onChange={(e) => setNewPassword(prev => ({ ...prev, password: e.target.value }))}
                className="form-input"
                placeholder="Enter new password"
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                value={newPassword.confirm}
                onChange={(e) => setNewPassword(prev => ({ ...prev, confirm: e.target.value }))}
                className="form-input"
                placeholder="Confirm new password"
                required
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" disabled={loading} className="btn btn-primary btn-full">
              {loading ? 'Setting Password...' : 'Set Password'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-header">
          <div className="admin-logo admin-logo-large admin-logo-centered">
            <img src="/assets/icons/hh6logo.svg" alt="HH6 Logo" className="admin-logo-svg" />
          </div>
          <p>Secure admin dashboard access</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="admin-form">
          <div className="form-group">
            <label>Username / Email</label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
              className="form-input"
              placeholder="Enter your username or email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
              className="form-input"
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" disabled={loading} className="btn btn-primary btn-full">
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
