import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import {
  StyledItemCard,
  StyledItemImage,
  StyledItemList,
  StyledMetadataText,
  StyledSectionDivider,
  StyledSectionSpacing,
  StyledItemDetails,
  StyledStatusChip,
} from '@/features/orders/ui/orderDetailsStyles';
import { StyledPageContainer } from '@/shared/styles/StyledPageContainer';

const statusColorMap = {
  processing: 'info',
  paid: 'success',
  shipped: 'warning',
  delivered: 'success',
  cancelled: 'error',
};

const getStatusColor = (status) => statusColorMap[status] || 'default';

// Render detailed order layout
export const OrderDetails = ({ order }) => (
  <StyledPageContainer>
    {/* Header info */}
    <Typography variant="h4" gutterBottom>
      {order.label}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {order.date}
    </Typography>
    <StyledSectionSpacing>
      <StyledStatusChip
        label={order.statusLabel}
        color={getStatusColor(order.status)}
        size="small"
      />
    </StyledSectionSpacing>

    <StyledSectionDivider />

    {/* Item list */}
    <Typography variant="h5">Items</Typography>
    <StyledItemList>
      {order.items.map((item) => (
        <StyledItemCard
          key={item.id}
          component={Link}
          to={`/product/${item.id}`}
          variant="listItem"
        >
          <StyledItemImage component="img" image={item.thumbnail} alt={item.name} />

          <StyledItemDetails>
            <Typography variant="h6">{item.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              Price: ${item.price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Quantity: {item.quantity}
            </Typography>
            <StyledMetadataText>
              Subtotal: <strong>${Number(item.total).toFixed(2)}</strong>
            </StyledMetadataText>
          </StyledItemDetails>
        </StyledItemCard>
      ))}
    </StyledItemList>

    <StyledSectionDivider />

    {/* Summary section */}
    <Typography variant="h5">Summary</Typography>
    <Typography variant="h6">Total: ${Number(order.total ?? 0).toFixed(2)}</Typography>

    <StyledSectionDivider />

    {/* Shipping address */}
    <Typography variant="h5">Shipping</Typography>
    {order.address ? (
      <Typography>
        {[order.address.address, order.address.city, order.address.postalCode]
          .filter(Boolean)
          .join(', ')}
      </Typography>
    ) : (
      <Typography>No address on file</Typography>
    )}

    <StyledSectionDivider />

    {/* Payment method */}
    <Typography variant="h5">Payment</Typography>
    <Typography>{order.paymentMethod}</Typography>
  </StyledPageContainer>
);
