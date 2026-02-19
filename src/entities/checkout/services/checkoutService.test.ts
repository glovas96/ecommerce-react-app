import type { Firestore } from 'firebase/firestore';
import { describe, expect, it, vi } from 'vitest';

import {
  buildPayload,
  buildSummary,
  getShippingCost,
  processCheckout,
} from '@/entities/checkout/services/checkoutService';
import type {
  CheckoutDependencies,
  CheckoutFormData,
  CheckoutItem,
} from '@/entities/checkout/types';

describe('checkoutService helpers', () => {
  it('returns express shipping cost when requested', () => {
    expect(getShippingCost('express')).toBe(5);
    expect(getShippingCost()).toBe(0);
  });

  it('builds summary with tax and total', () => {
    const items: CheckoutItem[] = [
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

  it('applies express shipping fees in summary', () => {
    const summary = buildSummary([{ id: 'x', price: 50, quantity: 1 }], 'express');
    expect(summary.shipping).toBe(5);
    expect(summary.total).toBeCloseTo(59, 0);
  });

  it('creates payload with metadata', () => {
    const items: CheckoutItem[] = [{ id: '1', price: 10, quantity: 1 }];
    const formData: CheckoutFormData = {
      name: 'Jane Doe',
      phone: '+1234567890',
      delivery: 'express',
      payment: 'card',
      street: 'Street 1',
      city: 'City',
      zip: '000',
      notes: 'note',
    };
    const user = { uid: 'user-1' };

    const payload = buildPayload(items, formData, user);

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
    });
  });

  it('allows null user and default notes in payload', () => {
    const payload = buildPayload(
      [{ id: '1', price: 10, quantity: 1 }],
      {
        name: 'Guest',
        phone: '+10000000000',
        delivery: 'standard',
        payment: 'cash',
        street: 'Street 1',
        city: 'City',
        zip: '00000',
      },
      null,
    );

    expect(payload.userId).toBeNull();
    expect(payload.notes).toBe('');
    expect(payload.address).toMatchObject({ street: 'Street 1', city: 'City', zip: '00000' });
    expect(payload.summary.shipping).toBe(0);
  });
});

describe('processCheckout', () => {
  const createAddDocMock = (): CheckoutDependencies['addDocFn'] =>
    vi.fn(async () => ({ id: 'order-id' })) as unknown as CheckoutDependencies['addDocFn'];
  const createCollectionMock = (): CheckoutDependencies['collectionFn'] =>
    vi.fn(() => 'orders-collection') as unknown as CheckoutDependencies['collectionFn'];

  it('returns success when addDoc resolves', async () => {
    const items: CheckoutItem[] = [{ id: 'item', price: 5, quantity: 1 }];
    const formData: CheckoutFormData = {
      name: 'Tester',
      phone: '+0000000000',
      delivery: 'standard',
      payment: 'card',
      street: 'a',
      city: 'b',
      zip: 'c',
    };
    const user = { uid: 'user-1' };
    const addDocFn = createAddDocMock();
    const collectionFn = createCollectionMock();

    const result = await processCheckout(items, formData, user, {
      addDocFn,
      collectionFn,
      dbClient: {} as unknown as Firestore,
    });

    expect(collectionFn).toHaveBeenCalledWith(expect.anything(), 'orders');
    expect(addDocFn).toHaveBeenCalledWith('orders-collection', expect.any(Object));
    expect(result).toEqual({
      success: true,
      orderId: 'order-id',
      errors: {},
    });
  });

  it('passes notes and summary through addDoc', async () => {
    const items: CheckoutItem[] = [{ id: 'item', price: 20, quantity: 2 }];
    const formData: CheckoutFormData = {
      name: 'Tester',
      phone: '+0000000000',
      delivery: 'express',
      payment: 'card',
      street: 'a',
      city: 'b',
      zip: 'c',
      notes: 'leave at door',
    };
    const user = { uid: 'user-1' };
    const addDocFn = createAddDocMock();
    const collectionFn = createCollectionMock();

    await processCheckout(items, formData, user, {
      addDocFn,
      collectionFn,
      dbClient: {} as unknown as Firestore,
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
    }) as unknown as CheckoutDependencies['addDocFn'];
    const collectionFn = vi.fn(() => 'ref') as unknown as CheckoutDependencies['collectionFn'];
    const result = await processCheckout(
      [],
      {
        name: 'Guest',
        phone: '+10000000000',
        delivery: 'standard',
        payment: 'card',
        street: '',
        city: '',
        zip: '',
      },
      null,
      {
        addDocFn,
        collectionFn,
        dbClient: null as unknown as Firestore,
      },
    );

    expect(result).toEqual({
      success: false,
      orderId: null,
      errors: { general: 'boom' },
    });
  });
});
