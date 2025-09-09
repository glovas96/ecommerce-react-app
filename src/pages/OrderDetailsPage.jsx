import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

import {
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Divider,
    Skeleton,
} from "@mui/material";

const OrderDetailsPage = () => {
    const { id } = useParams(); // Order ID from URL
    const [order, setOrder] = useState(null);

    // Load order by ID
    useEffect(() => {
        const loadOrder = async () => {
            const ref = doc(db, "orders", id);
            const snap = await getDoc(ref);

            if (snap.exists()) {
                setOrder({ id: snap.id, ...snap.data() });
            } else {
                setOrder(false); // Not found
            }
        };

        loadOrder();
    }, [id]);

    // Loading state
    if (order === null)
        return (
            <Box sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Order details
                </Typography>

                <Skeleton variant="rectangular" height={120} sx={{ mb: 2 }} />
                <Skeleton variant="rectangular" height={120} sx={{ mb: 2 }} />
                <Skeleton variant="rectangular" height={120} sx={{ mb: 2 }} />
            </Box>
        );

    // Order not found
    if (order === false)
        return (
            <Box sx={{ p: 3 }}>
                <Typography variant="h5" color="error">
                    Order not found
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
            {/* Page title */}
            <Typography variant="h4" gutterBottom>
                Order #{order.id}
            </Typography>

            {/* Order meta info */}
            <Typography variant="body2" color="text.secondary">
                {order.createdAt?.toDate().toLocaleString()}
            </Typography>

            <Box sx={{ mt: 1 }}>{getStatusChip(order.status)}</Box>

            <Divider sx={{ my: 3 }} />

            {/* List of products */}
            <Typography variant="h5" gutterBottom>
                Items
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {order.items.map((item) => (
                    <Card key={item.id} sx={{ display: "flex", p: 1, gap: 2 }}>
                        {/* Product image */}
                        <CardMedia
                            component="img"
                            image={item.thumbnail}
                            alt={item.title}
                            sx={{
                                width: 120,
                                height: 120,
                                objectFit: "cover",
                                borderRadius: 1,
                            }}
                        />

                        {/* Product info */}
                        <CardContent sx={{ flex: 1 }}>
                            <Typography variant="h6">{item.title}</Typography>

                            <Typography variant="body2" color="text.secondary">
                                Price: ${item.price}
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                Quantity: {item.quantity}
                            </Typography>

                            <Typography sx={{ mt: 1 }}>
                                Subtotal:{" "}
                                <strong>
                                    ${(item.price * item.quantity).toFixed(2)}
                                </strong>
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Total */}
            <Typography variant="h5">
                Total: <strong>{order.total}$</strong>
            </Typography>
        </Box>
    );
};

export default OrderDetailsPage;