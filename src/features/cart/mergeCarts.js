// Merge guest cart with user cart (sum quantities for same products)
export const mergeCarts = (guest, user) => {
    const map = new Map(); // store merged items by product ID

    // Iterate through both carts
    [...guest, ...user].forEach((item) => {
        // If product not added yet — add it
        if (!map.has(item.id)) {
            map.set(item.id, { ...item });
        }
        // If exists — increase quantity
        else {
            map.get(item.id).quantity += item.quantity;
        }
    });

    // Convert Map back to array
    return Array.from(map.values());
};
