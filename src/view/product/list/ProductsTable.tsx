import { FC, Fragment } from "react";
import { Image, Table, Button } from "@/components/UI";
import type { Lang } from "@/common/type";
import type { Columns } from "@/components/UI/Table/type";
import type { Product } from "@/services/product/type";
import { ELang } from "@/common/enum";
import { EInventoryStatus, EProductOrigin, EProductStatus, EProductUnit } from "@/services/product/enum";
import { useLang } from "@/hooks";
import { Link } from "react-router-dom";
import { linkPaths } from "@/common/constant/url";
import ProductsTableFilter from "./ProductsTableFilter";
import useDisplayInventoryStatus from "../hooks/useDisplayInventoryStatus";
import useDisplayProductStatus from "../hooks/useDisplayProductStatus";
import useDisplayProductOrigin from "../hooks/useDisplayProductOrigin";
import useDisplayProductUnit from "../hooks/useDisplayProductUnit";
import moment from "moment";
import utils from "@/utils";

const { PRODUCT } = linkPaths;

interface ProductsTableProps {
  lang: Lang;
}

const ProductsTable: FC<ProductsTableProps> = ({ lang }) => {
  const { locale } = useLang();

  const dataSource: Product[] = [
    {
      id: "1",
      nameEn: "Name En",
      nameVn: "Name Vn",
      costPrice: 50000,
      profit: 25,
      totalPrice: 75000,
      inventory: 1000,
      supplier: "Healthy Food",
      unit: EProductUnit.KG,
      status: EProductStatus.ACTIVE,
      inventoryStatus: EInventoryStatus.IN_STOCK,
      origin: EProductOrigin.VN,
      categoryId: "CATE_1",
      subCategoryId: "SUBCATE_1",
      isNew: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      nameEn: "Name En",
      nameVn: "Name Vn",
      costPrice: 150000,
      profit: 25,
      totalPrice: 175000,
      inventory: 1000,
      supplier: "Healthy Food",
      unit: EProductUnit.BIN,
      status: EProductStatus.ACTIVE,
      inventoryStatus: EInventoryStatus.IN_STOCK,
      origin: EProductOrigin.VN,
      categoryId: "CATE_1",
      subCategoryId: "SUBCATE_1",
      isNew: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      nameEn: "Name En",
      nameVn: "Name Vn",
      costPrice: 50000,
      profit: 25,
      totalPrice: 75000,
      inventory: 1000,
      supplier: "Healthy Food",
      unit: EProductUnit.KG,
      status: EProductStatus.DRAFT,
      inventoryStatus: EInventoryStatus.OUT_OF_STOCK,
      origin: EProductOrigin.VN,
      categoryId: "CATE_1",
      subCategoryId: "SUBCATE_1",
      isNew: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const columns: Columns<Product> = [
    {
      id: "image",
      title: lang.common.table.head.image,
      dataIndex: "id",
      render: () => <Image imgWidth={60} imgHeight={60} />,
    },
    {
      id: "name",
      title: lang.common.table.head.productName,
      dataIndex: locale === ELang.EN ? "nameEn" : "nameVn",
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
      render: (status: EInventoryStatus) => <>{useDisplayInventoryStatus(status)}</>,
    },
    {
      id: "status",
      title: lang.common.table.head.status,
      dataIndex: "status",
      render: (status: EProductStatus) => <>{useDisplayProductStatus(status)}</>,
    },
    {
      id: "origin",
      title: lang.common.table.head.origin,
      dataIndex: "origin",
      render: (origin: EProductOrigin) => <>{useDisplayProductOrigin(origin)}</>,
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
      render: (unit: EProductUnit) => <>{useDisplayProductUnit(unit)}</>,
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

  return (
    <Fragment>
      <Table<Product>
        color="green"
        hasFilter
        hasPagination
        hasRowSelection
        dataSource={dataSource}
        columns={columns}
        filter={<ProductsTableFilter />}
      />
    </Fragment>
  );
};

export default ProductsTable;
