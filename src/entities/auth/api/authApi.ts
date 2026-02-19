import type { AuthApiResponse } from '@/entities/auth/types';

export const fetchCurrentUser = async (): Promise<AuthApiResponse> => {
  const res = await fetch('/api/auth/me');
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
};

export const logoutRequest = async (): Promise<void> => {
  await fetch('/api/auth/logout', { method: 'POST' });
};
