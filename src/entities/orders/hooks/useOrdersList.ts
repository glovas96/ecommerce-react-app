import { useCallback, useEffect, useRef, useState } from 'react';

import { loadOrders } from '@/entities/orders/services/ordersService';
import type { OrderSummary, RawOrder } from '@/entities/orders/types';
import { useAuth } from '@/shared/hooks/useAuth';

// Manage list state and filters
const PAGE_SIZE = 10;

export const useOrdersList = () => {
  const auth = useAuth() as { user?: { uid?: string } } | null;
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const userId = auth?.user?.uid ?? null;
  const cursorRef = useRef<RawOrder['createdAt'][]>([null]);

  useEffect(() => {
    cursorRef.current = [null];
    setPage(1);
  }, [statusFilter, userId]);

  const loadPage = useCallback(async () => {
    if (!userId) {
      setOrders([]);
      setHasNextPage(false);
      return;
    }
    setLoading(true);
    try {
      const cursor = cursorRef.current[page - 1] ?? null;
      const {
        orders: latest,
        hasMore,
        nextCursorValue,
      } = await loadOrders({
        userId,
        limit: PAGE_SIZE,
        startAfterValue: cursor,
        statusFilter,
      });
      setOrders(latest);
      setHasNextPage(hasMore);
      if (nextCursorValue) {
        const updated = [...cursorRef.current];
        updated[page] = nextCursorValue;
        cursorRef.current = updated;
      } else {
        cursorRef.current = cursorRef.current.slice(0, page + 1);
      }
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, userId]);

  useEffect(() => {
    loadPage();
  }, [loadPage]);

  const goToNextPage = useCallback(() => {
    if (!hasNextPage) return;
    setPage((prev) => prev + 1);
  }, [hasNextPage]);

  const goToPrevPage = useCallback(() => {
    setPage((prev) => Math.max(1, prev - 1));
  }, []);

  return {
    orders,
    statusFilter,
    isLoading,
    error,
    setStatusFilter,
    page,
    hasNextPage,
    isFirstPage: page === 1,
    goToNextPage,
    goToPrevPage,
    refresh: loadPage,
  };
};
