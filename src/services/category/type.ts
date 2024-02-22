import { SubCategory } from "../subcategory/type";
import { ImageUpload } from "../image/type";

export type Category = {
  id?: string;

  name: string;
  nameEn?: string;
  nameVn?: string;
  image?: ImageUpload;
  subCategories: SubCategory[];

  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type CategoryFormData = Pick<Category, "nameEn" | "nameVn">;
