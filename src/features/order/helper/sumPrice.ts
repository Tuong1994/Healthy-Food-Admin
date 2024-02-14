import type { Order } from "@/services/order/type";

const sumPrice = (order: Order | undefined) => {
  if (!order) return 0;
  if (order?.items && !order?.items.length) return 0;
  const price =
    order?.items?.reduce((total, item) => {
      return (total += (item.product?.totalPrice ?? 0) * item.quantity);
    }, 0) || 0;
  return price;
};

export default sumPrice;
