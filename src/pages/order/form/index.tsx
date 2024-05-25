import { FC, Fragment, useEffect, useMemo, useState } from "react";
import { Breadcrumb, Button } from "@/components/UI";
import { useLang, useHasLocationState, usePermission } from "@/hooks";
import type { Order, OrderFormData, OrderItem } from "@/services/order/type";
import type { ContentHeaderProps } from "@/components/Page/ContentHeader";
import type { BreadcrumbItems } from "@/components/UI/Breadcrumb/type";
import type { Shipment, ShipmentFormData } from "@/services/shipment/type";
import { EOrderStatus, EPaymentMethod, EPaymentStatus, EReceivedType } from "@/services/order/enum";
import { Link } from "react-router-dom";
import { linkPaths } from "@/common/constant/url";
import FormLayout from "@/components/Page/FormLayout";
import SelectProductModal from "@/features/order/components/form/Modals/SelectProductModal";
import ShipmentModal from "@/features/order/components/form/Modals/ShipmentModal";
import OrderProduct from "@/features/order/components/form/OrderProduct";
import OrderGeneral from "@/features/order/components/form/OrderGeneral";
import OrderSetting from "@/features/order/components/form/OrderSetting";
import OrderCustomer from "@/features/order/components/form/OrderCustomer";
import OrderReceived from "@/features/order/components/form/OrderReceived";
import useGetOrder from "@/features/order/hooks/useGetOrder";
import useCreateOrder from "@/features/order/hooks/useCreateOrder";
import useUpdateOrder from "@/features/order/hooks/useUpdateOrder";
import sumPrice from "@/features/order/helper/sumPrice";
import getTotalPayment from "@/features/order/helper/getTotalPayment";
import OrderCreator from "@/features/order/components/form/OrderCreator";

const { ORDERS } = linkPaths;

export type GeneralInfo = {
  receivedType: EReceivedType;
  method: EPaymentMethod;
  shipmentFee: number;
};

interface OrderProps {}

