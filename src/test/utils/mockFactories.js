// Shared factories for synthetic data
export const createCartItem = (overrides = {}) => ({
  id: 'test-product',
  name: 'Test Product',
  price: 10,
  quantity: 1,
  ...overrides,
});

export const createOrder = (overrides = {}) => ({
  id: 'test-order',
  status: 'processing',
  total: 25,
  items: [createCartItem()],
  ...overrides,
});
