import { FC, Fragment } from "react";
import { Image, Table, Button } from "@/components/UI";
import type { Lang } from "@/common/type";
import type { Columns } from "@/components/UI/Table/type";
import type { Order, OrderItem } from "@/services/order/type";
import { EOrderStatus, EPaymentMethod, EPaymentStatus } from "@/services/order/enum";
import { useLang } from "@/hooks";
import { Link } from "react-router-dom";
import { linkPaths } from "@/common/constant/url";
import OrdersTableFilter from "./OrdersTableFilter";
import useMenu from "@/components/UI/Layout/Menu/useMenu";
import useDisplayOrderStatus from "../hooks/useDisplayOrderStatus";
import useDisplayPaymentStatus from "../hooks/useDisplayPaymentStatus";
import useDisplayPaymentMethod from "../hooks/useDisplayPaymentMethod";
import moment from "moment";
import utils from "@/utils";

const { ORDER, PRODUCT } = linkPaths;

interface OrdersTableProps {
  lang: Lang;
}

const OrdersTable: FC<OrdersTableProps> = ({ lang }) => {
  const { locale } = useLang();

  const { setActiveId } = useMenu();

  const dataSource: Order[] = [
    {
      id: "1",
      orderNumber: "#00001",
      status: EOrderStatus.DELIVERED,
      paymentStatus: EPaymentStatus.PAID,
      paymentMethod: EPaymentMethod.TRANSFER,
      customerId: "1",
      createdAt: new Date(),
      updatedAt: new Date(),
      items: [
        {
          id: "item-1",
          productName: "Product 1",
          productPrice: 100000,
          productImage: null,
          productId: "product-1",
          quantity: 1,
          orderId: "1",
        },
        {
          id: "item-2",
          productName: "Product 2",
          productPrice: 100000,
          productImage: null,
          productId: "product-2",
          quantity: 1,
          orderId: "1",
        },
        {
          id: "item-3",
          productName: "Product 3",
          productPrice: 100000,
          productImage: null,
          productId: "product-3",
          quantity: 1,
          orderId: "1",
        },
        {
          id: "item-4",
          productName: "Product 4",
          productPrice: 100000,
          productImage: null,
          productId: "product-4",
          quantity: 1,
          orderId: "1",
        },
      ],
    },
    {
      id: "2",
      orderNumber: "#00002",
      status: EOrderStatus.DELIVERING,
      paymentStatus: EPaymentStatus.UNPAID,
      paymentMethod: EPaymentMethod.COD,
      customerId: "1",
      createdAt: new Date(),
      updatedAt: new Date(),
      items: [
        {
          id: "item-1",
          productName: "Product 4",
          productPrice: 200000,
          productImage: null,
          productId: "product-4",
          quantity: 2,
          orderId: "1",
        },
        {
          id: "item-2",
          productName: "Product 5",
          productPrice: 200000,
          productImage: null,
          productId: "product-6",
          quantity: 5,
          orderId: "1",
        },
      ],
    },
  ];

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
      render: (status: EOrderStatus) => <>{useDisplayOrderStatus(status)}</>,
    },
    {
      id: "paymentMethod",
      title: lang.common.table.head.paymentMethod,
      dataIndex: "paymentMethod",
      render: (method: EPaymentMethod) => <>{useDisplayPaymentMethod(method)}</>,
    },
    {
      id: "paymentStatus",
      title: lang.common.table.head.paymentStatus,
      dataIndex: "paymentStatus",
      render: (paymentStatus: EPaymentStatus) => <>{useDisplayPaymentStatus(paymentStatus)}</>,
    },
    {
      id: "createdAt",
      title: lang.common.table.head.createdAt,
      dataIndex: "createdAt",
      render: (data: Date) => <>{moment(data).format("DD/MM/YYYY")}</>,
    },
  ];

  const expandRowTable = (order: Order) => {
    const columns: Columns<OrderItem> = [
      {
        id: "productImage",
        title: lang.common.table.head.image,
        dataIndex: "productImage",
        render: () => <Image imgWidth={60} imgHeight={60} />,
      },
      {
        id: "productName",
        title: lang.common.table.head.productName,
        dataIndex: "productName",
        render: (productName: string, data: OrderItem) => (
          <Link to={PRODUCT} state={{ id: data.id }} onClick={() => setActiveId(["product"])}>
            <Button text>{productName}</Button>
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
        dataIndex: "productPrice",
        render: (data: number) => <>{utils.formatPrice(locale, data)}</>,
      },
    ];

    return <Table<OrderItem> color="green" dataSource={order.items} columns={columns} />;
  };

  return (
    <Fragment>
      <Table<Order>
        color="green"
        hasFilter
        hasRowExpand
        hasPagination
        hasRowSelection
        dataSource={dataSource}
        columns={columns}
        filter={<OrdersTableFilter />}
        expandRowTable={expandRowTable}
      />
    </Fragment>
  );
};

export default OrdersTable;
