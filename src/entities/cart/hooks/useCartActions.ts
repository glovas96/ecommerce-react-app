import { useDispatch, useSelector } from 'react-redux';

import {
  selectCartItems,
  selectCartTotal,
  selectCartCount,
} from '@/entities/cart/selectors/cartSelectors';
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from '@/entities/cart/slices/cartSlice';
import type { CartItem } from '@/entities/cart/types';

export const useCartActions = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const count = useSelector(selectCartCount);

  return {
    items,
    total,
    count,
    addToCart: (item: CartItem) => dispatch(addToCart(item)),
    removeFromCart: (id: string | number) => dispatch(removeFromCart(id)),
    updateQuantity: (payload: { id: string | number; quantity: number }) =>
      dispatch(updateQuantity(payload)),
    clearCart: () => dispatch(clearCart()),
  };
};
