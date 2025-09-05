'use client';

import React from "react";
import { getIdToken } from "../utils/auth";

function AuthGuard({ children }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL?.replace(/\/$/, '') || 'http://localhost:8080';
        const response = await fetch(`${backendUrl}/api/admin/posts`, {
          credentials: 'include'
        });
        
        setIsAuthenticated(response.ok);
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="auth-guard-loading">
        <div className="loading-spinner"></div>
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to admin login
    if (typeof window !== 'undefined') {
      window.location.href = '/admin';
    }
    return (
      <div className="auth-guard-redirect">
        <p>Redirecting to login...</p>
      </div>
    );
  }

  return <>{children}</>;
}

export default AuthGuard;
