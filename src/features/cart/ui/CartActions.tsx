import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

import type { CartActionsProps } from '@/features/cart/types';
import { StyledActionGroup } from '@/features/cart/ui/cartStyles';

// Renders bottom action buttons.
const CartActions = ({ onClear }: CartActionsProps) => (
  <StyledActionGroup>
    <Button variant="contained" size="large" component={Link} to="/checkout">
      Proceed to checkout
    </Button>
    <Button variant="outlined" size="large" color="error" onClick={onClear}>
      Clear cart
    </Button>
  </StyledActionGroup>
);

export default CartActions;
