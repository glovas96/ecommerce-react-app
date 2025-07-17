import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";

import { Box, Typography, List, ListItem, Skeleton } from "@mui/material";

const OrdersPage = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState(null);

    // Load user orders from Firestore
    useEffect(() => {
        if (!user) return;

        const loadOrders = async () => {
            const q = query(
                collection(db, "orders"),
                where("userId", "==", user.uid),
                orderBy("createdAt", "desc")
            );

            const snapshot = await getDocs(q);

            // Map Firestore docs to array
            const list = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setOrders(list);
        };

        loadOrders();
    }, [user]);

    // Show loading state
    if (!orders)
        return (
            <Box sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    My Orders
                </Typography>

                {/* Skeleton list while loading */}
                {[1, 2, 3].map((i) => (
                    <Skeleton
                        key={i}
                        variant="text"
                        width={350}
                        height={32}
                        sx={{ my: 1 }}
                    />
                ))}
            </Box>
        );

    // Empty state
    if (!orders.length)
        return (
            <Typography sx={{ p: 3 }} variant="h6">
                You have no orders yet
            </Typography>
        );

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                My Orders
            </Typography>

            <List>
                {orders.map((o) => (
                    <ListItem key={o.id} sx={{ px: 0 }}>
                        Order #{o.id} — {o.total} ₽ — status: {o.status}
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default OrdersPage;
