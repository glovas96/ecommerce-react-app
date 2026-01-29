import { describe, expect, it, vi, beforeEach, afterAll } from 'vitest';

import { fetchProduct, fetchRelatedProducts } from '@/entities/product/api/productApi';

describe('product API', () => {
  const mockFetch = vi.fn();
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    mockFetch.mockReset();
    globalThis.fetch = mockFetch;
  });

  afterAll(() => {
    if (originalFetch) {
      globalThis.fetch = originalFetch;
    } else {
      delete globalThis.fetch;
    }
  });

  it('fetches a single product by id', async () => {
    mockFetch.mockResolvedValueOnce({
      json: vi.fn(async () => ({ id: 'p-1' })),
    });

    const result = await fetchProduct('p-1');

    expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/products/p-1');
    expect(result).toEqual({ id: 'p-1' });
  });

  it('fetches related products with query params', async () => {
    mockFetch.mockResolvedValueOnce({
      json: vi.fn(async () => ({ products: [{ id: 'r-1' }] })),
    });

    const result = await fetchRelatedProducts('electronics');

    expect(mockFetch).toHaveBeenCalledWith(
      'https://dummyjson.com/products/category/electronics?sortBy=rating&order=desc&limit=5',
    );
    expect(result).toEqual([{ id: 'r-1' }]);
  });

  it('returns empty array when related response lacks products array', async () => {
    mockFetch.mockResolvedValueOnce({
      json: vi.fn(async () => ({})),
    });

    const result = await fetchRelatedProducts('electronics');

    expect(result).toEqual([]);
  });
});
