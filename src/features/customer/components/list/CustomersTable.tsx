import { FC, Fragment, Key, Dispatch, SetStateAction, useState } from "react";
import { Image, Table, Button, Space } from "@/components/UI";
import type { Customer, CustomerAddress } from "@/services/customer/type";
import type { Columns } from "@/components/UI/Table/type";
import type { ApiQuery, ApiResponse, Paging } from "@/services/type";
import type { Confirmed } from "@/common/type";
import type { ImageUpload } from "@/services/image/type";
import { EGender, ERole } from "@/services/customer/enum";
import { Link } from "react-router-dom";
import { linkPaths } from "@/common/constant/url";
import { PiWarning } from "react-icons/pi";
import { REPLACE_NUM_REGEX } from "@/common/constant/regex";
import { useLang } from "@/hooks";
import CustomersTableFilter from "./CustomersTableFilter";
import ConfirmModal from "@/components/Page/ConfirmModal";
import Error from "@/components/Page/Error";
import getDisplayGender from "@/features/customer/data-display/getDisplayGender";
import getDisplayRole from "@/features/customer/data-display/getDisplayRole";
import utils from "@/utils";
import moment from "moment";

const { CUSTOMER } = linkPaths;

interface CustomersTableProps {
  customers: ApiResponse<Paging<Customer>> | undefined;
  isLoading: boolean;
  isError: boolean;
  apiQuery: ApiQuery;
  handleResetFilter: () => void;
  setApiQuery: Dispatch<SetStateAction<ApiQuery>>;
}

const CustomersTable: FC<CustomersTableProps> = ({
  customers,
  isLoading,
  isError,
  apiQuery,
  setApiQuery,
  handleResetFilter,
}) => {
  const { lang } = useLang();

  const [confirmed, setConfirmed] = useState<Confirmed>({ open: false, ids: [] });

  const dataSource = (): Customer[] => {
    if (!customers) return [];
    if (!customers.success) return [];
    return customers.data?.items || [];
  };

  const columns: Columns<Customer> = [
    {
      id: "image",
      title: lang.common.table.head.image,
      dataIndex: "image",
      render: (image: ImageUpload) => <Image src={image?.path} imgWidth={40} imgHeight={40} />,
    },
    {
      id: "email",
      title: lang.common.table.head.email,
      dataIndex: "email",
      render: (email: string, customer: Customer) => (
        <Link to={CUSTOMER} state={{ id: customer.id }}>
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
      render: (phone: string) => <>{utils.formatPhoneNumber(phone)}</>,
    },
    {
      id: "gender",
      title: lang.common.table.head.gender,
      dataIndex: "gender",
      render: (gender: EGender) => <>{getDisplayGender(lang, gender)}</>,
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
      render: (address: CustomerAddress) => <>{address ? address.fullAddress : "--"}</>,
    },
    {
      id: "role",
      title: lang.common.table.head.role,
      dataIndex: "role",
      render: (role: ERole) => <>{getDisplayRole(lang, role)}</>,
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
      <Table<Customer>
        color="green"
        rowKey="id"
        hasFilter
        hasPagination
        hasRowSelection
        loading={isLoading}
        columns={columns}
        showRemove={confirmed.open}
        dataSource={dataSource()}
        onSelectRows={handleOpenModal}
        filter={<CustomersTableFilter lang={lang} apiQuery={apiQuery} setApiQuery={setApiQuery} />}
        filterProps={{ hasFilterButton: false, onCancelFilter: handleResetFilter }}
        paginationProps={{
          showContent: true,
          total: customers?.data?.totalItems ?? 0,
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

export default CustomersTable;