const Order: FC<OrderProps> = () => {
  const { lang } = useLang();

  const { canCreate, canUpdate } = usePermission();

  const { isUpdate, state } = useHasLocationState();

  const { data: response, isFetching, refetch } = useGetOrder({ orderId: state?.id as string }, isUpdate);

  const { mutate: createOrder, isLoading: createLoading } = useCreateOrder();

  const { mutate: updateOrder, isLoading: updateLoading } = useUpdateOrder();

  const [openSelect, setOpenSelect] = useState<boolean>(false);

  const [openShipment, setOpenShipment] = useState<boolean>(false);

  const [shipment, setShipment] = useState<Shipment | undefined>(undefined);

  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);

  const [itemRemovedIds, setItemRemovedIds] = useState<string[]>([]);

  const [info, setInfo] = useState<GeneralInfo>({
    receivedType: EReceivedType.STORE,
    method: EPaymentMethod.TRANSFER,
    shipmentFee: 0,
  });

  const totalPrice = sumPrice(selectedItems);

  const { totalPayment } = getTotalPayment(totalPrice, info.shipmentFee as number);

  const onReFetch = () => refetch();

  const setDefaultData = () => {
    if (!isUpdate) return;
    setSelectedItems(response ? response.data?.items : []);
    setShipment(response ? response.data?.shipment : undefined);
    setInfo((prev) => ({
      ...prev,
      receivedType: response ? response.data?.receivedType : EReceivedType.STORE,
      method: response ? response.data?.paymentMethod : EPaymentMethod.TRANSFER,
      shipmentFee: response ? response.data?.shipmentFee : 0,
    }));
  };

  const setShipmentFee = () => {
    if (!shipment) return;
    if (!selectedItems.length) return;
    if (totalPrice > 100000) return setInfo((prev) => ({ ...prev, shipmentFee: 0 }));
    const { method, receivedType } = info;
    if (method === EPaymentMethod.COD || receivedType === EReceivedType.DELIVERY)
      setInfo((prev) => ({ ...prev, shipmentFee: 50000 }));
  };

  const resetInfoByShipment = () => {
    if (openShipment) return;
    if (!shipment)
      setInfo((prev) => ({ ...prev, receivedType: EReceivedType.STORE, method: EPaymentMethod.TRANSFER }));
  };

  useEffect(() => setDefaultData(), [response, isUpdate]);

  useEffect(
    () => setShipmentFee(),
    [totalPrice, selectedItems.length, shipment, info.method, info.receivedType]
  );

  useEffect(() => resetInfoByShipment(), [openShipment, shipment]);

  const pageTitle = isUpdate ? lang.order.form.editTitle : lang.order.form.addTitle;

  const isSubmitting = !isUpdate ? createLoading : updateLoading;

  const canInteract = !isUpdate ? canCreate : canUpdate;

  const items: BreadcrumbItems = [
    { id: "1", label: <Link to={ORDERS}>{lang.order.list.title}</Link> },
    { id: "2", label: pageTitle, actived: true },
  ];

  const initialData: OrderFormData = useMemo(
    () => ({
      paymentMethod: info.method,
      receivedType: info.receivedType,
      shipmentFee: info.shipmentFee,
      status: response ? response.data?.status : EOrderStatus.WAITTING,
      paymentStatus: response ? response.data?.paymentStatus : EPaymentStatus.UNPAID,
      totalPayment: response ? response.data?.totalPayment : 0,
      userId: response ? response.data?.userId : "",
      creatorId: response ? response.data?.creatorId : "",
      note: response ? response.data?.note : "",
      items: [],
    }),
    [response, info.method, info.receivedType, info.shipmentFee]
  );

  const headerProps: ContentHeaderProps = {
    headTitle: pageTitle,
    right: () =>
      !isFetching &&
      canInteract && (
        <Button loading={isSubmitting} disabled={!selectedItems.length} type="submit">
          {lang.common.actions[!isUpdate ? "save" : "update"]}
        </Button>
      ),
  };

  const handleOpenSelect = () => setOpenSelect(!openSelect);

  const handleOpenShipment = () => setOpenShipment(!openShipment);

  const handleSetShipment = (data: ShipmentFormData) => setShipment(data);

  const handleSubmit = (data: OrderFormData) => {
    const items = selectedItems.map((item) => {
      delete item.product;
      if (!item.id) delete item.id;
      return { ...item };
    });
    const prepareData: OrderFormData = {
      ...data,
      items,
      shipment,
      totalPayment,
      paymentMethod: info.method,
      shipmentFee: info.shipmentFee,
      receivedType: info.receivedType,
    };
    if (!isUpdate) return createOrder(prepareData);
    const args = {
      query: { orderId: response?.data?.id, ids: itemRemovedIds.join(",") },
      formData: prepareData,
    };
    return updateOrder(args, { onSuccess: () => onReFetch() });
  };

  const leftItems = (
    <Fragment>
      <OrderProduct
        isUpdate={isUpdate}
        canInteract={canInteract}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        setItemRemovedIds={setItemRemovedIds}
        handleOpenSelect={handleOpenSelect}
      />
      <OrderGeneral lang={lang} info={info} totalPrice={totalPrice} selectedItems={selectedItems} />
    </Fragment>
  );

  const rightItems = (
    <Fragment>
      <OrderSetting
        lang={lang}
        shipment={shipment}
        setInfo={setInfo}
        handleOpenShipment={handleOpenShipment}
      />
      <OrderCreator lang={lang} />
      <OrderCustomer lang={lang} />
      <OrderReceived
        lang={lang}
        isUpdate={isUpdate}
        canInteract={canInteract}
        shipment={shipment}
        setInfo={setInfo}
        setShipment={setShipment}
        onReFetch={onReFetch}
        handleOpenShipment={handleOpenShipment}
      />
    </Fragment>
  );

  return (
    <Fragment>
      <Breadcrumb items={items} />
      <FormLayout<Order>
        loading={isFetching}
        submitting={!canInteract || isSubmitting}
        initialData={initialData}
        headerProps={headerProps}
        leftItems={leftItems}
        rightItems={rightItems}
        onFinish={handleSubmit}
      />
      <SelectProductModal
        open={openSelect}
        isUpdate={isUpdate}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        onCancel={handleOpenSelect}
      />
      <ShipmentModal
        lang={lang}
        isUpdate={isUpdate}
        orderId={state?.id as string}
        shipment={shipment}
        open={openShipment}
        onReFetch={onReFetch}
        onFinish={handleSetShipment}
        onCancel={handleOpenShipment}
      />
    </Fragment>
  );
};

export default Order;
