import { InputLabel, MenuItem, Select, Typography } from '@mui/material';
import React from 'react';

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
      <React.Fragment>
        <StyledPageContainer>
          <FullPageLoader />
        </StyledPageContainer>
      </React.Fragment>
    );

  if (!orders.length) {
    return (
      <React.Fragment>
        <OrdersEmptyState />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
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
                onChange={(e) => setStatusFilter(e.target.value)}
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
    </React.Fragment>
  );
};

export default OrdersListPage;
