import { Comment } from "../comment/type";
import { ImageUpload } from "../image/type";
import { Rate } from "../rate/type";
import { EInventoryStatus, EProductOrigin, EProductStatus, EProductUnit } from "./enum";

export type Product = {
  id?: string;

  nameEn: string;
  nameVn: string;
  costPrice?: number;
  profit?: number;
  totalPrice: number;
  inventory: number;
  unit: EProductUnit;
  status: EProductStatus;
  inventoryStatus: EInventoryStatus;
  origin: EProductOrigin;
  supplier: string;
  isNew: boolean;
  categoryId: string;
  subCategoryId: string;

  image?: ImageUpload[];
  comments?: Comment[];
  rates?: Rate[];

  createdAt?: Date | string;
  updatedAt?: Date | string;
};
