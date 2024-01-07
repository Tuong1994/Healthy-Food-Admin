import { RouteProps } from "react-router";
import url from "@/common/constant/url";
import Dashboard from "@/view/dashboard";
import Customers from "@/view/customer/list";
import Customer from "@/view/customer/form";
import Products from "@/view/product/list";
import Product from "@/view/product/form";
import Orders from "@/view/order/list";
import Order from "@/view/order/form";
import Shipments from "@/view/shipment/list";
import Shipment from "@/view/shipment/form";
import Gallery from "@/view/gallery";

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
  GALLERY,
} = url;

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
    id: "gallery",
    path: GALLERY,
    element: <Gallery />,
  },
];

export default routes;
