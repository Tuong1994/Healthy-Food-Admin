import type { OrderItem } from "@/services/order/type";

const sumPrice = (items: OrderItem[]) => {
  if (!items.length) return 0;
  const price =
    items?.reduce((total, item) => {
      return (total += (item.product?.totalPrice ?? 0) * item.quantity);
    }, 0) || 0;
  return price;
};

export default sumPrice;
