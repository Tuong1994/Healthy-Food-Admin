import { SubCategory } from "../subcategory/type";
import { ImageUpload } from "../image/type";
import { Product } from "../product/type";

export type Category = {
  id?: string;

  nameEn: string;
  nameVn: string;
  subCategories?: SubCategory[];
  products?: Product[];
  image?: ImageUpload;

  createdAt?: Date | string;
  updatedAt?: Date | string;
};
