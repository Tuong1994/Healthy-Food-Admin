import type { Order } from "@/services/order/type";

const sumQuantity = (order: Order | undefined) => {
  if (!order) return 0;
  if (order?.items && !order?.items.length) return 0;
  const quantity =
    order?.items?.reduce((total, item) => {
      return (total += item.quantity);
    }, 0) || 0;
  return quantity;
};

export default sumQuantity;
