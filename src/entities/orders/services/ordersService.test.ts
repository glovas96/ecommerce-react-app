import { describe, expect, it, vi } from 'vitest';

import { fetchOrderDetails, fetchOrdersList } from '@/entities/orders/api/ordersApi';
import { loadOrder, loadOrders } from '@/entities/orders/services/ordersService';
import type { OrdersListParams, RawOrder } from '@/entities/orders/types';

vi.mock('@/entities/orders/api/ordersApi', () => ({
  fetchOrdersList: vi.fn(),
  fetchOrderDetails: vi.fn(),
}));

const fetchOrdersListMock = vi.mocked(fetchOrdersList);
const fetchOrderDetailsMock = vi.mocked(fetchOrderDetails);

describe('ordersService', () => {
  it('maps list payload and respects pagination', async () => {
    const rawOrders: RawOrder[] = [
      {
        id: 'order-1',
        status: 'paid',
        createdAt: new Date('2024-01-01T00:00:00Z'),
        total: 50,
        items: [{ id: 'item-1', quantity: 2 }],
      },
    ];
    fetchOrdersListMock.mockResolvedValue({
      rawOrders,
      hasMore: true,
      nextCursorValue: 'cursor-1',
    });

    const params: OrdersListParams = {
      userId: 'user-1',
      limit: 10,
      startAfterValue: null,
      statusFilter: 'paid',
    };
    const result = await loadOrders(params);

    expect(fetchOrdersList).toHaveBeenCalledWith(params);
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

  it('maps order details and handles discount fallback', async () => {
    const raw: RawOrder = {
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

    fetchOrderDetailsMock.mockResolvedValue(raw);

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
    expect(result!.items[0]).toMatchObject({
      id: 'item-1',
      name: 'Product',
      total: 40,
    });
  });

  it('returns null when order detail missing', async () => {
    fetchOrderDetailsMock.mockResolvedValue(null);
    expect(await loadOrder('missing')).toBeNull();
  });

  it('propagates errors from fetchOrdersList', async () => {
    const boom = new Error('boom');
    fetchOrdersListMock.mockRejectedValueOnce(boom);

    await expect(loadOrders({ userId: 'user-err' })).rejects.toThrow(boom);
  });
});
