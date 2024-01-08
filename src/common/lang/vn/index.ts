import common_vn from "./common";
import page_components_vn from "./page-components";
import options_vn from "./options";
import dashboard_vn from "./dashboard";
import customer_vn from "./customer";
import product_vn from "./product";
import order_vn from "./order";
import shipment_vn from "./shipment";

const vn = {
  common: common_vn,
  options: options_vn,
  pageComponent: page_components_vn,
  dashboard: dashboard_vn,
  customer: customer_vn,
  product: product_vn,
  order: order_vn,
  shipment: shipment_vn,
};

export type VN = typeof vn;

export default vn;
