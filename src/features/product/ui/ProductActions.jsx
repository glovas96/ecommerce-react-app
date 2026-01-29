import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton, Button } from '@mui/material';
import React from 'react';

import {
  StyledActionGroup,
  StyledQuantityGroup,
  StyledPrimaryAction,
  StyledQuantityValue,
} from '@/features/product/ui/productStyles';

// Handles quantity controls and call-to-action buttons.
const ProductActions = ({ quantity, increase, decrease, onAdd, onBuyNow }) => (
  <React.Fragment>
    <StyledActionGroup>
      <StyledQuantityGroup>
        <IconButton onClick={decrease}>
          <RemoveIcon />
        </IconButton>

        <StyledQuantityValue variant="h6">{quantity}</StyledQuantityValue>

        <IconButton onClick={increase}>
          <AddIcon />
        </IconButton>
      </StyledQuantityGroup>

      <StyledPrimaryAction variant="contained" size="large" onClick={onAdd}>
        Add to cart
      </StyledPrimaryAction>

      <Button variant="outlined" size="large" onClick={onBuyNow}>
        Buy now
      </Button>
    </StyledActionGroup>
  </React.Fragment>
);

export default ProductActions;
