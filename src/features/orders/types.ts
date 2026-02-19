import type { OrderSummary, OrderDetail } from '@/entities/orders/types';

export interface OrdersListProps {
  orders: OrderSummary[];
}

export interface OrderDetailsProps {
  order: OrderDetail;
}
