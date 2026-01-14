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
      <StyledBrandText variant="h6" component={Link} to="/">
        E‑Shop
      </StyledBrandText>
      <NavigationActions />
    </StyledToolbar>
  </StyledAppBar>
);

export default Navigation;
