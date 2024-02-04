import { Dispatch, FC, Fragment, Key, SetStateAction, useState } from "react";
import { Image, Table, Button, Space } from "@/components/UI";
import type { Columns } from "@/components/UI/Table/type";
import type { Product } from "@/services/product/type";
import type { ApiQuery, ApiResponse, Paging } from "@/services/type";
import type { Confirmed } from "@/common/type";
import { Link } from "react-router-dom";
import { linkPaths } from "@/common/constant/url";
import { useLang } from "@/hooks";
import { EInventoryStatus, EProductOrigin, EProductStatus, EProductUnit } from "@/services/product/enum";
import { PiWarning } from "react-icons/pi";
import { REPLACE_NUM_REGEX } from "@/common/constant/regex";
import ProductsTableFilter from "./ProductsTableFilter";
import Error from "@/components/Page/Error";
import getDisplayInventoryStatus from "@/features/product/data-display/getDisplayInventoryStatus";
import getDisplayProductStatus from "@/features/product/data-display/getDisplayProductStatus";
import getDisplayProductOrigin from "@/features/product/data-display/getDisplayProductOrigin";
import getDisplayProductUnit from "@/features/product/data-display/getDisplayProductUnit";
import moment from "moment";
import utils from "@/utils";
import ConfirmModal from "@/components/Page/ConfirmModal";

const { PRODUCT } = linkPaths;

interface ProductsTableProps {
  products: ApiResponse<Paging<Product>> | undefined;
  isLoading: boolean;
  isError: boolean;
  apiQuery: ApiQuery;
  handleResetFilter: () => void;
  setApiQuery: Dispatch<SetStateAction<ApiQuery>>;
}

const ProductsTable: FC<ProductsTableProps> = ({
  products,
  isLoading,
  isError,
  apiQuery,
  setApiQuery,
  handleResetFilter,
}) => {
  const { locale, lang } = useLang();

  const [confirmed, setConfirmed] = useState<Confirmed>({ open: false, ids: [] });

  const dataSource = (): Product[] => {
    if (!products) return [];
    if (!products.success) return [];
    return products.data?.items || [];
  };

  const columns: Columns<Product> = [
    {
      id: "image",
      title: lang.common.table.head.image,
      dataIndex: "id",
      render: () => <Image imgWidth={40} imgHeight={40} />,
    },
    {
      id: "name",
      title: lang.common.table.head.productName,
      dataIndex: "name",
      render: (name: string, data: Product) => (
        <Link to={PRODUCT} state={{ id: data.id }}>
          <Button text>{name}</Button>
        </Link>
      ),
    },
    {
      id: "price",
      title: lang.common.table.head.price,
      dataIndex: "totalPrice",
      render: (price: number) => <>{utils.formatPrice(locale, price)}</>,
    },
    {
      id: "inventory",
      title: lang.common.table.head.inventory,
      dataIndex: "inventory",
      render: (inventory: number) => <>{inventory.toLocaleString()}</>,
    },
    {
      id: "inventoryStatus",
      title: lang.common.table.head.inventoryStatus,
      dataIndex: "inventoryStatus",
      render: (status: EInventoryStatus) => <>{getDisplayInventoryStatus(lang, status)}</>,
    },
    {
      id: "status",
      title: lang.common.table.head.status,
      dataIndex: "status",
      render: (status: EProductStatus) => <>{getDisplayProductStatus(lang, status)}</>,
    },
    {
      id: "origin",
      title: lang.common.table.head.origin,
      dataIndex: "origin",
      render: (origin: EProductOrigin) => <>{getDisplayProductOrigin(lang, origin)}</>,
    },
    {
      id: "supplier",
      title: lang.common.table.head.supplier,
      dataIndex: "supplier",
    },
    {
      id: "unit",
      title: lang.common.table.head.unit,
      dataIndex: "unit",
      render: (unit: EProductUnit) => <>{getDisplayProductUnit(lang, unit)}</>,
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

  const handleChangePage = (page: number) => {
    setApiQuery((prev) => ({ ...prev, page }));
  };

  const handleOpenModal = (ids: Key[]) => setConfirmed((prev) => ({ ...prev, open: true, ids }));

  const handleCloseModal = () => setConfirmed((prev) => ({ ...prev, open: false, ids: [] }));

  const renderContent = () => {
    if (isError) return <Error />;
    return (
      <Table<Product>
        color="green"
        hasFilter
        hasPagination
        hasRowSelection
        loading={isLoading}
        columns={columns}
        showRemove={confirmed.open}
        dataSource={dataSource()}
        onSelectRows={handleOpenModal}
        filter={<ProductsTableFilter lang={lang} apiQuery={apiQuery} setApiQuery={setApiQuery} />}
        filterProps={{ hasFilterButton: false, onCancelFilter: handleResetFilter }}
        paginationProps={{
          showContent: true,
          total: products?.data?.totalItems ?? 0,
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

export default ProductsTable;
