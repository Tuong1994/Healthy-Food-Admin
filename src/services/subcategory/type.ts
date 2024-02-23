import { ERecordStatus } from "@/common/enum";
import { ImageUpload } from "../image/type";
import { Category } from "../category/type";

export type SubCategory = {
  id?: string;

  name: string;
  nameEn?: string;
  nameVn?: string;
  categoryId: string;
  status: ERecordStatus;
  category?: Category;
  image?: ImageUpload;

  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type SubCategoryFormData = Pick<SubCategory, "nameEn" | "nameVn" | "categoryId" | "status">;
