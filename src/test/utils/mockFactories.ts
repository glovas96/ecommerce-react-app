import type { CartItem } from '@/entities/cart/types';
import type { OrderSummary } from '@/entities/orders/types';

// Shared factories for synthetic data
export const createCartItem = (overrides: Partial<CartItem> = {}): CartItem => ({
  id: 1,
  title: 'Test Product',
  description: 'Sample',
  price: 10,
  quantity: 1,
  discountPercentage: 0,
  rating: 4,
  category: 'test',
  brand: 'Test',
  thumbnail: 'test.png',
  images: [],
  ...overrides,
});

export const createOrder = (overrides: Partial<OrderSummary> = {}): OrderSummary => ({
  id: 'test-order',
  label: 'Test Order',
  status: 'processing',
  statusLabel: 'Processing',
  date: new Date().toISOString(),
  total: 25,
  itemsCount: 1,
  createdAtValue: new Date().toISOString(),
  ...overrides,
});
