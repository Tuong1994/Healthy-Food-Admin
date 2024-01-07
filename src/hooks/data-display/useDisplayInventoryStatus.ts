import { EInventoryStatus } from "@/services/product/enum";
import useLang from "../features/useLang";

const useDisplayInventoryStatus = (statusEnum: EInventoryStatus) => {
  const { lang } = useLang();

  const inventoryStatuses: Record<number, string> = {
    [EInventoryStatus.IN_STOCK]: lang.options.inventoryStatus.inStock,
    [EInventoryStatus.OUT_OF_STOCK]: lang.options.inventoryStatus.outOfStock,
  };

  const status = inventoryStatuses[statusEnum] ?? "";

  return status;
};

export default useDisplayInventoryStatus;
