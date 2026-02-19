import type { CartItem } from '@/entities/cart/types';

export interface CartItemsListProps {
  items: CartItem[];
  decrease: (id: CartItem['id'], quantity: number) => void;
  increase: (id: CartItem['id'], quantity: number) => void;
  onRemove: (id: CartItem['id']) => void;
}

export interface CartActionsProps {
  onClear: () => void;
}

export interface CartSummaryProps {
  originalTotal: number;
  discount: number;
  total: number;
}
