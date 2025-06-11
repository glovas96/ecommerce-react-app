import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems, selectCartTotal } from "../features/cart/selectors";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
    const items = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);
    const { user } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [zip, setZip] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            navigate("/login?redirectTo=/checkout");
            return;
        }

        // Firestore will be added in the next step
        console.log("Submitting order:", {
            userId: user.uid,
            items,
            total,
            name,
            phone,
            address: { city, street, zip },
        });
    };

    if (!items.length) return <div>Your cart is empty</div>;

    return (
        <div>
            <h1>Checkout</h1>

            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <input
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />

                <input
                    placeholder="Street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                />

                <input
                    placeholder="ZIP code"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                />

                <button type="submit">Place order</button>
            </form>

            <h2>Total: {total} $</h2>
        </div>
    );
};

export default CheckoutPage;