import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";

const OrdersPage = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);

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

    // Empty state
    if (!orders.length) return <div>You have no orders yet</div>;

    return (
        <div>
            <h1>My Orders</h1>

            <ul>
                {orders.map((o) => (
                    <li key={o.id}>
                        Order #{o.id} — {o.total} ₽ — status: {o.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrdersPage;
