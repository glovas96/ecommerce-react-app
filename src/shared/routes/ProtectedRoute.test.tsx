import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import type { AuthContextValue } from '@/shared/context/authContext.types';
import { useAuth } from '@/shared/hooks/useAuth';
import ProtectedRoute from '@/shared/routes/ProtectedRoute';

vi.mock('@/shared/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('@/shared/ui/FullPageLoader', () => {
  const MockFullPageLoader = () => <div>Loading</div>;
  MockFullPageLoader.displayName = 'MockFullPageLoader';
  return {
    default: MockFullPageLoader,
  };
});

const mockUseAuth = vi.mocked(useAuth);

const baseAuthValue: AuthContextValue = {
  user: null,
  loading: false,
  logout: vi.fn(),
  cartSyncing: false,
  cartReady: true,
};

const renderRoute = () =>
  render(
    <MemoryRouter initialEntries={['/orders?foo=1']}>
      <Routes>
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <div>Protected</div>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<div>Login Page</div>} />
      </Routes>
    </MemoryRouter>,
  );

describe('ProtectedRoute', () => {
  it('shows loader while auth is loading', () => {
    mockUseAuth.mockReturnValue({ ...baseAuthValue, loading: true });
    renderRoute();
    expect(screen.getByText('Loading')).toBeDefined();
  });

  it('redirects to login when user missing', () => {
    mockUseAuth.mockReturnValue(baseAuthValue);
    renderRoute();
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  it('renders children when user present', () => {
    mockUseAuth.mockReturnValue({
      ...baseAuthValue,
      user: { uid: 'user-1', email: 'user@example.com', name: 'Test User', roles: [] },
    });
    renderRoute();
    expect(screen.getByText('Protected')).toBeInTheDocument();
  });
});
