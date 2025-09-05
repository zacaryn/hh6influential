'use client';

import React from "react";
import { exchangeCodeForTokens, saveAuth } from "../../../utils/auth";

function AdminCallback() {
  const [status, setStatus] = React.useState('processing');
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const handleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        const error = urlParams.get('error');

        if (error) {
          throw new Error(`OAuth error: ${error}`);
        }

        if (!code) {
          throw new Error('No authorization code received');
        }

        // Get stored PKCE values
        const codeVerifier = localStorage.getItem('pkce_code_verifier');
        const storedState = localStorage.getItem('oauth_state');

        if (!codeVerifier || state !== storedState) {
          throw new Error('Invalid OAuth state or missing code verifier');
        }

        // Exchange code for tokens
        const tokens = await exchangeCodeForTokens({
          domain: process.env.NEXT_PUBLIC_AWS_COGNITO_DOMAIN,
          clientId: process.env.NEXT_PUBLIC_AWS_CLIENT_ID,
          redirectUri: process.env.NEXT_PUBLIC_ADMIN_REDIRECT_URI || window.location.origin + '/admin/callback',
          code,
          codeVerifier
        });

        // Save tokens
        saveAuth(tokens);

        // Clean up stored values
        localStorage.removeItem('pkce_code_verifier');
        localStorage.removeItem('oauth_state');

        setStatus('success');
        
        // Redirect to dashboard
        setTimeout(() => {
          window.location.href = '/admin/dashboard';
        }, 2000);

      } catch (err) {
        console.error('Callback error:', err);
        setError(err.message || 'Authentication failed');
        setStatus('error');
      }
    };

    handleCallback();
  }, []);

  if (status === 'processing') {
    return (
      <div className="admin-callback-container">
        <div className="admin-callback-card">
          <div className="loading-spinner"></div>
          <h2>Processing authentication...</h2>
          <p>Please wait while we complete your sign-in.</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="admin-callback-container">
        <div className="admin-callback-card error">
          <h2>Authentication Failed</h2>
          <p>{error}</p>
          <a href="/admin" className="btn btn-primary">Try Again</a>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-callback-container">
      <div className="admin-callback-card success">
        <h2>Authentication Successful!</h2>
        <p>Redirecting to dashboard...</p>
      </div>
    </div>
  );
}

export default AdminCallback;
