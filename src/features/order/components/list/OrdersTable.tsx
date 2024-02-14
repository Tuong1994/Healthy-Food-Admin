import { FC, Fragment, Dispatch, SetStateAction, Key, useState } from "react";
import { Image, Table, Button, Space } from "@/components/UI";
import type { Columns } from "@/components/UI/Table/type";
import type { Order, OrderItem } from "@/services/order/type";
import type { Product } from "@/services/product/type";
import type { ApiQuery, ApiResponse, Paging } from "@/services/type";
import type { Confirmed } from "@/common/type";
import { EOrderStatus, EPaymentMethod, EPaymentStatus } from "@/services/order/enum";
import { PiWarning } from "react-icons/pi";
import { REPLACE_NUM_REGEX } from "@/common/constant/regex";
import { Link } from "react-router-dom";
import { linkPaths } from "@/common/constant/url";
import { HttpStatus } from "@/services/axios";
import { useLang } from "@/hooks";
import OrdersTableFilter from "./OrdersTableFilter";
import ConfirmModal from "@/components/Page/ConfirmModal";
import Error from "@/components/Page/Error";
import getDisplayOrderStatus from "@/features/order/data-display/getDisplayOrderStatus";
import getDisplayPaymentStatus from "@/features/order/data-display/getDisplayPaymentStatus";
import getDisplayPaymentMethod from "@/features/order/data-display/getDisplayPaymentMethod";
import useMenu from "@/components/UI/Layout/Menu/useMenu";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import useRemoveOrders from "../../hooks/useRemoveOrders";
import moment from "moment";
import utils from "@/utils";

const { ORDER, PRODUCT } = linkPaths;

interface OrdersTableProps {
  orders: ApiResponse<Paging<Order>> | undefined;
  isLoading: boolean;
  isError: boolean;
  apiQuery: ApiQuery;
  handleResetFilter: () => void;
  handleReFetch: () => void;
  setApiQuery: Dispatch<SetStateAction<ApiQuery>>;
}

const OrdersTable: FC<OrdersTableProps> = ({
  orders,
  isLoading,
  isError,
  apiQuery,
  setApiQuery,
  handleReFetch,
  handleResetFilter,
}) => {
  const messageApi = useMessage();

  const { locale, lang } = useLang();

  const { setActiveId } = useMenu();

  const [confirmed, setConfirmed] = useState<Confirmed>({ open: false, ids: [] });

  const { mutate: onRemoveOrders, isLoading: removeLoading } = useRemoveOrders();

  const dataSource = (): Order[] => {
    if (!orders) return [];
    if (!orders.success) return [];
    return orders.data?.items || [];
  };

  const columns: Columns<Order> = [
    {
      id: "orderNumber",
      title: lang.common.table.head.orderNumber,
      dataIndex: "orderNumber",
      render: (orderNumber: string, data: Order) => (
        <Link to={ORDER} state={{ id: data.id }}>
          <Button text>{orderNumber}</Button>
        </Link>
      ),
    },
    {
      id: "status",
      title: lang.common.table.head.status,
      dataIndex: "status",
      render: (status: EOrderStatus) => <>{getDisplayOrderStatus(lang, status)}</>,
    },
    {
      id: "paymentMethod",
      title: lang.common.table.head.paymentMethod,
      dataIndex: "paymentMethod",
      render: (method: EPaymentMethod) => <>{getDisplayPaymentMethod(lang, method)}</>,
    },
    {
      id: "paymentStatus",
      title: lang.common.table.head.paymentStatus,
      dataIndex: "paymentStatus",
      render: (paymentStatus: EPaymentStatus) => <>{getDisplayPaymentStatus(lang, paymentStatus)}</>,
    },
    {
      id: "createdAt",
      title: lang.common.table.head.createdAt,
      dataIndex: "createdAt",
      render: (date: Date) => <>{moment(date).format("DD/MM/YYYY")}</>,
    },
    {
      id: "updatedAt",
      title: lang.common.table.head.updatedAt,
      dataIndex: "updatedAt",
      render: (date: Date) => <>{moment(date).format("DD/MM/YYYY")}</>,
    },
  ];

  const expandRowTable = (order: Order) => {
    const columns: Columns<OrderItem> = [
      {
        id: "productImage",
        title: lang.common.table.head.image,
        dataIndex: "product",
        render: () => <Image imgWidth={40} imgHeight={40} />,
      },
      {
        id: "productName",
        title: lang.common.table.head.productName,
        dataIndex: "product",
        render: (product: Product) => (
          <Link to={PRODUCT} state={{ id: product.id }} onClick={() => setActiveId(["product"])}>
            <Button text>{product.name}</Button>
          </Link>
        ),
      },
      {
        id: "quantity",
        title: lang.common.table.head.quantity,
        dataIndex: "quantity",
      },
      {
        id: "productPrice",
        title: lang.common.table.head.price,
        dataIndex: "product",
        render: (product: Product) => <>{utils.formatPrice(locale, product.totalPrice)}</>,
      },
    ];

    return <Table<OrderItem> color="green" dataSource={order.items} columns={columns} />;
  };

  const handleChangePage = (page: number) => setApiQuery((prev) => ({ ...prev, page }));

  const handleOpenModal = (ids: Key[]) => setConfirmed((prev) => ({ ...prev, open: true, ids }));

  const handleCloseModal = () => setConfirmed((prev) => ({ ...prev, open: false, ids: [] }));

  const handleRemove = () => {
    const listIds = confirmed.ids.join(",");
    onRemoveOrders(
      { ids: listIds },
      {
        onSuccess: (response) => {
          if (!response.success) {
            let message = "";
            if (response.error?.status === HttpStatus.NOT_FOUND) message = lang.common.message.error.remove;
            return messageApi.error(message);
          }
          messageApi.success(lang.common.message.success.remove);
          handleCloseModal();
          handleReFetch();
        },
      }
    );
  };

  const renderContent = () => {
    if (isError) return <Error />;
    return (
      <Table<Order>
        color="green"
        hasFilter
        hasRowExpand
        hasPagination
        hasRowSelection
        loading={isLoading}
        showRemove={confirmed.open}
        columns={columns}
        dataSource={dataSource()}
        expandRowTable={expandRowTable}
        onSelectRows={handleOpenModal}
        filter={<OrdersTableFilter lang={lang} apiQuery={apiQuery} setApiQuery={setApiQuery} />}
        filterProps={{ hasFilterButton: false, onCancelFilter: handleResetFilter }}
        paginationProps={{
          showContent: true,
          total: orders?.data?.totalItems ?? 0,
          onChangePage: handleChangePage,
        }}
      />
    );
  };

  return (
    <Fragment>
      {renderContent()}
      <ConfirmModal
        open={confirmed.open}
        okButtonProps={{ loading: removeLoading }}
        onOk={handleRemove}
        onCancel={handleCloseModal}
        desciption={
          <Space align="middle" justify="center">
            <PiWarning size={20} className="remove-modal-icon" />
            <span>
              {lang.common.description.remove.replace(REPLACE_NUM_REGEX, String(confirmed.ids.length))}
            </span>
          </Space>
        }
      />
    </Fragment>
  );
};

export default OrdersTable;
