import { FC, Fragment, useEffect, useState } from "react";
import { Breadcrumb, Button } from "@/components/UI";
import { useLang, useHasLocationState } from "@/hooks";
import type { Order, OrderFormData, OrderItem } from "@/services/order/type";
import type { ContentHeaderProps } from "@/components/Page/ContentHeader";
import type { BreadcrumbItems } from "@/components/UI/Breadcrumb/type";
import { EOrderStatus, EPaymentMethod, EPaymentStatus, ERecievedType } from "@/services/order/enum";
import { Link } from "react-router-dom";
import { linkPaths } from "@/common/constant/url";
import FormLayout from "@/components/Page/FormLayout";
import SelectProductModal from "@/features/order/components/form/Modals/SelectProductModal";
import CreateProductModal from "@/features/order/components/form/Modals/CreateProductModal";
import ShipmentModal from "@/features/order/components/form/Modals/ShipmentModal";
import OrderProduct from "@/features/order/components/form/OrderProduct";
import OrderGeneral from "@/features/order/components/form/OrderGeneral";
import OrderSetting from "@/features/order/components/form/OrderSetting";
import OrderCustomer from "@/features/order/components/form/OrderCustomer";
import OrderShipment from "@/features/order/components/form/OrderShipment";
import useGetOrder from "@/features/order/hooks/useGetOrder";

const { ORDERS } = linkPaths;

interface OrderProps {}

const Order: FC<OrderProps> = () => {
  const { lang } = useLang();

  const { isUpdate, state } = useHasLocationState();

  const { data: response, isFetching } = useGetOrder({ orderId: state?.id as string }, isUpdate);

  const [openSelect, setOpenSelect] = useState<boolean>(false);

  const [openCreate, setOpenCreate] = useState<boolean>(false);

  const [openShipment, setOpenShipment] = useState<boolean>(false);

  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    if (!isUpdate) return;
    setSelectedItems(response ? response.data?.items : []);
  }, [response, isUpdate]);

  const pageTitle = isUpdate ? lang.order.form.editTitle : lang.order.form.addTitle;

  const items: BreadcrumbItems = [
    { id: "1", label: <Link to={ORDERS}>{lang.order.list.title}</Link> },
    { id: "2", label: pageTitle, actived: true },
  ];

  const initialData: OrderFormData = {
    status: response ? response.data?.status : EOrderStatus.DELIVERING,
    paymentMethod: response ? response.data?.paymentMethod : EPaymentMethod.TRANSFER,
    paymentStatus: response ? response.data?.paymentStatus : EPaymentStatus.UNPAID,
    recievedType: response ? response.data?.recievedType : ERecievedType.STORE,
    shipmentFee: response ? response.data?.shipmentFee : 0,
    totalPayment: response ? response.data?.totalPayment : 0,
    customerId: response ? response.data?.customerId : "",
    note: response ? response.data?.note : "",
    items: [],
  };

  const headerProps: ContentHeaderProps = {
    headTitle: pageTitle,
    right: () =>
      !isFetching && <Button type="submit">{lang.common.actions[!isUpdate ? "save" : "update"]}</Button>,
  };

  const handleOpenSelect = () => setOpenSelect(!openSelect);

  const handleOpenCreate = () => setOpenCreate(!openCreate);

  const handleOpenShipment = () => setOpenShipment(!openShipment);

  const handleSelectItems = (items: OrderItem[]) => setSelectedItems(items);

  const handleSubmit = (data: OrderFormData) => {
    console.log(selectedItems);
  };

  const leftItems = (
    <Fragment>
      <OrderProduct
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        handleOpenSelect={handleOpenSelect}
        handleOpenCreate={handleOpenCreate}
      />
      <OrderGeneral lang={lang} order={response?.data} />
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
        onFinish={handleSubmit}
      />
      <SelectProductModal open={openSelect} onSelect={handleSelectItems} onCancel={handleOpenSelect} />
      <CreateProductModal lang={lang} open={openCreate} onCancel={handleOpenCreate} />
      <ShipmentModal lang={lang} open={openShipment} onCancel={handleOpenShipment} />
    </Fragment>
  );
};

export default Order;
