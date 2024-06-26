import { ELang, ERecordStatus, ESort } from "@/common/enum";
import { EGender, ERole } from "./user/enum";
import { EInventoryStatus, EProductOrigin, EProductUnit } from "./product/enum";
import { EOrderStatus, EPaymentMethod, EPaymentStatus } from "./order/enum";
import { AxiosRequestConfig } from "axios";

export type Paging<T> = {
  totalItems: number;
  page: number;
  limit: number;
  items: T[];
};

export type List<T> = {
  totalItems: number;
  items: T[];
};

export type ApiQuery = {
  page?: number;
  limit?: number;
  keywords?: string;
  langCode?: ELang;
  sortBy?: ESort;

  ids?: string;
  userId?: string;
  categoryId?: string;
  subCategoryId?: string;
  productId?: string;
  cartId?: string;
  orderId?: string;
  shipmentId?: string;
  commentId?: string;
  rateId?: string;
  likeId?: string;
  imageId?: string;
  cityId?: string;
  cityCode?: string;
  districtId?: string;
  districtCode?: string;
  wardId?: string;
  wardCode?: string;

  hasSub?: boolean;
  hasCate?: boolean;
  hasLike?: boolean;
  convertLang?: boolean;
  staffOnly?: boolean;
  admin?: boolean;

  role?: ERole;
  gender?: EGender;
  cateStatus?: ERecordStatus;
  subCateStatus?: ERecordStatus;
  productStatus?: ERecordStatus;
  productUnit?: EProductUnit;
  inventoryStatus?: EInventoryStatus;
  origin?: EProductOrigin;
  orderStatus?: EOrderStatus;
  paymentMethod?: EPaymentMethod;
  paymentStatus?: EPaymentStatus;
};

export type ApiConfig<T> = {
  method: string;
  apiPath: string;
  body?: T;
  config?: AxiosRequestConfig<T>;
};

export type ApiFetchState = {
  loading: boolean;
  error: boolean;
};

export type ResponseError = {
  status: number;
  message: string;
};

export type ResponseResult = {
  error?: ResponseError;
  success?: boolean;
};

export interface ApiResponse<T> extends ResponseResult {
  data: T;
}
