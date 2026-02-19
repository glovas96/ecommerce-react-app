import { Typography, Button, CircularProgress } from '@mui/material';

import type { OrderSummaryProps } from '@/features/checkout/types';
import {
  StyledSummaryBox,
  StyledSummaryRow,
  StyledSummaryDivider,
} from '@/features/checkout/ui/checkoutStyles';

// Shows totals and triggers checkout.
const OrderSummary = ({
  itemTotal,
  shippingCost,
  taxAmount,
  summaryTotal,
  onPlaceOrder,
  loading,
}: OrderSummaryProps) => (
  <>
    <Typography variant="h5" gutterBottom>
      5. Order summary
    </Typography>

    <StyledSummaryBox>
      <StyledSummaryRow>
        <Typography>Items:</Typography>
        <Typography>${itemTotal.toFixed(2)}</Typography>
      </StyledSummaryRow>
      <StyledSummaryRow>
        <Typography>Shipping:</Typography>
        <Typography>${shippingCost.toFixed(2)}</Typography>
      </StyledSummaryRow>
      <StyledSummaryRow>
        <Typography>Tax:</Typography>
        <Typography>${taxAmount.toFixed(2)}</Typography>
      </StyledSummaryRow>

      <StyledSummaryDivider />

      <StyledSummaryRow>
        <Typography variant="h6">Order total:</Typography>
        <Typography variant="h6">${summaryTotal.toFixed(2)}</Typography>
      </StyledSummaryRow>
    </StyledSummaryBox>

    <Button
      type="button"
      variant="contained"
      size="large"
      fullWidth
      onClick={onPlaceOrder}
      disabled={loading}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : 'Place your order'}
    </Button>
  </>
);

export default OrderSummary;
