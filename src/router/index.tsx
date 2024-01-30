import { RouteProps } from "react-router";
import { routerPaths } from "@/common/constant/url";
import Dashboard from "@/pages/dashboard";
import Customers from "@/pages/customer/list";
import Customer from "@/pages/customer/form";
import Products from "@/pages/product/list";
import Product from "@/pages/product/form";
import Orders from "@/pages/order/list";
import Order from "@/pages/order/form";
import Shipments from "@/pages/shipment/list";
import Shipment from "@/pages/shipment/form";
import Category from "@/pages/category";

const {
  DASHBOARD,
  PRODUCT_LIST,
  PRODUCT_FORM,
  CUSTOMER_LIST,
  CUSTOMER_FORM,
  ORDER_LIST,
  ORDER_FORM,
  SHIPMENT_LIST,
  SHIPMENT_FORM,
  CATEGORY,
} = routerPaths;

const routes: RouteProps[] = [
  {
    id: "dashboard",
    path: DASHBOARD,
    element: <Dashboard />,
  },
  {
    id: "customers",
    path: CUSTOMER_LIST,
    element: <Customers />,
  },
  {
    id: "customer",
    path: CUSTOMER_FORM,
    element: <Customer />,
  },
  {
    id: "products",
    path: PRODUCT_LIST,
    element: <Products />,
  },
  {
    id: "product",
    path: PRODUCT_FORM,
    element: <Product />,
  },
  {
    id: "orders",
    path: ORDER_LIST,
    element: <Orders />,
  },
  {
    id: "order",
    path: ORDER_FORM,
    element: <Order />,
  },
  {
    id: "shipments",
    path: SHIPMENT_LIST,
    element: <Shipments />,
  },
  {
    id: "shipment",
    path: SHIPMENT_FORM,
    element: <Shipment />,
  },
  {
    id: "category",
    path: CATEGORY,
    element: <Category />,
  },
];

export default routes;
