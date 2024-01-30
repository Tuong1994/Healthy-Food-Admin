import { FC, Fragment, useState } from "react";
import { Breadcrumb, Button } from "@/components/UI";
import { useLang, useHasLocationState } from "@/hooks";
import type { Order } from "@/services/order/type";
import type { ContentHeaderProps } from "@/components/Page/ContentHeader";
import type { BreadcrumbItems } from "@/components/UI/Breadcrumb/type";
import { EOrderStatus, EPaymentMethod, EPaymentStatus } from "@/services/order/enum";
import { Link } from "react-router-dom";
import { linkPaths } from "@/common/constant/url";
import FormLayout from "@/components/Page/FormLayout";
import OrderProduct from "./OrderProduct";
import SelectProductModal from "./Modals/SelectProductModal";
import CreateProductModal from "./Modals/CreateProductModal";
import OrderGeneral from "./OrderGeneral";
import OrderSetting from "./OrderSetting";
import OrderCustomer from "./OrderCustomer";
import OrderShipment from "./OrderShipment";
import ShipmentModal from "./Modals/ShipmentModal";

const { ORDERS } = linkPaths;

interface OrderProps {}

const Order: FC<OrderProps> = () => {
  const { lang } = useLang();

  const { isUpdate } = useHasLocationState();

  const [openSelect, setOpenSelect] = useState<boolean>(false);

  const [openCreate, setOpenCreate] = useState<boolean>(false);

  const [openShipment, setOpenShipment] = useState<boolean>(false);

  const pageTitle = isUpdate ? lang.order.form.editTitle : lang.order.form.addTitle;

  const items: BreadcrumbItems = [
    { id: "1", label: <Link to={ORDERS}>{lang.order.list.title}</Link> },
    { id: "2", label: pageTitle, actived: true },
  ];

  const initialData: Order = {
    status: EOrderStatus.DELIVERING,
    paymentMethod: EPaymentMethod.TRANSFER,
    paymentStatus: EPaymentStatus.WAITTING,
    customerId: "",
    note: "",
    items: [],
  };

  const handleOpenSelect = () => setOpenSelect(true);

  const handleOpenCreate = () => setOpenCreate(true);

  const handleOpenShipment = () => setOpenShipment(true);

  const handleCloseSelect = () => setOpenSelect(false);

  const handleCloseCreate = () => setOpenCreate(false);

  const handleCloseShipment = () => setOpenShipment(false);

  const headerProps: ContentHeaderProps = {
    headTitle: pageTitle,
    right: () => <Button>{lang.common.actions.save}</Button>,
  };

  const leftItems = (
    <Fragment>
      <OrderProduct lang={lang} handleOpenSelect={handleOpenSelect} handleOpenCreate={handleOpenCreate} />
      <OrderGeneral lang={lang} />
    </Fragment>
  );

  const rightItems = (
    <Fragment>
      <OrderSetting lang={lang} />
      <OrderCustomer lang={lang} />
      <OrderShipment lang={lang} handleOpenShipment={handleOpenShipment} />
    </Fragment>
  );

  return (
    <Fragment>
      <Breadcrumb items={items} />
      <FormLayout<Order>
        initialData={initialData}
        headerProps={headerProps}
        leftItems={leftItems}
        rightItems={rightItems}
      />
      <SelectProductModal lang={lang} open={openSelect} onCancel={handleCloseSelect} />
      <CreateProductModal lang={lang} open={openCreate} onCancel={handleCloseCreate} />
      <ShipmentModal lang={lang} open={openShipment} onCancel={handleCloseShipment} />
    </Fragment>
  );
};

export default Order;
