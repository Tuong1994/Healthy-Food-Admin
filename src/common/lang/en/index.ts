import common_en from "./common";
import customer_en from "./customer";
import dashboard_en from "./dashboard";
import options_en from "./options";
import page_components_en from "./page-components";
import product_en from "./product";

const en = {
  common: common_en,
  options: options_en,
  pageComponent: page_components_en,
  dashboard: dashboard_en,
  customer: customer_en,
  product: product_en,
};

export type EN = typeof en;

export default en;
