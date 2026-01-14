import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '@/shared/hooks/useAuth';
import FullPageLoader from '@/shared/ui/FullPageLoader';

// Guard that redirects unauthenticated users
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <FullPageLoader />;

  if (!user) {
    const redirectTo = `${location.pathname}${location.search}`;
    return <Navigate to={`/login?redirectTo=${encodeURIComponent(redirectTo)}`} replace />;
  }

  return children;
};

export default ProtectedRoute;
