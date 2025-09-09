import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";

import {
    Box,
    Typography,
    Card,
    CardContent,
    CardActions,
    Chip,
    Button,
    Skeleton,
} from "@mui/material";

import { Link } from "react-router-dom";

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
                        variant="rectangular"
                        width="100%"
                        height={90}
                        sx={{ my: 1, borderRadius: 1 }}
                    />
                ))}
            </Box>
        );

    // Empty state
    if (!orders.length)
        return (
            <Box sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                    You have no orders yet
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    Make your first purchase to see it here
                </Typography>
            </Box>
        );

    // Helper: colored status chip
    const getStatusChip = (status) => {
        const colors = {
            processing: "info",
            paid: "success",
            shipped: "warning",
            delivered: "success",
            cancelled: "error",
        };

        return (
            <Chip
                label={status}
                color={colors[status] || "default"}
                size="small"
                sx={{ textTransform: "capitalize" }}
            />
        );
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                My Orders
            </Typography>

            {/* Orders list as cards */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {orders.map((o) => (
                    <Card key={o.id} sx={{ p: 2 }}>
                        <CardContent>
                            {/* Order ID */}
                            <Typography variant="h6">
                                Order #{o.id}
                            </Typography>

                            {/* Order date */}
                            <Typography variant="body2" color="text.secondary">
                                {o.createdAt?.toDate().toLocaleString()}
                            </Typography>

                            {/* Order total */}
                            <Typography sx={{ mt: 1 }}>
                                Total: <strong>{o.total}$</strong>
                            </Typography>

                            {/* Status chip */}
                            <Box sx={{ mt: 1 }}>
                                {getStatusChip(o.status)}
                            </Box>
                        </CardContent>

                        <CardActions sx={{ justifyContent: "flex-end" }}>
                            {/* Button for order details page */}
                            <Button
                                variant="outlined"
                                size="small"
                                component={Link}
                                to={`/orders/${o.id}`}
                            >
                                View details
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default OrdersPage;