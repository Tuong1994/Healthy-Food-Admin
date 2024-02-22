import { ImageUpload } from "../image/type";

export type SubCategory = {
  id?: string;

  name: string;
  nameEn?: string;
  nameVn?: string;
  categoryId: string;
  image?: ImageUpload;

  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type SubCategoryFormData = {
  nameEn: string;
  nameVn: string;
  categoryId: string;
  image?: ImageUpload;
};
