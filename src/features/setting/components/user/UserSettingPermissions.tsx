import { FC, Fragment, useMemo, useState } from "react";
import { Space, Divider, Typography, Grid } from "@/components/UI";
import { Select } from "@/components/Control";
import type { Lang } from "@/common/type";
import type { User } from "@/services/user/type";
import type { ApiQuery } from "@/services/type";
import type { UserPermission } from "@/services/setting/type";
import PermissionsLoading from "./PermissionsLoading";
import useDebounce from "@/hooks/features/useDebounce";
import useGetUsersOptions from "@/hooks/actions/useGetUsersOptions";
import useGetUserPermission from "../../hooks/useGetUserPermission";
import utils from "@/utils";
import PermissionsNote from "./PermissionsNote";
import PermissionsActions from "./PermissionsActions";
import useSetUserPermission from "../../hooks/useSetUserPermission";

const { Paragraph } = Typography;

const { Row, Col } = Grid;

interface UserSettingPermissionsProps {
  lang: Lang;
}

const UserSettingPermissions: FC<UserSettingPermissionsProps> = ({ lang }) => {
  const [selectedUser, setSelectedUser] = useState<string>("");

  const [apiQuery, setApiQuery] = useState<ApiQuery>({ page: 1, limit: 10, keywords: "" });

  const debounce = useDebounce(apiQuery.keywords as string);

  const { data: optionsResponse, isFetching: optionsLoading } = useGetUsersOptions({
    ...apiQuery,
    keywords: debounce,
  });

  const {
    data: permissionResponse,
    isFetching,
    refetch,
  } = useGetUserPermission({ userId: selectedUser }, Boolean(selectedUser));

  const { mutate: onSetUserPermission } = useSetUserPermission();

  const users = useMemo(() => {
    if (!optionsResponse) return [];
    if (!optionsResponse.data) return [];
    return optionsResponse.data.items || [];
  }, [optionsResponse]);

  const usersOptions = utils.mapDataToOptions<User>(users, "fullName", "id");

  const handleSearch = (text: string) => setApiQuery((prev) => ({ ...prev, keywords: text }));

  const handleChangePage = (page: number) => setApiQuery((prev) => ({ ...prev, page }));

  const handleSelect = (value: any) => setSelectedUser(value);

  const handleSetPermission = (permission: UserPermission) => {
    onSetUserPermission(permission, { onSuccess: () => refetch() });
  };

  const renderContent = () => {
    if (isFetching) return <PermissionsLoading />;
    if (!permissionResponse) return <PermissionsNote lang={lang} />;
    if (!permissionResponse.success) return <PermissionsNote lang={lang} />;
    const permission = permissionResponse.data;
    return <PermissionsActions lang={lang} permission={permission} onSetPermission={handleSetPermission} />;
  };

  return (
    <Fragment>
      <Space align="middle" size="lg">
        <Paragraph>{lang.setting.user.selectLabel}</Paragraph>
        <Select
          async
          color="green"
          hasClear={false}
          loading={optionsLoading}
          total={optionsResponse?.data?.totalItems}
          options={usersOptions}
          onChangeSelect={handleSelect}
          onChangeSearch={handleSearch}
          onChangePage={handleChangePage}
        />
      </Space>
      <Divider />
      <Row>
        <Col span={16}>{renderContent()}</Col>
      </Row>
    </Fragment>
  );
};

export default UserSettingPermissions;
