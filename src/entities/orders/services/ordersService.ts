import { fetchOrderDetails, fetchOrdersList } from '@/entities/orders/api/ordersApi';
import type {
  OrderDetail,
  OrderItem,
  OrderSummary,
  OrdersListParams,
  OrdersListResult,
  RawOrder,
} from '@/entities/orders/types';

type StatusLabels = Record<string, string>;

const STATUS_LABELS: StatusLabels = {
  processing: 'Processing',
  paid: 'Paid',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

// Normalize Firestore timestamps to Date objects
const toDate = (value: RawOrder['createdAt']): Date | null => {
  if (!value) return null;
  if (typeof value === 'string') return new Date(value);
  const candidate = value as { toDate?: () => Date };
  if (typeof candidate.toDate === 'function') {
    return candidate.toDate();
  }
  if (value instanceof Date) return value;
  return null;
};

const formatStatusLabel = (status: string) => STATUS_LABELS[status] ?? 'Unknown';

const normalizeItems = (items: OrderItem[] | undefined): OrderItem[] => items ?? [];

const mapOrderSummary = (raw: RawOrder): OrderSummary => {
  const status = raw.status ?? 'unknown';
  const date = toDate(raw.createdAt);
  const listItems = normalizeItems(raw.items ?? raw.products);
  const itemsCount = listItems.reduce((sum, item) => sum + (item.quantity ?? item.qty ?? 0), 0);

  return {
    id: raw.id,
    label: `#${raw.id}`,
    status,
    statusLabel: formatStatusLabel(status),
    date: date ? date.toLocaleDateString() : '',
    total: raw.total ?? 0,
    itemsCount,
    createdAtValue: raw.createdAt ?? null,
  };
};

const mapOrderDetails = (raw: RawOrder): OrderDetail => {
  const status = raw.status ?? 'unknown';
  const date = toDate(raw.createdAt);
  const items = normalizeItems(raw.items ?? raw.products);

  return {
    id: raw.id,
    label: `#${raw.id}`,
    status,
    statusLabel: formatStatusLabel(status),
    date: date ? date.toLocaleString() : '',
    subtotal: raw.subtotal ?? raw.total ?? 0,
    discount:
      raw.discountedTotal || raw.discount
        ? (raw.total ?? 0) - (raw.discountedTotal ?? raw.discount ?? 0)
        : 0,
    total: raw.total ?? 0,
    address: raw.shippingAddress ?? raw.address ?? null,
    paymentMethod: raw.paymentMethod ?? 'N/A',
    items: items.map((item) => ({
      id: item.id ?? `${item.productId}-${item.title ?? item.name}`,
      name: item.title ?? item.name ?? 'Item',
      quantity: item.quantity ?? item.qty ?? 1,
      price: item.price ?? item.unitPrice ?? 0,
      total: item.total ?? (item.price ?? 0) * (item.quantity ?? 1),
      thumbnail: item.thumbnail ?? item.image ?? '',
    })),
  };
};

type LoadOrdersOptions = Partial<OrdersListParams> & { userId: string | null };

// Load summaries for user
export const loadOrders = async (options: LoadOrdersOptions): Promise<OrdersListResult> => {
  const { userId, limit = 10, startAfterValue = null, statusFilter = '' } = options;
  if (!userId) return { orders: [], hasMore: false, nextCursorValue: null };
  const { rawOrders, hasMore, nextCursorValue } = await fetchOrdersList({
    userId,
    limit,
    startAfterValue,
    statusFilter,
  });
  return {
    orders: rawOrders.map(mapOrderSummary),
    hasMore,
    nextCursorValue,
  };
};

// Load detail for single order
export const loadOrder = async (orderId: string | null): Promise<OrderDetail | null> => {
  if (!orderId) return null;
  const raw = await fetchOrderDetails(orderId);
  if (!raw) return null;
  return mapOrderDetails(raw);
};
