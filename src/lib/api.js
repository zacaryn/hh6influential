const API_BASE = (process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:8080').replace(/\/$/, '');

export function getApiBase() {
  return API_BASE;
}

export async function fetchJson(path, init = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    // Server-side fetch defaults
    cache: 'force-cache',
    ...init,
  });
  if (!res.ok) throw new Error(`Request failed ${res.status} ${path}`);
  return res.json();
}


