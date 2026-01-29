import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import { useAuth } from '@/shared/hooks/useAuth';
import ProtectedRoute from '@/shared/routes/ProtectedRoute';

vi.mock('@/shared/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));
const MockFullPageLoader = () => <div>Loading</div>;
MockFullPageLoader.displayName = 'MockFullPageLoader';

vi.mock('@/shared/ui/FullPageLoader', () => {
  const MockFullPageLoader = () => <div>Loading</div>;
  MockFullPageLoader.displayName = 'MockFullPageLoader';
  return {
    default: MockFullPageLoader,
  };
});

const renderRoute = () =>
  render(
    <React.Fragment>
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
      </MemoryRouter>
    </React.Fragment>,
  );

describe('ProtectedRoute', () => {
  it('shows loader while auth is loading', () => {
    useAuth.mockReturnValue({ user: null, loading: true });
    renderRoute();
    expect(screen.getByText('Loading')).toBeDefined();
  });

  it('redirects to login when user missing', () => {
    useAuth.mockReturnValue({ user: null, loading: false });
    renderRoute();
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  it('renders children when user present', () => {
    useAuth.mockReturnValue({ user: { uid: 'user-1' }, loading: false });
    renderRoute();
    expect(screen.getByText('Protected')).toBeInTheDocument();
  });
});
