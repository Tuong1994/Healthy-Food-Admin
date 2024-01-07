import { ELang } from "@/common/enum";
import { SubCategory } from "../subcategory/type";
import { ImageUpload } from "../image/type";

export type Category = {
  id?: string;

  name: string;
  langCode: ELang;
  subCategories: SubCategory[]
  image?: ImageUpload;

  createdAt?: Date | string;
  updatedAt?: Date | string;
};
