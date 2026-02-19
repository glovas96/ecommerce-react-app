import { Typography } from '@mui/material';

import { useOrderDetails } from '@/entities/orders/hooks/useOrderDetails';
import { OrderDetails } from '@/features/orders/ui/OrderDetails';
import { StyledMessageSection } from '@/features/orders/ui/orderDetailsStyles';
import { StyledPageContainer } from '@/shared/styles/StyledPageContainer';
import FullPageLoader from '@/shared/ui/FullPageLoader';

const OrderDetailsPage = () => {
  const { order, isLoading, error } = useOrderDetails();

  if (isLoading) {
    return (
      <StyledPageContainer>
        <FullPageLoader />
      </StyledPageContainer>
    );
  }

  if (error) {
    return (
      <StyledPageContainer>
        <StyledMessageSection>
          <Typography variant="h5" color="error">
            Order not found
          </Typography>
        </StyledMessageSection>
      </StyledPageContainer>
    );
  }

  if (!order) {
    return (
      <StyledPageContainer>
        <StyledMessageSection>
          <Typography variant="h5" color="text.secondary">
            No order selected
          </Typography>
        </StyledMessageSection>
      </StyledPageContainer>
    );
  }

  return <OrderDetails order={order} />;
};

export default OrderDetailsPage;
