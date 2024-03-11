import { FC, Fragment, Key, useState } from "react";
import { Image, Table, Button, Space } from "@/components/UI";
import type { User, UserAddress } from "@/services/user/type";
import type { Columns } from "@/components/UI/Table/type";
import type { ApiQuery } from "@/services/type";
import type { Confirmed } from "@/common/type";
import type { ImageUpload } from "@/services/image/type";
import { ESort } from "@/common/enum";
import { EGender, ERole } from "@/services/user/enum";
import { Link } from "react-router-dom";
import { linkPaths } from "@/common/constant/url";
import { PiWarning } from "react-icons/pi";
import { REPLACE_NUM_REGEX } from "@/common/constant/regex";
import { useLang, useDebounce } from "@/hooks";
import CustomersTableFilter from "./CustomersTableFilter";
import ContentHeader from "@/components/Page/ContentHeader";
import ConfirmModal from "@/components/Page/ConfirmModal";
import Error from "@/components/Page/Error";
import getDisplayGender from "@/features/user/data-display/getDisplayGender";
import getDisplayRole from "@/features/user/data-display/getDisplayRole";
import useGetUsersPaging from "@/features/user/hooks/useGetUsersPaging";
import useRemoveUsers from "@/features/user/hooks/useRemoveUsers";
import useExportUser from "@/features/user/hooks/useExportUser";
import utils from "@/utils";
import moment from "moment";

const { USER } = linkPaths;

interface CustomersTableProps {
  canCreate: boolean;
  canRemove: boolean;
}

const CustomersTable: FC<CustomersTableProps> = ({ canCreate, canRemove }) => {
  const initialApiQuery: ApiQuery = {
    page: 1,
    limit: 10,
    keywords: "",
    gender: undefined,
    sortBy: ESort.NEWEST,
    role: ERole.CUSTOMER,
  };

  const [confirmed, setConfirmed] = useState<Confirmed>({ open: false, ids: [] });

  const { locale, lang } = useLang();

  const [apiQuery, setApiQuery] = useState<ApiQuery>(initialApiQuery);

  const debounce = useDebounce(apiQuery.keywords as string);

  const {
    data: users,
    isFetching,
    isError,
    refetch,
  } = useGetUsersPaging({ ...apiQuery, keywords: debounce });

  const { mutate: onExportUser, isLoading } = useExportUser();

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

  const handleReFetch = () => refetch();

  const handleResetFilter = () => setApiQuery(initialApiQuery);

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

  const handleExport = () => {
    const apiQuery: ApiQuery = { langCode: locale };
    onExportUser(apiQuery);
  };

  const renderContent = () => {
    if (isError) return <Error />;
    return (
      <Table<User>
        color="green"
        rowKey="id"
        hasFilter
        hasPagination
        hasRowSelection={canRemove}
        loading={isFetching}
        columns={columns}
        showRemove={confirmed.open}
        dataSource={dataSource()}
        onSelectRows={handleOpenModal}
        filter={<CustomersTableFilter lang={lang} apiQuery={apiQuery} setApiQuery={setApiQuery} />}
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
      <ContentHeader
        headTitle={lang.user.list.title.customer}
        total={users?.data?.totalItems}
        right={() => (
          <Fragment>
            <Space>
              <Button ghost color="blue" loading={isLoading} onClick={handleExport}>
                {lang.common.actions.export}
              </Button>
              {canCreate && (
                <Link to={USER}>
                  <Button color="green">{lang.common.actions.create}</Button>
                </Link>
              )}
            </Space>
          </Fragment>
        )}
      />
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

export default CustomersTable;
