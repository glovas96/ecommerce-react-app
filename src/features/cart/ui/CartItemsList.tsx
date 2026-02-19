import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import { Typography, IconButton } from '@mui/material';

import type { CartItemsListProps } from '@/features/cart/types';
import {
  StyledCartList,
  StyledCartCard,
  StyledCartItemLink,
  StyledCartItemImage,
  StyledCartInfo,
  StyledQuantityColumn,
  StyledQuantityControls,
  StyledQuantityValue,
  StyledItemPrice,
  StyledItemOldPrice,
  StyledItemSubtotal,
  StyledRemoveButton,
} from '@/features/cart/ui/cartStyles';

// Renders each item with quantity controls.
const CartItemsList = ({ items = [], decrease, increase, onRemove }: CartItemsListProps) => (
  <StyledCartList>
    {items.map((item) => {
      const discount = item.discountPercentage ?? 0;
      const oldPrice = discount ? (item.price / (1 - discount / 100)).toFixed(2) : null;

      return (
        <StyledCartCard key={item.id} variant="listItem">
          <StyledCartItemLink to={`/product/${item.id}`}>
            <StyledCartItemImage src={item.thumbnail} alt={item.title} />
            <StyledCartInfo>
              <Typography variant="h6">{item.title}</Typography>
              <StyledItemPrice variant="body2">${item.price.toFixed(2)} each</StyledItemPrice>
              {oldPrice && (
                <StyledItemOldPrice variant="body2">
                  ${oldPrice} ({discount}% off)
                </StyledItemOldPrice>
              )}
              <StyledItemSubtotal>
                Subtotal: <strong>${(item.price * item.quantity).toFixed(2)}</strong>
              </StyledItemSubtotal>
            </StyledCartInfo>
          </StyledCartItemLink>

          <StyledQuantityColumn>
            <Typography color="text.secondary">Quantity</Typography>
            <StyledQuantityControls>
              <IconButton onClick={() => decrease(item.id, item.quantity)}>
                <RemoveIcon />
              </IconButton>
              <StyledQuantityValue variant="h6">{item.quantity}</StyledQuantityValue>
              <IconButton onClick={() => increase(item.id, item.quantity)}>
                <AddIcon />
              </IconButton>
            </StyledQuantityControls>
          </StyledQuantityColumn>

          <StyledRemoveButton onClick={() => onRemove(item.id)}>
            <DeleteIcon color="error" />
          </StyledRemoveButton>
        </StyledCartCard>
      );
    })}
  </StyledCartList>
);

export default CartItemsList;
