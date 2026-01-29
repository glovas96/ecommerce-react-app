import { Badge, CircularProgress } from '@mui/material';
import React from 'react';
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
      <React.Fragment>
        <StyledLoaderBox>
          <CircularProgress size={20} color="inherit" />
        </StyledLoaderBox>
      </React.Fragment>
    );
  }

  // Navigation action buttons
  return (
    <React.Fragment>
      <StyledActionsContainer>
        <StyledNavButton component={Link} to="/catalog">
          Catalog
        </StyledNavButton>

        <StyledNavButton component={Link} to="/cart">
          <Badge badgeContent={cartCount} color="error">
            Cart
          </Badge>
        </StyledNavButton>

        {user ? (
          <>
            <StyledNavButton component={Link} to="/orders">
              {user.email}
            </StyledNavButton>
            <StyledNavButton onClick={handleLogout}>Logout</StyledNavButton>
          </>
        ) : (
          <>
            <StyledNavButton
              component={Link}
              to={redirectTo ? `/login?redirectTo=${redirectTo}` : '/login'}
            >
              Login
            </StyledNavButton>
            <StyledNavButton
              component={Link}
              to={redirectTo ? `/register?redirectTo=${redirectTo}` : '/register'}
            >
              Register
            </StyledNavButton>
          </>
        )}
      </StyledActionsContainer>
    </React.Fragment>
  );
};

export default NavigationActions;
