import { describe, expect, it, vi } from 'vitest';

import {
  buildPayload,
  buildSummary,
  getShippingCost,
  processCheckout,
} from '@/entities/checkout/services/checkoutService';

describe('checkoutService helpers', () => {
  it('returns express shipping cost when requested', () => {
    expect(getShippingCost('express')).toBe(5);
    expect(getShippingCost()).toBe(0);
  });

  it('builds summary with tax and total', () => {
    const items = [
      { id: '1', price: 10, quantity: 2 },
      { id: '2', price: 5, quantity: 1 },
    ];

    expect(buildSummary(items, 'standard')).toEqual({
      subtotal: 25,
      shipping: 0,
      tax: 2,
      total: 27,
    });
  });

  // ensure express delivery adds fee plus tax
  it('applies express shipping fees in summary', () => {
    const summary = buildSummary([{ price: 50, quantity: 1 }], 'express');
    expect(summary.shipping).toBe(5);
    expect(summary.total).toBeCloseTo(50 + 5 + 4);
  });

  it('creates payload with metadata', () => {
    const items = [{ id: '1', price: 10, quantity: 1 }];
    const formData = {
      delivery: 'express',
      payment: 'card',
      street: 'Street 1',
      city: 'City',
      zip: '000',
      notes: 'note',
    };
    const user = { uid: 'user-1' };
    const timestamp = 'ts';

    const payload = buildPayload(items, formData, user, {
      timestampFn: () => timestamp,
    });

    expect(payload).toMatchObject({
      userId: 'user-1',
      items,
      paymentMethod: 'card',
      deliveryMethod: 'express',
      notes: 'note',
      subtotal: 10,
      shipping: 5,
      tax: 0.8,
      total: 15.8,
      createdAt: timestamp,
    });
  });

  // verify anonymous checkout still formats address and summary
  it('allows null user and default notes in payload', () => {
    const payload = buildPayload(
      [{ id: '1', price: 10, quantity: 1 }],
      {
        delivery: 'standard',
        payment: 'cash',
        street: 'Street 1',
        city: 'City',
        zip: '00000',
      },
      null,
      {
        timestampFn: () => 'now',
      },
    );

    expect(payload.userId).toBeNull();
    expect(payload.notes).toBe('');
    expect(payload.address).toMatchObject({ street: 'Street 1', city: 'City', zip: '00000' });
    expect(payload.summary.shipping).toBe(0);
  });
});

describe('processCheckout', () => {
  it('returns success when addDoc resolves', async () => {
    const items = [{ id: 'item', price: 5, quantity: 1 }];
    const formData = { delivery: 'standard', payment: 'card', street: 'a', city: 'b', zip: 'c' };
    const user = { uid: 'user-1' };
    const addDocFn = vi.fn(async () => ({ id: 'order-id' }));
    const collectionFn = vi.fn(() => 'orders-collection');
    const timestampFn = vi.fn(() => 'ts');
    const result = await processCheckout(items, formData, user, {
      addDocFn,
      collectionFn,
      timestampFn,
      dbClient: 'db',
    });

    expect(collectionFn).toHaveBeenCalledWith('db', 'orders');
    expect(addDocFn).toHaveBeenCalledWith('orders-collection', expect.any(Object));
    expect(result).toEqual({
      success: true,
      orderId: 'order-id',
      errors: {},
    });
  });

  it('passes notes and summary through addDoc', async () => {
    const items = [{ id: 'item', price: 20, quantity: 2 }];
    const formData = {
      delivery: 'express',
      payment: 'card',
      street: 'a',
      city: 'b',
      zip: 'c',
      notes: 'leave at door',
    };
    const user = { uid: 'user-1' };
    const addDocFn = vi.fn(async () => ({ id: 'order-id' }));
    const collectionFn = vi.fn(() => 'orders-collection');
    const timestampFn = vi.fn(() => 'ts');

    await processCheckout(items, formData, user, {
      addDocFn,
      collectionFn,
      timestampFn,
      dbClient: 'db',
    });

    expect(addDocFn).toHaveBeenCalledWith(
      'orders-collection',
      expect.objectContaining({
        notes: 'leave at door',
        summary: expect.objectContaining({
          subtotal: 40,
          shipping: 5,
        }),
      }),
    );
  });

  it('returns failure when addDoc throws', async () => {
    const addDocFn = vi.fn(async () => {
      throw new Error('boom');
    });
    const collectionFn = vi.fn(() => 'ref');
    const result = await processCheckout(
      [],
      { delivery: 'standard', payment: 'card', street: '', city: '', zip: '' },
      null,
      {
        addDocFn,
        collectionFn,
        timestampFn: () => 'ts',
        dbClient: null,
      },
    );

    expect(result).toEqual({
      success: false,
      orderId: null,
      errors: { general: 'boom' },
    });
  });
});
