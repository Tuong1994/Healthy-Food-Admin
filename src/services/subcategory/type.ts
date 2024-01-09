import { ImageUpload } from "../image/type";
import { Product } from "../product/type";

export type SubCategory = {
  id?: string;

  nameEn: string;
  nameVn: string;
  categoryId: string;
  products?: Product[];
  image?: ImageUpload;

  createdAt?: Date | string;
  updatedAt?: Date | string;
};
