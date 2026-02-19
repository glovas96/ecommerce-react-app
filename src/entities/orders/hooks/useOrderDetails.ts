import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { loadOrder } from '@/entities/orders/services/ordersService';
import type { OrderDetail } from '@/entities/orders/types';

// Load single order detail by ID
export const useOrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      setLoading(true);
      try {
        const data = await loadOrder(id);
        setOrder(data);
        setError(data ? null : new Error('Order not found'));
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  return { order, isLoading, error };
};
