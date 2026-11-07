const BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

async function call(path, opts = {}) {
  const res = await fetch(BASE + path, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...opts,
  });
  if (!res.ok) throw new Error('request failed');
  return res.json();
}

export const listTrips = () => call('/trips');
export const getTrip = (id) => call(`/trips/${id}`);
export const searchTrips = (term) => call(`/trips/search?term=${encodeURIComponent(term)}`);
export const login = (email, password) =>
  call('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
