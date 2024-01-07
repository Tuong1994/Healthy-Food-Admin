import { EPaymentMethod } from "@/services/order/enum";
import useLang from "../features/useLang";

const useDisplayPaymentMethod = (methodEnum: EPaymentMethod) => {
  const { lang } = useLang();

  const paymentMethods: Record<number, string> = {
    [EPaymentMethod.TRANSFER]: lang.options.paymentMethod.transfer,
    [EPaymentMethod.COD]: lang.options.paymentMethod.cod,
    [EPaymentMethod.CASH]: lang.options.paymentMethod.cash,
  };

  const methods = paymentMethods[methodEnum] ?? "";

  return methods;
};

export default useDisplayPaymentMethod;
