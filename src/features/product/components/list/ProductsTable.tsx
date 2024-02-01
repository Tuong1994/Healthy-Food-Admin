import { Dispatch, FC, Fragment, SetStateAction } from "react";
import { Image, Table, Button } from "@/components/UI";
import type { Lang } from "@/common/type";
import type { Columns } from "@/components/UI/Table/type";
import type { Product } from "@/services/product/type";
import type { ApiQuery, ApiResponse, Paging } from "@/services/type";
import { Link } from "react-router-dom";
import { linkPaths } from "@/common/constant/url";
import { useLang } from "@/hooks";
import { EInventoryStatus, EProductOrigin, EProductStatus, EProductUnit } from "@/services/product/enum";
import ProductsTableFilter from "./ProductsTableFilter";
import Error from "@/components/Page/Error";
import getDisplayInventoryStatus from "@/features/product/data-display/getDisplayInventoryStatus";
import getDisplayProductStatus from "@/features/product/data-display/getDisplayProductStatus";
import getDisplayProductOrigin from "@/features/product/data-display/getDisplayProductOrigin";
import getDisplayProductUnit from "@/features/product/data-display/getDisplayProductUnit";
import moment from "moment";
import utils from "@/utils";

const { PRODUCT } = linkPaths;

interface ProductsTableProps {
  products: ApiResponse<Paging<Product>> | undefined;
  isLoading: boolean;
  isError: boolean;
  lang: Lang;
  apiQuery: ApiQuery;
  setApiQuery: Dispatch<SetStateAction<ApiQuery>>;
}

const ProductsTable: FC<ProductsTableProps> = ({
  products,
  isLoading,
  isError,
  lang,
  apiQuery,
  setApiQuery,
}) => {
  const { locale } = useLang();

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

  const renderContent = () => {
    if (isError) return <Error />;
    return (
      <Table<Product>
        color="green"
        hasFilter
        hasPagination
        hasRowSelection
        loading={isLoading}
        dataSource={dataSource()}
        columns={columns}
        filter={<ProductsTableFilter lang={lang} apiQuery={apiQuery} setApiQuery={setApiQuery} />}
        paginationProps={{ total: products?.data?.totalItems ?? 0, onChangePage: handleChangePage }}
      />
    );
  };

  return <Fragment>{renderContent()}</Fragment>;
};

export default ProductsTable;
