import type { SelectChangeEvent } from '@mui/material';
import { InputLabel, MenuItem, Select, Typography } from '@mui/material';

import { useOrdersList } from '@/entities/orders/hooks/useOrdersList';
import OrdersEmptyState from '@/features/orders/ui/OrdersEmptyState';
import { OrdersList } from '@/features/orders/ui/OrdersList';
import {
  PageContent,
  FiltersRow,
  StatusControl,
  HeaderTitle,
} from '@/features/orders/ui/ordersStyles';
import { StyledPageContainer } from '@/shared/styles/StyledPageContainer';
import FullPageLoader from '@/shared/ui/FullPageLoader';

// Filters available for orders list
const statusOptions = [
  { label: 'All', value: '' },
  { label: 'Processing', value: 'processing' },
  { label: 'Paid', value: 'paid' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Cancelled', value: 'cancelled' },
];

const OrdersListPage = () => {
  const { orders, statusFilter, isLoading, error, setStatusFilter } = useOrdersList();

  // Show loading state
  if (isLoading)
    return (
      <StyledPageContainer>
        <FullPageLoader />
      </StyledPageContainer>
    );

  if (!orders.length) {
    return <OrdersEmptyState />;
  }

  return (
    <StyledPageContainer>
      <PageContent>
        <HeaderTitle variant="h4">My Orders</HeaderTitle>

        <FiltersRow>
          <StatusControl size="small">
            <InputLabel id="status-filter-label">Status</InputLabel>
            <Select
              labelId="status-filter-label"
              id="status-filter"
              value={statusFilter}
              label="Status"
              onChange={(event: SelectChangeEvent<string>) => setStatusFilter(event.target.value)}
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </StatusControl>
        </FiltersRow>

        {error ? (
          <Typography color="error">Failed to load orders.</Typography>
        ) : (
          <OrdersList orders={orders} />
        )}
      </PageContent>
    </StyledPageContainer>
  );
};

export default OrdersListPage;
