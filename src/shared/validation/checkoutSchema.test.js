import { describe, expect, it } from 'vitest';

import { checkoutSchema } from '@/shared/validation/checkoutSchema';

describe('checkoutSchema', () => {
  const validData = {
    name: 'Alice Smith',
    phone: '+12345678901',
    city: 'New York',
    street: 'Main Street 10',
    zip: '12345',
  };

  it('parses valid payload', () => {
    expect(() => checkoutSchema.parse(validData)).not.toThrow();
  });

  it('rejects short name', () => {
    expect(() => checkoutSchema.parse({ ...validData, name: 'Bob' })).toThrow();
  });

  it('rejects invalid phone', () => {
    expect(() => checkoutSchema.parse({ ...validData, phone: 'abc' })).toThrow();
  });

  it('rejects invalid zip', () => {
    expect(() => checkoutSchema.parse({ ...validData, zip: '12' })).toThrow();
  });

  // invalid street should be rejected
  it('flags street values that do not start with letters', () => {
    expect(() =>
      checkoutSchema.parse({
        ...validData,
        street: '1 Main St',
      }),
    ).toThrow();
  });
});
