import { fetchCurrentUser, logoutRequest } from '@/entities/auth/api/authApi';

// Normalize backend response
const normalizeUser = (payload) => ({
  id: payload.id,
  email: payload.email,
  name: payload.name,
  roles: payload.roles ?? [],
});

// Load authenticated user
export const loadUser = async () => {
  const data = await fetchCurrentUser();
  return { user: normalizeUser(data.user) };
};

// Perform logout cleanup
export const logout = async () => {
  await logoutRequest();
  return { user: null };
};
