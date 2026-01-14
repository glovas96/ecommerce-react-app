import { fetchOrderDetails, fetchOrdersList } from '@/entities/orders/api/ordersApi';

// Normalize Firestore timestamps to Date objects
const toDate = (value) => {
  if (!value) return null;
  if (typeof value.toDate === 'function') return value.toDate();
  if (value instanceof Date) return value;
  return new Date(value);
};

// Translate status codes into human-readable labels
const formatStatusLabel = (status) => {
  const labels = {
    processing: 'Processing',
    paid: 'Paid',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
  };
  return labels[status] ?? 'Unknown';
};

// Normalize raw order for list
const mapOrderSummary = (raw) => {
  const date = toDate(raw.createdAt);
  const items = raw.items ?? raw.products ?? [];
  const itemsCount = items.reduce((sum, item) => sum + (item.quantity || 0), 0);

  return {
    id: raw.id,
    label: `#${raw.id}`,
    status: raw.status,
    statusLabel: formatStatusLabel(raw.status),
    date: date ? date.toLocaleDateString() : '',
    total: raw.total ?? 0,
    itemsCount,
    createdAtValue: raw.createdAt ?? null,
  };
};

// Normalize raw order for detail view
const mapOrderDetails = (raw) => {
  const date = toDate(raw.createdAt);
  const items = raw.items ?? raw.products ?? [];

  return {
    id: raw.id,
    label: `#${raw.id}`,
    status: raw.status,
    statusLabel: formatStatusLabel(raw.status),
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
      id: item.id ?? `${item.productId}-${item.title}`,
      name: item.title ?? item.name ?? 'Item',
      quantity: item.quantity ?? item.qty ?? 1,
      price: item.price ?? item.unitPrice ?? 0,
      total: item.total ?? (item.price ?? 0) * (item.quantity ?? 1),
      thumbnail: item.thumbnail ?? item.image ?? '',
    })),
  };
};

// Load summaries for user
export const loadOrders = async ({
  userId,
  pageSize = 10,
  startAfterValue = null,
  statusFilter = '',
}) => {
  if (!userId) return { orders: [], hasMore: false, nextCursorValue: null };
  const { rawOrders, hasMore, nextCursorValue } = await fetchOrdersList({
    userId,
    limit: pageSize,
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
export const loadOrder = async (orderId) => {
  if (!orderId) return null;
  const raw = await fetchOrderDetails(orderId);
  if (!raw) return null;
  return mapOrderDetails(raw);
};
