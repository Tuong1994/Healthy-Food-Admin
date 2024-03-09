import { RouteProps } from "react-router";
import { routerPaths } from "@/common/constant/url";
import Auth from "@/pages/auth";
import Dashboard from "@/pages/dashboard";
import Users from "@/pages/user/list";
import User from "@/pages/user/form";
import Categories from "@/pages/category/list";
import Category from "@/pages/category/form";
import Products from "@/pages/product/list";
import Product from "@/pages/product/form";
import Orders from "@/pages/order/list";
import Order from "@/pages/order/form";
import Shipments from "@/pages/shipment/list";
import Shipment from "@/pages/shipment/form";
import MainSetting from "@/pages/setting/main";
import UserSetting from "@/pages/setting/user";
import NotFound from "@/pages/404";

const {
  AUTH_SIGN_IN,
  AUTH_FORGOT_PASSWORD,
  AUTH_RESET_PASSWORD,
  DASHBOARD,
  USER_LIST,
  USER_FORM,
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
  MAIN_SETTING,
  USER_SETTING,
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
    id: "users",
    path: USER_LIST,
    element: <Users />,
  },
  {
    id: "user",
    path: USER_FORM,
    element: <User />,
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
    id: "mainSetting",
    path: MAIN_SETTING,
    element: <MainSetting />,
  },
  {
    id: "userSetting",
    path: USER_SETTING,
    element: <UserSetting />,
  },
  {
    id: "notFound",
    path: "*",
    element: <NotFound />,
  },
];
