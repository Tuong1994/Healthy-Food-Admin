import { FC, Fragment } from "react";
import { Table, Button } from "@/components/UI";
import type { Lang } from "@/common/type";
import type { Columns } from "@/components/UI/Table/type";
import type { Shipment } from "@/services/shipment/type";
import { Link } from "react-router-dom";
import ShipmentsTableFilter from "./ShipmentsTableFilter";
import url from "@/common/constant/url";
import moment from "moment";

const { SHIPMENT_FORM } = url;

interface ShipmentsTableProps {
  lang: Lang;
}

const ShipmentsTable: FC<ShipmentsTableProps> = ({ lang }) => {
  const dataSource: Shipment[] = [
    {
      id: "1",
      fullName: "Kevin Beacon",
      phone: "0793229945",
      email: "kevin@gmail.com",
      address: "79/24/13 Au Co Str, Ward 14, District 11, HCMC",
      orderId: "1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      fullName: "Claire Williams",
      phone: "0793229478",
      email: "claire@gmail.com",
      address: "79/19 Lanh Binh Thang Str, Ward 14, District 11, HCMC",
      orderId: "2",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const columns: Columns<Shipment> = [
    {
      id: "fullName",
      title: lang.common.table.head.customerName,
      dataIndex: "fullName",
      render: (name: string, data: Shipment) => (
        <Link to={SHIPMENT_FORM} state={{ id: data.id }}>
          <Button text>{name}</Button>
        </Link>
      ),
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
      <Table<Shipment>
        color="green"
        hasFilter
        hasPagination
        hasRowSelection
        dataSource={dataSource}
        columns={columns}
        filter={<ShipmentsTableFilter />}
      />
    </Fragment>
  );
};

export default ShipmentsTable;
