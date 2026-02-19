import { Typography } from '@mui/material';

import type { CartSummaryProps } from '@/features/cart/types';
import {
  StyledSummaryBox,
  StyledSummaryRow,
  StyledSummaryDivider,
} from '@/features/cart/ui/cartStyles';

// Displays totals for the cart.
const CartSummary = ({ originalTotal, discount, total }: CartSummaryProps) => (
  <StyledSummaryBox>
    <Typography variant="h6">Summary</Typography>
    <StyledSummaryRow>
      <Typography color="text.secondary">Old price total:</Typography>
      <Typography>${originalTotal.toFixed(2)}</Typography>
    </StyledSummaryRow>
    <StyledSummaryRow>
      <Typography color="text.secondary">Discount:</Typography>
      <Typography color="error">-${discount.toFixed(2)}</Typography>
    </StyledSummaryRow>
    <StyledSummaryDivider />
    <StyledSummaryRow>
      <Typography variant="h6">Total:</Typography>
      <Typography variant="h6">${total.toFixed(2)}</Typography>
    </StyledSummaryRow>
  </StyledSummaryBox>
);

export default CartSummary;
