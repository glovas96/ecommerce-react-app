import { describe, expect, it, vi } from 'vitest';

import { fetchOrderDetails, fetchOrdersList } from '@/entities/orders/api/ordersApi';
import { loadOrder, loadOrders } from '@/entities/orders/services/ordersService';

vi.mock('@/entities/orders/api/ordersApi', () => ({
  fetchOrdersList: vi.fn(),
  fetchOrderDetails: vi.fn(),
}));

describe('ordersService', () => {
  it('returns empty payload when userId is missing', async () => {
    const result = await loadOrders({ userId: null });
    expect(result).toEqual({ orders: [], hasMore: false, nextCursorValue: null });
  });

  it('maps list payload and respects pagination', async () => {
    const rawOrders = [
      {
        id: 'order-1',
        status: 'paid',
        createdAt: new Date('2024-01-01T00:00:00Z'),
        total: 50,
        items: [{ id: 'item-1', quantity: 2 }],
      },
    ];
    fetchOrdersList.mockResolvedValue({
      rawOrders,
      hasMore: true,
      nextCursorValue: 'cursor-1',
    });

    const result = await loadOrders({ userId: 'user-1', statusFilter: 'paid' });

    expect(fetchOrdersList).toHaveBeenCalledWith({
      userId: 'user-1',
      limit: 10,
      startAfterValue: null,
      statusFilter: 'paid',
    });
    expect(result.orders[0]).toMatchObject({
      id: 'order-1',
      label: '#order-1',
      status: 'paid',
      statusLabel: 'Paid',
      total: 50,
      itemsCount: 2,
      createdAtValue: rawOrders[0].createdAt,
    });
    expect(result.hasMore).toBe(true);
    expect(result.nextCursorValue).toBe('cursor-1');
  });

  it('returns null when orderId missing', async () => {
    expect(await loadOrder(null)).toBeNull();
  });

  it('maps order details and handles discount fallback', async () => {
    const raw = {
      id: 'detail-1',
      status: 'shipped',
      createdAt: new Date('2024-02-02T12:00:00Z'),
      total: 100,
      discountedTotal: 80,
      paymentMethod: 'card',
      shippingAddress: { city: 'City' },
      items: [
        {
          id: 'item-1',
          title: 'Product',
          quantity: 2,
          price: 20,
          thumbnail: 'thumb.png',
        },
      ],
    };

    fetchOrderDetails.mockResolvedValue(raw);

    const result = await loadOrder('detail-1');

    expect(fetchOrderDetails).toHaveBeenCalledWith('detail-1');
    expect(result).toMatchObject({
      id: 'detail-1',
      statusLabel: 'Shipped',
      paymentMethod: 'card',
      address: raw.shippingAddress,
      total: 100,
      discount: 20,
    });
    expect(result.items[0]).toMatchObject({
      id: 'item-1',
      name: 'Product',
      total: 40,
    });
  });

  it('returns null when order detail missing', async () => {
    fetchOrderDetails.mockResolvedValue(null);
    expect(await loadOrder('missing')).toBeNull();
  });

  it('propagates errors from fetchOrdersList', async () => {
    const boom = new Error('boom');
    fetchOrdersList.mockRejectedValueOnce(boom);

    await expect(loadOrders({ userId: 'user-err' })).rejects.toThrow(boom);
  });
});
