import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { loadOrder } from '@/entities/orders/services/ordersService';

// Load single order detail by ID
export const useOrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      setLoading(true);
      try {
        const data = await loadOrder(id);
        setOrder(data);
        setError(data ? null : new Error('Order not found'));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  return { order, isLoading, error };
};
