export type Shipment = {
  id?: string;

  fullName: string;
  phone: string;
  email: string;
  address: string;
  orderId: string;
  shipmentNumber?: string;

  createdAt?: Date | string;
  updatedAt?: Date | string;
};
