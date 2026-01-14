import { Typography } from '@mui/material';

import { StyledMessageSection } from '@/features/cart/ui/cartStyles';
import { StyledPageContainer } from '@/shared/styles/StyledPageContainer';

// Displays message when cart has no items.
const CartEmptyState = () => (
  <StyledPageContainer>
    <StyledMessageSection>
      <Typography variant="h4" gutterBottom>
        Your cart is empty
      </Typography>
      <Typography color="text.secondary">Add products to your cart to see them here</Typography>
    </StyledMessageSection>
  </StyledPageContainer>
);

export default CartEmptyState;
