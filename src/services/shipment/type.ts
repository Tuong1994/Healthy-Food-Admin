import { Order } from "../order/type";

export type Shipment = {
  id?: string;

  fullName: string;
  phone: string;
  email: string;
  address: string;
  shipmentNumber?: string;
  orderId?: string;
  order?: Pick<Order, "id" | "orderNumber">;

  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type ShipmentFormData = Omit<Shipment, "id" | "createdAt" | "updatedAt">;
