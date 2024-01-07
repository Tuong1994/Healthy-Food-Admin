import { EProductUnit } from "@/services/product/enum";
import useLang from "../features/useLang";

const useDisplayProductUnit = (unitEnum: EProductUnit) => {
  const { lang } = useLang();

  const productUnits: Record<number, string> = {
    [EProductUnit.KG]: lang.options.productUnit.kg,
    [EProductUnit.BIN]: lang.options.productUnit.bin,
    [EProductUnit.BOTTLE]: lang.options.productUnit.bottle,
    [EProductUnit.BOX]: lang.options.productUnit.box,
    [EProductUnit.CAN]: lang.options.productUnit.can,
    [EProductUnit.PACK]: lang.options.productUnit.pack,
    [EProductUnit.PIECE]: lang.options.productUnit.piece,
  };

  const unit = productUnits[unitEnum] ?? "";

  return unit;
};

export default useDisplayProductUnit;
