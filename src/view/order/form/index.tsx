import React from "react";
import { UI } from "@/components";
import { useLang, useHasLocationState } from "@/hooks";
import type { Order } from "@/services/order/type";
import type { ContentHeaderProps } from "@/components/Page/ContentHeader";
import type { BreadcrumbItems } from "@/components/UI/Breadcrumb/type";
import { EOrderStatus, EPaymentMethod, EPaymentStatus } from "@/services/order/enum";
import { Link } from "react-router-dom";
import FormLayout from "@/components/Page/FormLayout";
import OrderProduct from "./OrderProduct";
import SelectProductModal from "./Modals/SelectProductModal";
import CreateProductModal from "./Modals/CreateProductModal";
import OrderGeneral from "./OrderGeneral";
import OrderSetting from "./OrderSetting";
import OrderCustomer from "./OrderCustomer";
import OrderShipment from "./OrderShipment";
import ShipmentModal from "./Modals/ShipmentModal";
import url from "@/common/constant/url";

const { ORDER_LIST } = url;

const { Breadcrumb, Button } = UI;

interface OrderProps {}

const Order: React.FC<OrderProps> = () => {
  const { lang } = useLang();

  const [openSelect, setOpenSelect] = React.useState<boolean>(false);

  const [openCreate, setOpenCreate] = React.useState<boolean>(false);

  const [openShipment, setOpenShipment] = React.useState<boolean>(false);

  const isUpdate = useHasLocationState();

  const pageTitle = isUpdate ? lang.order.form.editTitle : lang.order.form.addTitle;

  const items: BreadcrumbItems = [
    { id: "1", label: <Link to={ORDER_LIST}>{lang.order.list.title}</Link> },
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

  const handleSelect = () => {

  };

  const headerProps: ContentHeaderProps = {
    headTitle: pageTitle,
    right: () => <Button>{lang.common.actions.save}</Button>,
  };

  const leftItems = (
    <React.Fragment>
      <OrderProduct lang={lang} handleOpenSelect={handleOpenSelect} handleOpenCreate={handleOpenCreate} />
      <OrderGeneral lang={lang} />
    </React.Fragment>
  );

  const rightItems = (
    <React.Fragment>
      <OrderSetting lang={lang} />
      <OrderCustomer lang={lang} />
      <OrderShipment lang={lang} handleOpenShipment={handleOpenShipment} />
    </React.Fragment>
  );

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default Order;
