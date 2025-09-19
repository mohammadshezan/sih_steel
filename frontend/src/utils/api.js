export async function apiFetch(url, options = {}) {
  const token = localStorage.getItem('token');
  const headers = { ...(options.headers || {}), 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const data = await res.json();
      msg = data.error || msg;
    } catch {}
    throw new Error(msg);
  }
  try {
    return await res.json();
  } catch {
    return null;
  }
}