import { fetchCurrentUser, logoutRequest } from '@/entities/auth/api/authApi';
import type { AuthApiResponse, AuthResult, AuthUser } from '@/entities/auth/types';

const normalizeUser = (payload: AuthApiResponse['user']): AuthUser => ({
  id: payload?.id ?? '',
  uid: payload?.id ?? '',
  email: payload?.email ?? '',
  name: payload?.name ?? '',
  roles: payload?.roles ?? [],
});

export const loadUser = async (): Promise<AuthResult> => {
  const data = await fetchCurrentUser();
  if (!data.user) {
    return { user: null };
  }
  return { user: normalizeUser(data.user) };
};

export const logout = async (): Promise<AuthResult> => {
  await logoutRequest();
  return { user: null };
};
