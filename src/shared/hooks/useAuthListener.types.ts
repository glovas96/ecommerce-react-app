export interface AuthUser {
  uid: string;
  email: string | null;
  name: string;
  roles: string[];
}

export interface UseAuthListenerResult {
  user: AuthUser | null;
  loading: boolean;
  logout: () => Promise<void>;
}
