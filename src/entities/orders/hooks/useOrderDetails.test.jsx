import { waitFor } from '@testing-library/dom';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useOrderDetails } from '@/entities/orders/hooks/useOrderDetails';
import { loadOrder } from '@/entities/orders/services/ordersService';

const mockId = 'order-1';
const mockOrder = { id: mockId, total: 100 };

vi.mock('react-router-dom', () => ({
  useParams: () => ({ id: mockId }),
}));
vi.mock('@/entities/orders/services/ordersService', () => ({
  loadOrder: vi.fn(),
}));

describe('useOrderDetails', () => {
  it('loads and exposes order data', async () => {
    loadOrder.mockResolvedValue(mockOrder);
    loadOrder.mockResolvedValue(mockOrder);

    const { result } = renderHook(() => useOrderDetails());

    await waitFor(() => {
      expect(result.current.order).toEqual(mockOrder);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  it('surfaces errors when loadOrder rejects', async () => {
    const error = new Error('missing');
    loadOrder.mockRejectedValue(error);
    loadOrder.mockRejectedValue(error);

    const { result } = renderHook(() => useOrderDetails());

    await waitFor(() => {
      expect(result.current.error).toBe(error);
      expect(result.current.isLoading).toBe(false);
    });
  });
});
