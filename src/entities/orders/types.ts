import type { FieldValue, Timestamp } from 'firebase/firestore';

// Order statuses for labeling
export type OrderStatus = 'processing' | 'paid' | 'shipped' | 'delivered' | 'cancelled';

// Raw Firestore order document
export interface RawOrder {
  id: string;
  status?: string;
  createdAt?: FieldValue | Timestamp | Date | string | null;
  total?: number;
  subtotal?: number;
  discount?: number;
  discountedTotal?: number;
  items?: OrderItem[];
  products?: OrderItem[];
  paymentMethod?: string;
  shippingAddress?: Record<string, string>;
  address?: Record<string, string>;
  [key: string]: unknown;
}

// Line item stored on each order
export interface OrderItem {
  id?: string;
  productId?: string;
  title?: string;
  name?: string;
  quantity?: number;
  qty?: number;
  price?: number;
  unitPrice?: number;
  total?: number;
  thumbnail?: string;
  image?: string;
}

// Query params for list endpoints
export interface OrdersListParams {
  userId: string;
  limit?: number;
  startAfterValue?: RawOrder['createdAt'];
  statusFilter?: string;
}

// Raw list response from API
export interface OrdersListResponse {
  rawOrders: RawOrder[];
  hasMore: boolean;
  nextCursorValue: FieldValue | Timestamp | Date | string | null;
}

// Summary shape consumed by UI list
export interface OrderSummary {
  id: string;
  label: string;
  status: string;
  statusLabel: string;
  date: string;
  total: number;
  itemsCount: number;
  createdAtValue: RawOrder['createdAt'];
}

// Detail shape shown in order page
export interface OrderDetail {
  id: string;
  label: string;
  status: string;
  statusLabel: string;
  date: string;
  subtotal: number;
  discount: number;
  total: number;
  address: Record<string, string> | null;
  paymentMethod: string;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    total: number;
    thumbnail: string;
  }[];
}

export interface OrdersListResult {
  orders: OrderSummary[];
  hasMore: boolean;
  nextCursorValue: OrdersListResponse['nextCursorValue'];
}

export type RawOrderData = Omit<RawOrder, 'id'>;
