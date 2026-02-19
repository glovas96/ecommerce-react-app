import { waitFor } from '@testing-library/dom';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useOrderDetails } from '@/entities/orders/hooks/useOrderDetails';
import { loadOrder } from '@/entities/orders/services/ordersService';
import type { OrderDetail } from '@/entities/orders/types';

const mockId = 'order-1';
const mockOrder: OrderDetail = {
  id: mockId,
  label: '#order-1',
  status: 'paid',
  statusLabel: 'Paid',
  date: '',
  subtotal: 100,
  discount: 0,
  total: 100,
  address: null,
  paymentMethod: 'card',
  items: [],
};

vi.mock('react-router-dom', () => ({
  useParams: () => ({ id: mockId }),
}));
vi.mock('@/entities/orders/services/ordersService', () => ({
  loadOrder: vi.fn(),
}));

const loadOrderMock = vi.mocked(loadOrder);

describe('useOrderDetails', () => {
  it('loads and exposes order data', async () => {
    loadOrderMock.mockResolvedValue(mockOrder);

    const { result } = renderHook(() => useOrderDetails());

    await waitFor(() => {
      expect(result.current.order).toEqual(mockOrder);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  it('surfaces errors when loadOrder rejects', async () => {
    const error = new Error('missing');
    loadOrderMock.mockRejectedValue(error);

    const { result } = renderHook(() => useOrderDetails());

    await waitFor(() => {
      expect(result.current.error).toBe(error);
      expect(result.current.isLoading).toBe(false);
    });
  });
});
