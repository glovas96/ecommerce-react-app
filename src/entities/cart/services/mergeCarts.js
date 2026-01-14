// Merge guest and user carts
export const mergeCarts = (guest, user) =>
  [...user, ...guest].reduce((acc, item) => {
    const existing = acc.find((i) => i.id === item.id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, []);
