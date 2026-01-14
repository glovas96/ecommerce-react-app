import { Button, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import OrdersEmptyState from '@/features/orders/ui/OrdersEmptyState';
import {
  ActionsRow,
  ChipWrapper,
  DetailText,
  ListWrapper,
  MetadataText,
  OrderCard,
  StatusChip,
} from '@/features/orders/ui/ordersStyles';

const statusColorMap = {
  processing: 'info',
  paid: 'success',
  shipped: 'warning',
  delivered: 'success',
  cancelled: 'error',
};

const getStatusColor = (status) => statusColorMap[status] ?? 'default';
export const OrdersList = ({ orders }) => {
  if (!orders.length) {
    return <OrdersEmptyState />;
  }

  return (
    <ListWrapper>
      {orders.map((order) => (
        <OrderCard component="article" key={order.id} variant="listItem">
          <CardContent>
            <Typography variant="h6">{order.label}</Typography>
            <MetadataText variant="body2" color="text.secondary">
              {order.date}
            </MetadataText>
            <MetadataText>Total: ${Number(order.total ?? 0).toFixed(2)}</MetadataText>
            <ChipWrapper>
              <StatusChip
                label={order.statusLabel}
                color={getStatusColor(order.status)}
                size="small"
              />
            </ChipWrapper>
            <DetailText variant="body2">{order.itemsCount} items</DetailText>
          </CardContent>
          <ActionsRow>
            <Button variant="outlined" size="small" component={Link} to={`/orders/${order.id}`}>
              View details
            </Button>
          </ActionsRow>
        </OrderCard>
      ))}
    </ListWrapper>
  );
};
