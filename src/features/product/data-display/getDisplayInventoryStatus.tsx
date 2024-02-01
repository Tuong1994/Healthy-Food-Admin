import type { Lang } from "@/common/type";
import { EInventoryStatus } from "@/services/product/enum";
import { Badge } from "@/components/UI";

const getDisplayInventoryStatus = (lang: Lang, status: EInventoryStatus) => {
  const inventoryStatuses: Record<number, string> = {
    [EInventoryStatus.IN_STOCK]: lang.options.inventoryStatus.inStock,
    [EInventoryStatus.OUT_OF_STOCK]: lang.options.inventoryStatus.outOfStock,
  };

  const colors: Record<number, any> = {
    [EInventoryStatus.IN_STOCK]: "blue",
    [EInventoryStatus.OUT_OF_STOCK]: "red",
  };

  return (
    <Badge shape="square" ghost color={colors[status]}>
      {inventoryStatuses[status]}
    </Badge>
  );
};

export default getDisplayInventoryStatus;
