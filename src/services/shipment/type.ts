export type Shipment = {
  id?: string;

  fullName: string;
  phone: string;
  email: string;
  address: string;
  orderId?: string;

  createdAt?: Date | string;
  updatedAt?: Date | string;
};
