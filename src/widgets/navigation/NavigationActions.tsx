import { Badge, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { useLogout } from '@/entities/auth/hooks/useLogout';
import { selectCartItems } from '@/entities/cart/selectors/cartSelectors';
import { useAuth } from '@/shared/hooks/useAuth';
import {
  StyledActionsContainer,
  StyledLoaderBox,
  StyledNavButton,
} from '@/widgets/navigation/navigationActionsStyles';

const NavigationActions = () => {
  // Auth state and cart selectors
  const { user, loading, logout } = useAuth();
  const items = useSelector(selectCartItems);
  const handleLogout = useLogout(logout);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);
  const redirectTo = isAuthPage ? null : encodeURIComponent(location.pathname + location.search);

  // Show fallback spinner while auth data loads
  if (loading && !user) {
    return (
      <StyledLoaderBox>
        <CircularProgress size={20} color="inherit" />
      </StyledLoaderBox>
    );
  }

  // Navigation action buttons
  return (
    <StyledActionsContainer>
      <Link to="/catalog" style={{ textDecoration: 'none', color: 'inherit' }}>
        <StyledNavButton>Catalog</StyledNavButton>
      </Link>

      <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
        <StyledNavButton>
          <Badge badgeContent={cartCount} color="error">
            Cart
          </Badge>
        </StyledNavButton>
      </Link>

      {user ? (
        <>
          <Link to="/orders" style={{ textDecoration: 'none', color: 'inherit' }}>
            <StyledNavButton>{user.email}</StyledNavButton>
          </Link>
          <StyledNavButton onClick={handleLogout}>Logout</StyledNavButton>
        </>
      ) : (
        <>
          <Link
            to={redirectTo ? `/login?redirectTo=${redirectTo}` : '/login'}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <StyledNavButton>Login</StyledNavButton>
          </Link>
          <Link
            to={redirectTo ? `/register?redirectTo=${redirectTo}` : '/register'}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <StyledNavButton>Register</StyledNavButton>
          </Link>
        </>
      )}
    </StyledActionsContainer>
  );
};

export default NavigationActions;
