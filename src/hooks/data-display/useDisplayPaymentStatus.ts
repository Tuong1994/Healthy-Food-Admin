import { EPaymentStatus } from "@/services/order/enum";
import useLang from "../features/useLang";

const useDisplayPaymentStatus = (statusEnum: EPaymentStatus) => {
  const { lang } = useLang();

  const paymentStatuses: Record<number, string> = {
    [EPaymentStatus.WAITTING]: lang.options.paymentStatus.waitting,
    [EPaymentStatus.PAID]: lang.options.paymentStatus.paid,
    [EPaymentStatus.UNPAID]: lang.options.paymentStatus.unPaid,
  };

  const paymentStatus = paymentStatuses[statusEnum] ?? "";

  return paymentStatus;
};

export default useDisplayPaymentStatus;
