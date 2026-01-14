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

// Hook that exposes cart metrics and actions
export const useCartActions = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const count = useSelector(selectCartCount);

  return {
    items,
    total,
    count,
    addToCart: (item) => dispatch(addToCart(item)),
    removeFromCart: (id) => dispatch(removeFromCart(id)),
    updateQuantity: (payload) => dispatch(updateQuantity(payload)),
    clearCart: () => dispatch(clearCart()),
  };
};
