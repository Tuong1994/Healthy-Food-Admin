import { EProductStatus } from "@/services/product/enum";
import useLang from "../features/useLang";

const useDisplayProductStatus = (statusEnum: EProductStatus) => {
  const { lang } = useLang();

  const productStatuses: Record<number, string> = {
    [EProductStatus.DRAFT]: lang.options.productStatus.draft,
    [EProductStatus.ACTIVE]: lang.options.productStatus.active,
  };

  const status = productStatuses[statusEnum] ?? "";

  return status;
};

export default useDisplayProductStatus;
