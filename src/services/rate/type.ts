import { ImageUpload } from "../image/type";

export type Rate = {
  id?: string;

  point: number;
  note: string;
  customerId: string;
  productId: string;
  productName: string;
  productImage: ImageUpload | null;

  createdAt?: Date | string;
  updatedAt?: Date | string;
};
