import { SubCategory } from "../subcategory/type";
import { ImageUpload } from "../image/type";
import { ERecordStatus } from "@/common/enum";

export type Category = {
  id?: string;

  name: string;
  nameEn?: string;
  nameVn?: string;
  status: ERecordStatus;
  image?: ImageUpload;
  subCategories: SubCategory[];

  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type CategoryFormData = Pick<Category, "nameEn" | "nameVn" | "status">;
