import { Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectCartItems,
  selectCartTotal,
  selectCartDiscount,
  selectCartOriginalTotal,
  selectCartHydrated,
} from '@/entities/cart/selectors/cartSelectors';
import { removeFromCart, updateQuantity, clearCart } from '@/entities/cart/slices/cartSlice';
import type { CartItem } from '@/entities/cart/types';
import CartActions from '@/features/cart/ui/CartActions';
import CartEmptyState from '@/features/cart/ui/CartEmptyState';
import CartItemsList from '@/features/cart/ui/CartItemsList';
import { StyledSectionDivider } from '@/features/cart/ui/cartStyles';
import CartSummary from '@/features/cart/ui/CartSummary';
import type { AppDispatch } from '@/shared/store';
import { StyledPageContainer } from '@/shared/styles/StyledPageContainer';
import FullPageLoader from '@/shared/ui/FullPageLoader';

const CartPage = () => {
  // Get cart items from Redux
  const items = useSelector(selectCartItems);

  // Get totals
  const discount = useSelector(selectCartDiscount);
  const total = useSelector(selectCartTotal);
  const originalTotal = useSelector(selectCartOriginalTotal);
  const hydrated = useSelector(selectCartHydrated);

  // Redux dispatch
  const dispatch = useDispatch<AppDispatch>();

  // Increase quantity
  const increase = (id: CartItem['id'], qty: number) =>
    dispatch(updateQuantity({ id, quantity: qty + 1 }));

  // Decrease quantity (min 1)
  const decrease = (id: CartItem['id'], qty: number) =>
    dispatch(
      updateQuantity({
        id,
        quantity: qty > 1 ? qty - 1 : 1,
      }),
    );

  if (!hydrated) {
    return (
      <StyledPageContainer>
        <FullPageLoader />
      </StyledPageContainer>
    );
  }

  // Empty cart state
  if (!items.length) {
    return <CartEmptyState />;
  }

  return (
    <StyledPageContainer>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>

      <CartItemsList
        items={items}
        decrease={decrease}
        increase={increase}
        onRemove={(id) => dispatch(removeFromCart(id))}
      />

      <StyledSectionDivider />

      <CartSummary originalTotal={originalTotal} discount={discount} total={total} />

      <CartActions onClear={() => dispatch(clearCart())} />
    </StyledPageContainer>
  );
};

export default CartPage;
