import { useSelector, useDispatch } from "react-redux";
import {
    selectCartItems,
    selectCartTotal,
} from "../features/cart/selectors";
import {
    updateQuantity,
    removeFromCart,
} from "../features/cart/cartSlice";

const CartPage = () => {
    // Read cart data from Redux
    const items = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);
    const dispatch = useDispatch();

    // Empty cart state
    if (!items.length) return <div>Cart is empty</div>;

    return (
        <div>
            <h1>Cart</h1>

            {/* Cart items list */}
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        {item.title} — {item.price} $ ×
                        <input
                            type="number"
                            min={1}
                            value={item.quantity}
                            onChange={(e) =>
                                dispatch(
                                    updateQuantity({
                                        id: item.id,
                                        quantity: Number(e.target.value),
                                    })
                                )
                            }
                        />
                        <button onClick={() => dispatch(removeFromCart(item.id))}>
                            Remove
                        </button>
                    </li>
                ))}
            </ul>

            {/* Total price */}
            <h2>Total: {total} $</h2>
        </div>
    );
};

export default CartPage;
