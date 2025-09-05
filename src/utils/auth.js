// Minimal PKCE + Cognito Hosted UI helpers

function base64urlEncode(arrayBuffer) {
  const bytes = new Uint8Array(arrayBuffer);
  let str = '';
  for (let i = 0; i < bytes.byteLength; i += 1) {
    str += String.fromCharCode(bytes[i]);
  }
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export async function generateCodeVerifierAndChallenge() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  const verifier = base64urlEncode(array.buffer);
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  const challenge = base64urlEncode(digest);
  return { verifier, challenge };
}

export function buildAuthorizeUrl({ domain, clientId, redirectUri, codeChallenge, state }) {
  const url = new URL(`${domain.replace(/\/$/, '')}/oauth2/authorize`);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('scope', 'openid email profile');
  url.searchParams.set('code_challenge_method', 'S256');
  url.searchParams.set('code_challenge', codeChallenge);
  url.searchParams.set('state', state);
  return url.toString();
}

export async function exchangeCodeForTokens({ domain, clientId, redirectUri, code, codeVerifier }) {
  const tokenUrl = `${domain.replace(/\/$/, '')}/oauth2/token`;
  const body = new URLSearchParams();
  body.set('grant_type', 'authorization_code');
  body.set('client_id', clientId);
  body.set('code', code);
  body.set('redirect_uri', redirectUri);
  body.set('code_verifier', codeVerifier);
  const res = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString()
  });
  if (!res.ok) {
    throw new Error(`Token exchange failed: ${res.status}`);
  }
  return res.json();
}

export function saveAuth(tokens) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('hh6_id_token', tokens.id_token || '');
    localStorage.setItem('hh6_access_token', tokens.access_token || '');
    localStorage.setItem('hh6_refresh_token', tokens.refresh_token || '');
  }
}

export function getIdToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('hh6_id_token') || '';
  }
  return '';
}

export function clearAuth() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('hh6_id_token');
    localStorage.removeItem('hh6_access_token');
    localStorage.removeItem('hh6_refresh_token');
  }
}
