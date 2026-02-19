import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit as limitQuery,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';

import type {
  OrdersListParams,
  OrdersListResponse,
  RawOrder,
  RawOrderData,
} from '@/entities/orders/types';
import { db } from '@/shared/firebase/config';

// Fetch orders for the current user
export const fetchOrdersList = async ({
  userId,
  limit = 10,
  startAfterValue = null,
  statusFilter = '',
}: OrdersListParams): Promise<OrdersListResponse> => {
  const ordersCollection = collection(db, 'orders');
  let q = query(ordersCollection, where('userId', '==', userId), orderBy('createdAt', 'desc'));
  if (statusFilter) {
    q = query(q, where('status', '==', statusFilter));
  }
  if (startAfterValue) {
    q = query(q, startAfter(startAfterValue));
  }
  q = query(q, limitQuery(limit + 1));
  const snapshot = await getDocs(q);
  const docs = snapshot.docs;
  const hasMore = docs.length > limit;
  const trimmed = hasMore ? docs.slice(0, limit) : docs;
  const nextCursorValue =
    trimmed.length > 0 && hasMore ? (trimmed[trimmed.length - 1].data()?.createdAt ?? null) : null;
  return {
    rawOrders: trimmed.map((doc) => {
      const data = doc.data() as RawOrderData;
      return { id: doc.id, ...data } as RawOrder;
    }),
    hasMore,
    nextCursorValue,
  };
};

// Fetch single order by ID
export const fetchOrderDetails = async (orderId: string): Promise<RawOrder | null> => {
  const ref = doc(db, 'orders', orderId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  const data = snap.data() as RawOrderData;
  return { id: snap.id, ...data };
};
