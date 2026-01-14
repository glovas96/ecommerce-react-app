import { Typography } from '@mui/material';

import { StyledMessageSection } from '@/features/orders/ui/orderDetailsStyles';
import { StyledPageContainer } from '@/shared/styles/StyledPageContainer';

const OrdersEmptyState = () => (
  <StyledPageContainer>
    <StyledMessageSection>
      <Typography variant="h4" gutterBottom>
        Your orders are empty
      </Typography>
      <Typography color="text.secondary">Add products to your cart to see them here</Typography>
    </StyledMessageSection>
  </StyledPageContainer>
);

export default OrdersEmptyState;
