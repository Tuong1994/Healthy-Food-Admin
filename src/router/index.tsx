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
import Categories from "@/pages/category/list";
import Category from "@/pages/category/form";
import NotFound from "@/pages/404";
import Auth from "@/pages/auth";

const {
  AUTH_SIGN_IN,
  AUTH_FORGOT_PASSWORD,
  AUTH_RESET_PASSWORD,
  DASHBOARD,
  CUSTOMER_LIST,
  CUSTOMER_FORM,
  CATEGORY_LIST,
  CATEGORY_FORM,
  SUBCATEGORY_LIST,
  SUBCATEGORY_FORM,
  PRODUCT_LIST,
  PRODUCT_FORM,
  ORDER_LIST,
  ORDER_FORM,
  SHIPMENT_LIST,
  SHIPMENT_FORM,
} = routerPaths;

export const authRoutes: RouteProps[] = [
  {
    id: "signIn",
    path: AUTH_SIGN_IN,
    element: <Auth />,
  },
  {
    id: "forgotPassword",
    path: AUTH_FORGOT_PASSWORD,
    element: <Auth />,
  },
  {
    id: "resetPassword",
    path: AUTH_RESET_PASSWORD,
    element: <Auth />,
  },
];

export const pageRoutes: RouteProps[] = [
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
    id: "categories",
    path: CATEGORY_LIST,
    element: <Categories />,
  },
  {
    id: "category",
    path: CATEGORY_FORM,
    element: <Category />,
  },
  {
    id: "subcategories",
    path: SUBCATEGORY_LIST,
    element: <Categories />,
  },
  {
    id: "subcategory",
    path: SUBCATEGORY_FORM,
    element: <Category />,
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
    id: "notFound",
    path: "*",
    element: <NotFound />,
  },
];
