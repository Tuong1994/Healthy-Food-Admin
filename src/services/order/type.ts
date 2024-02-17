import { EOrderStatus, EPaymentStatus, EPaymentMethod, EReceivedType } from "./enum";
import type { Shipment } from "@/services/shipment/type";
import type { Product } from "../product/type";
import type { Customer } from "../customer/type";

export type OrderItem = {
  id?: string;

  quantity: number;
  orderId: string;
  productId: string;
  product?: Pick<Product, "id" | "name" | "totalPrice" | "image">;

  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type Order = {
  id?: string;

  status: EOrderStatus;
  paymentStatus: EPaymentStatus;
  receivedType: EReceivedType;
  paymentMethod: EPaymentMethod | number;
  customerId: string;
  note: string;
  shipmentFee: number;
  totalPayment: number;
  items: OrderItem[];
  orderNumber?: string;
  shipment?: Shipment;
  customer?: Customer;

  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type OrderFormData = Omit<Order, "id" | "createdAt" | "updatedAt">;
