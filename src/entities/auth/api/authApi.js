// Fetch current user profile
export const fetchCurrentUser = async () => {
  const res = await fetch('/api/auth/me');
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json(); // { user: {...} }
};

// Invalidate the session
export const logoutRequest = async () => {
  await fetch('/api/auth/logout', { method: 'POST' });
};
