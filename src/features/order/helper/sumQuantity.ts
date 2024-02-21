import type { OrderItem } from "@/services/order/type";

const sumQuantity = (items: OrderItem[] = []) => {
  if (!items.length) return 0;
  const quantity =
    items.reduce((total, item) => {
      return (total += item.quantity);
    }, 0) || 0;
  return quantity;
};

export default sumQuantity;
