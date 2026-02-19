// Merge guest and user carts
import type { CartItem } from '@/entities/cart/types';

export const mergeCarts = (guest: CartItem[], user: CartItem[]): CartItem[] =>
  [...user, ...guest].reduce<CartItem[]>((acc, item) => {
    const existing = acc.find((i) => i.id === item.id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, []);
