import { FC, Fragment, Key, Dispatch, SetStateAction, useState } from "react";
import { Image, Table, Button, Space } from "@/components/UI";
import type { User, UserAddress } from "@/services/user/type";
import type { Columns } from "@/components/UI/Table/type";
import type { ApiQuery, ApiResponse, Paging } from "@/services/type";
import type { Confirmed } from "@/common/type";
import type { ImageUpload } from "@/services/image/type";
import { EGender, ERole } from "@/services/user/enum";
import { Link } from "react-router-dom";
import { linkPaths } from "@/common/constant/url";
import { PiWarning } from "react-icons/pi";
import { REPLACE_NUM_REGEX } from "@/common/constant/regex";
import { useLang } from "@/hooks";
import UsersTableFilter from "./UsersTableFilter";
import ConfirmModal from "@/components/Page/ConfirmModal";
import Error from "@/components/Page/Error";
import getDisplayGender from "@/features/user/data-display/getDisplayGender";
import getDisplayRole from "@/features/user/data-display/getDisplayRole";
import useRemoveUsers from "../../hooks/useRemoveUsers";
import utils from "@/utils";
import moment from "moment";

const { USER } = linkPaths;

interface UsersTableProps {
  users: ApiResponse<Paging<User>> | undefined;
  isLoading: boolean;
  isError: boolean;
  apiQuery: ApiQuery;
  handleResetFilter: () => void;
  handleReFetch: () => void;
  setApiQuery: Dispatch<SetStateAction<ApiQuery>>;
}

const UsersTable: FC<UsersTableProps> = ({
  users,
  isLoading,
  isError,
  apiQuery,
  setApiQuery,
  handleReFetch,
  handleResetFilter,
}) => {
  const { lang } = useLang();

  const [confirmed, setConfirmed] = useState<Confirmed>({ open: false, ids: [] });

  const dataSource = (): User[] => {
    if (!users) return [];
    if (!users.success) return [];
    return users.data?.items || [];
  };

  const columns: Columns<User> = [
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
      render: (email: string, user: User) => (
        <Link to={USER} state={{ id: user.id }}>
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
      render: (address: UserAddress) => <>{address ? address.fullAddress : "--"}</>,
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

  const { mutate: onRemoveUsers, isLoading: removeLoading } = useRemoveUsers();

  const handleChangePage = (page: number) => setApiQuery((prev) => ({ ...prev, page }));

  const handleOpenModal = (ids: Key[]) => setConfirmed((prev) => ({ ...prev, open: true, ids }));

  const handleCloseModal = () => setConfirmed((prev) => ({ ...prev, open: false, ids: [] }));

  const handleRemove = () => {
    const listIds = confirmed.ids.join(",");
    const apiQuery: ApiQuery = { ids: listIds };
    onRemoveUsers(apiQuery, {
      onSuccess: () => {
        handleReFetch();
        handleCloseModal();
      },
    });
  };

  const renderContent = () => {
    if (isError) return <Error />;
    return (
      <Table<User>
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
        filter={<UsersTableFilter lang={lang} apiQuery={apiQuery} setApiQuery={setApiQuery} />}
        filterProps={{ hasFilterButton: false, onCancelFilter: handleResetFilter }}
        paginationProps={{
          showContent: true,
          total: users?.data?.totalItems ?? 0,
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

export default UsersTable;
