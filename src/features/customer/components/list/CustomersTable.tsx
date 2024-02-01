import { FC, Fragment } from "react";
import { Image, Table, Button } from "@/components/UI";
import type { Lang } from "@/common/type";
import type { Customer, CustomerAddress } from "@/services/customer/type";
import type { Columns } from "@/components/UI/Table/type";
import { EGender, ERole } from "@/services/customer/enum";
import { useLang } from "@/hooks";
import { Link } from "react-router-dom";
import { linkPaths } from "@/common/constant/url";
import CustomersTableFilter from "./CustomersTableFilter";
import useDisplayGender from "@/features/customer/hooks/data-display/useDisplayGender";
import useDisplayRole from "@/features/customer/hooks/data-display/useDisplayRole";
import moment from "moment";

const { CUSTOMER } = linkPaths;

interface CustomersTableProps {
  lang: Lang;
}

const CustomersTable: FC<CustomersTableProps> = ({ lang }) => {
  const { locale } = useLang();

  const dataSource: Customer[] = [];

  const columns: Columns<Customer> = [
    {
      id: "image",
      title: lang.common.table.head.image,
      dataIndex: "id",
      render: () => <Image imgWidth={60} imgHeight={60} />,
    },
    {
      id: "email",
      title: lang.common.table.head.email,
      dataIndex: "email",
      render: (email: string, data: Customer) => (
        <Link to={CUSTOMER} state={{ id: data.id }}>
          <Button text>{email}</Button>
        </Link>
      ),
    },
    {
      id: "name",
      title: lang.common.table.head.customerName,
      dataIndex: "fullName",
    },
    {
      id: "phone",
      title: lang.common.table.head.phone,
      dataIndex: "phone",
    },
    {
      id: "gender",
      title: lang.common.table.head.gender,
      dataIndex: "gender",
      render: (gender: EGender) => <>{useDisplayGender(gender)}</>,
    },
    {
      id: "birthday",
      title: lang.common.table.head.birthday,
      dataIndex: "birthday",
      render: (date: Date) => <>{moment(date).format("DD/MM/YYYY")}</>,
    },
    {
      id: "address",
      title: lang.common.table.head.address,
      dataIndex: "address",
      render: (address: CustomerAddress) => <>{address.fullAddress} </>,
    },
    {
      id: "role",
      title: lang.common.table.head.role,
      dataIndex: "role",
      render: (role: ERole) => <>{useDisplayRole(role)}</>,
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
      <Table<Customer>
        color="green"
        hasFilter
        hasPagination
        hasRowSelection
        dataSource={dataSource}
        columns={columns}
        filter={<CustomersTableFilter />}
      />
    </Fragment>
  );
};

export default CustomersTable;
