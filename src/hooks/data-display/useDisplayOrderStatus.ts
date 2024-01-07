import { EOrderStatus } from "@/services/order/enum";
import useLang from "../features/useLang";

const useDisplayOrderStatus = (statusEnum: EOrderStatus) => {
  const { lang } = useLang();

  const orderStatuses: Record<number, string> = {
    [EOrderStatus.DELIVERING]: lang.options.orderStatus.delivering,
    [EOrderStatus.DELIVERED]: lang.options.orderStatus.delivered,
  };

  const status = orderStatuses[statusEnum] ?? "";

  return status;
};

export default useDisplayOrderStatus;
