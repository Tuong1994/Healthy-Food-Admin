import useLang from "./useLang";
import { EGender, ERole } from "@/services/customer/enum";
import type { SelectOptions } from "@/components/Control/type";
import { EInventoryStatus, EProductOrigin, EProductStatus, EProductUnit } from "@/services/product/enum";
import { EOrderStatus, EPaymentMethod, EPaymentStatus } from "@/services/order/enum";

const useSelectOption = () => {
  const { lang } = useLang();

  const gender: SelectOptions = [
    { label: lang.options.gender.male, value: EGender.MALE },
    { label: lang.options.gender.female, value: EGender.FEMALE },
  ];

  const role: SelectOptions = [
    { label: lang.options.role.superAdmin, value: ERole.SUPER_ADMIN },
    { label: lang.options.role.admin, value: ERole.ADMIN },
    { label: lang.options.role.customer, value: ERole.CUSTOMER },
  ];

  const unit: SelectOptions = [
    { label: lang.options.productUnit.kg, value: EProductUnit.KG },
    { label: lang.options.productUnit.pack, value: EProductUnit.PACK },
    { label: lang.options.productUnit.piece, value: EProductUnit.PIECE },
    { label: lang.options.productUnit.bin, value: EProductUnit.BIN },
    { label: lang.options.productUnit.bottle, value: EProductUnit.BOTTLE },
    { label: lang.options.productUnit.box, value: EProductUnit.BOX },
    { label: lang.options.productUnit.can, value: EProductUnit.CAN },
  ];

  const productStatus: SelectOptions = [
    { label: lang.options.productStatus.draft, value: EProductStatus.DRAFT },
    { label: lang.options.productStatus.active, value: EProductStatus.ACTIVE },
  ];

  const origin: SelectOptions = [{ label: lang.options.productOrigin.vn, value: EProductOrigin.VN }];

  const inventoryStatus: SelectOptions = [
    { label: lang.options.inventoryStatus.inStock, value: EInventoryStatus.IN_STOCK },
    { label: lang.options.inventoryStatus.outOfStock, value: EInventoryStatus.OUT_OF_STOCK },
  ];

  const supplier: SelectOptions = [{ label: "Heathy Food", value: "Heathy Food" }];

  const profit: SelectOptions = [
    { label: "25%", value: 25 },
    { label: "50%", value: 50 },
    { label: "75%", value: 75 },
    { label: "100%", value: 100 },
  ];

  const orderStatus: SelectOptions = [
    { label: lang.options.orderStatus.delivered, value: EOrderStatus.DELIVERED },
    { label: lang.options.orderStatus.delivering, value: EOrderStatus.DELIVERING },
  ];

  const paymentStatus: SelectOptions = [
    { label: lang.options.paymentStatus.waitting, value: EPaymentStatus.WAITTING },
    { label: lang.options.paymentStatus.unPaid, value: EPaymentStatus.UNPAID },
    { label: lang.options.paymentStatus.paid, value: EPaymentStatus.PAID },
  ];

  const paymentMethod: SelectOptions = [
    { label: lang.options.paymentMethod.transfer, value: EPaymentMethod.TRANSFER },
    { label: lang.options.paymentMethod.cod, value: EPaymentMethod.COD },
    { label: lang.options.paymentMethod.cash, value: EPaymentMethod.CASH },
  ];

  return {
    gender,
    role,
    unit,
    origin,
    productStatus,
    inventoryStatus,
    supplier,
    profit,
    orderStatus,
    paymentStatus,
    paymentMethod,
  };
};

export default useSelectOption;
