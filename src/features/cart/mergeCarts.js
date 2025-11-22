// Merge guest cart with user cart (sum quantities for same products)
export const mergeCarts = (guest, user) => {
    const map = new Map(); // store merged items by product ID

    // Iterate through both carts.
    [...guest, ...user].forEach((item) => {
        const existing = map.get(item.id);

        if (!existing) {
            map.set(item.id, { ...item });
        } else {
            existing.quantity = Math.max(
                existing.quantity ?? 0,
                item.quantity ?? 0
            );
        }
    });

    // Convert Map back to array
    return Array.from(map.values());
};
