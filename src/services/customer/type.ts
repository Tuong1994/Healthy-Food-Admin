import { Cart } from "../cart/type";
import { Comment } from "../comment/type";
import { ImageUpload } from "../image/type";
import { Order } from "../order/type";
import { Rate } from "../rate/type";
import { EGender, ERole } from "./enum";

export type CustomerAddress = {
  id?: string;
  addressEn?: string;
  addressVn?: string;
  fullAddressEn?: string;
  fullAddressVn?: string;
  cityCode?: number;
  districtCode?: number;
  wardCode?: number;

  isDelete?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type Customer = {
  id?: string;

  email: string;
  password?: string;
  phone: string;
  role: ERole;

  firstName?: string;
  lastName?: string;
  fullName?: string;
  gender?: EGender;
  birthday?: Date | string;
  address?: CustomerAddress;
  image?: ImageUpload;

  cart?: Cart;
  orders?: Order[];
  comments?: Comment[];
  rates?: Rate[];

  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type CustomerPassword = {
  oldPassword: string;
  newPassword: string;
  customerId: string;
};
