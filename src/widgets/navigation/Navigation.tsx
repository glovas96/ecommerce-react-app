import { Link } from 'react-router-dom';

import NavigationActions from '@/widgets/navigation/NavigationActions';
import {
  StyledAppBar,
  StyledToolbar,
  StyledBrandText,
} from '@/widgets/navigation/navigationStyles';

// Global navigation bar with brand and actions
const Navigation = () => (
  <StyledAppBar position="static">
    <StyledToolbar>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <StyledBrandText variant="h6">E‑Shop</StyledBrandText>
      </Link>
      <NavigationActions />
    </StyledToolbar>
  </StyledAppBar>
);

export default Navigation;
