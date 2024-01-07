import { EProductOrigin } from "@/services/product/enum";
import useLang from "../features/useLang";

const useDisplayProductOrigin = (originEnum: EProductOrigin) => {
  const { lang } = useLang();

  const productOrigins: Record<number, string> = {
    [EProductOrigin.VN]: lang.options.productOrigin.vn,
  };

  const origin = productOrigins[originEnum] ?? "";

  return origin;
};

export default useDisplayProductOrigin;
