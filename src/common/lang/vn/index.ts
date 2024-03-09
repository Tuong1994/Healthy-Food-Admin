import common_vn from "./common";
import page_components_vn from "./page-components";
import options_vn from "./options";
import dashboard_vn from "./dashboard";
import user_vn from "./user";
import product_vn from "./product";
import order_vn from "./order";
import shipment_vn from "./shipment";
import category_vn from "./category";
import not_found_vn from "./not-found";
import auth_vn from "./auth";
import setting_vn from "./setting";

const vn = {
  common: common_vn,
  options: options_vn,
  pageComponent: page_components_vn,
  auth: auth_vn,
  dashboard: dashboard_vn,
  user: user_vn,
  product: product_vn,
  order: order_vn,
  shipment: shipment_vn,
  category: category_vn,
  setting: setting_vn,
  notFound: not_found_vn,
};

export type VN = typeof vn;

export default vn;
