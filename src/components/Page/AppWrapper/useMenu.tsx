import { HiChartBar, HiInbox, HiListBullet, HiShoppingCart, HiTruck, HiUser } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useLang } from "@/hooks";
import { linkPaths } from "@/common/constant/url";
import type { MenuItems } from "@/components/UI/Layout/Menu/type";
import useLayout from "@/components/UI/Layout/useLayout";

const { DASHBOARD, PRODUCTS, CUSTOMERS, ORDERS, SHIPMENTS, CATEGORY } = linkPaths;

const ICON_SIZE = 18;

const useMenu = () => {
  const { lang } = useLang();

  const { layoutApi } = useLayout();

  const handleHideSide = () => layoutApi.onHideSide();

  const items: MenuItems = [
    {
      id: "dashboard",
      label: (
        <Link to={DASHBOARD} onClick={handleHideSide}>
          {lang.common.menu.dashboard}
        </Link>
      ),
      icon: <HiChartBar size={ICON_SIZE} />,
      isRoot: true,
    },
    {
      id: "customer",
      label: (
        <Link to={CUSTOMERS} onClick={handleHideSide}>
          {lang.common.menu.customer}
        </Link>
      ),
      icon: <HiUser size={ICON_SIZE} />,
      isRoot: true,
    },
    {
      id: "category",
      label: (
        <Link to={CATEGORY} onClick={handleHideSide}>
          {lang.common.menu.category}
        </Link>
      ),
      icon: <HiListBullet size={ICON_SIZE} />,
      isRoot: true,
    },
    {
      id: "product",
      label: (
        <Link to={PRODUCTS} onClick={handleHideSide}>
          {lang.common.menu.product}
        </Link>
      ),
      icon: <HiInbox size={ICON_SIZE} />,
      isRoot: true,
    },
    {
      id: "order",
      label: (
        <Link to={ORDERS} onClick={handleHideSide}>
          {lang.common.menu.order}
        </Link>
      ),
      icon: <HiShoppingCart size={ICON_SIZE} />,
      isRoot: true,
    },
    {
      id: "shipment",
      label: (
        <Link to={SHIPMENTS} onClick={handleHideSide}>
          {lang.common.menu.shipment}
        </Link>
      ),
      icon: <HiTruck size={ICON_SIZE} />,
      isRoot: true,
    },
  ];

  return items;
};

export default useMenu;
