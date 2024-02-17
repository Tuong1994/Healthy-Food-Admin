import { FC, Fragment, Dispatch, SetStateAction, useState, Key } from "react";
import { Table, Button, Space } from "@/components/UI";
import type { Confirmed, Lang } from "@/common/type";
import type { Columns } from "@/components/UI/Table/type";
import type { Shipment } from "@/services/shipment/type";
import type { ApiQuery, ApiResponse, Paging } from "@/services/type";
import type { Order } from "@/services/order/type";
import { Link } from "react-router-dom";
import { linkPaths } from "@/common/constant/url";
import { PiWarning } from "react-icons/pi";
import { REPLACE_NUM_REGEX } from "@/common/constant/regex";
import ShipmentsTableFilter from "./ShipmentsTableFilter";
import ConfirmModal from "@/components/Page/ConfirmModal";
import Error from "@/components/Page/Error";
import moment from "moment";

const { SHIPMENT, ORDER } = linkPaths;

interface ShipmentsTableProps {
  lang: Lang;
  shipments: ApiResponse<Paging<Shipment>> | undefined;
  isLoading: boolean;
  isError: boolean;
  apiQuery: ApiQuery;
  handleResetFilter: () => void;
  setApiQuery: Dispatch<SetStateAction<ApiQuery>>;
}

const ShipmentsTable: FC<ShipmentsTableProps> = ({
  lang,
  shipments,
  isLoading,
  isError,
  apiQuery,
  setApiQuery,
  handleResetFilter,
}) => {
  const [confirmed, setConfirmed] = useState<Confirmed>({ open: false, ids: [] });

  const dataSource = (): Shipment[] => {
    if (!shipments) return [];
    if (!shipments.success) return [];
    return shipments.data?.items || [];
  };

  const columns: Columns<Shipment> = [
    {
      id: "shipmentNumber",
      title: lang.common.table.head.shipmentNumber,
      dataIndex: "shipmentNumber",
      render: (number: string, shipment: Shipment) => (
        <Link to={SHIPMENT} state={{ id: shipment.id }}>
          <Button text>{number}</Button>
        </Link>
      ),
    },
    {
      id: "fullName",
      title: lang.common.table.head.customerName,
      dataIndex: "fullName",
    },
    {
      id: "phone",
      title: lang.common.table.head.phone,
      dataIndex: "phone",
    },
    {
      id: "email",
      title: lang.common.table.head.email,
      dataIndex: "email",
    },
    {
      id: "address",
      title: lang.common.table.head.address,
      dataIndex: "address",
    },
    {
      id: "orderNumber",
      title: lang.common.table.head.orderNumber,
      dataIndex: "order",
      render: (order: Order) => (
        <Link to={ORDER} state={{ id: order?.id }}>
          <Button text>{order?.orderNumber}</Button>
        </Link>
      ),
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

  const handleChangePage = (page: number) => setApiQuery((prev) => ({ ...prev, page }));

  const handleOpenModal = (ids: Key[]) => setConfirmed((prev) => ({ ...prev, open: true, ids }));

  const handleCloseModal = () => setConfirmed((prev) => ({ ...prev, open: false, ids: [] }));

  const renderContent = () => {
    if (isError) return <Error />;
    return (
      <Table<Shipment>
        color="green"
        hasFilter
        hasPagination
        hasRowSelection
        loading={isLoading}
        showRemove={confirmed.open}
        columns={columns}
        dataSource={dataSource()}
        onSelectRows={handleOpenModal}
        filter={<ShipmentsTableFilter lang={lang} apiQuery={apiQuery} setApiQuery={setApiQuery} />}
        filterProps={{ hasFilterButton: false, onCancelFilter: handleResetFilter }}
        paginationProps={{
          showContent: true,
          total: shipments?.data?.totalItems ?? 0,
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

export default ShipmentsTable;
