// Shape returned from backend user endpoint
export interface AuthBackendUser {
  id: string;
  email: string;
  name: string;
  roles?: string[];
  [key: string]: unknown;
}

// API response structure
export interface AuthApiResponse {
  user: AuthBackendUser | null;
}

// Normalized user consumed in app
export interface AuthUser {
  id: string;
  uid: string;
  email: string;
  name: string;
  roles: string[];
}

// Result returned by auth services
export interface AuthResult {
  user: AuthUser | null;
}
