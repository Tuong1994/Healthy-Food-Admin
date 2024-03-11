import { FC, Fragment, useMemo, useState } from "react";
import { Space, Divider, Typography } from "@/components/UI";
import { Select } from "@/components/Control";
import type { Lang } from "@/common/type";
import type { User } from "@/services/user/type";
import type { ApiQuery } from "@/services/type";
import type { UserPermission } from "@/services/setting/type";
import PermissionsLoading from "./PermissionsLoading";
import PermissionsNote from "./PermissionsNote";
import PermissionsActions from "./PermissionsActions";
import useDebounce from "@/hooks/features/useDebounce";
import useGetUsersOptions from "@/hooks/actions/useGetUsersOptions";
import useGetUserPermission from "../../hooks/useGetUserPermission";
import useSetUserPermission from "../../hooks/useSetUserPermission";
import utils from "@/utils";

const { Paragraph } = Typography;

interface StaffSettingPermissionProps {
  lang: Lang;
}

const StaffSettingPermission: FC<StaffSettingPermissionProps> = ({ lang }) => {
  const [selectedStaff, setSelectedStaff] = useState<string>("");

  const [apiQuery, setApiQuery] = useState<ApiQuery>({ page: 1, limit: 10, staffOnly: true, keywords: "" });

  const debounce = useDebounce(apiQuery.keywords as string);

  const { data: optionsResponse, isFetching: optionsLoading } = useGetUsersOptions({
    ...apiQuery,
    keywords: debounce,
  });

  const {
    data: permissionResponse,
    isFetching,
    refetch,
  } = useGetUserPermission({ userId: selectedStaff }, Boolean(selectedStaff));

  const { mutate: onSetUserPermission } = useSetUserPermission();

  const staffs = useMemo(() => {
    if (!optionsResponse) return [];
    if (!optionsResponse.data) return [];
    return optionsResponse.data.items || [];
  }, [optionsResponse]);

  const staffsOptions = utils.mapDataToOptions<User>(staffs, "fullName", "id");

  const handleSearch = (text: string) => setApiQuery((prev) => ({ ...prev, keywords: text }));

  const handleChangePage = (page: number) => setApiQuery((prev) => ({ ...prev, page }));

  const handleSelect = (value: any) => setSelectedStaff(value);

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
        <Paragraph>{lang.setting.staff.selectLabel}</Paragraph>
        <Select
          async
          color="green"
          hasClear={false}
          loading={optionsLoading}
          total={optionsResponse?.data?.totalItems}
          options={staffsOptions}
          onChangeSelect={handleSelect}
          onChangeSearch={handleSearch}
          onChangePage={handleChangePage}
        />
      </Space>
      <Divider />
      {renderContent()}
    </Fragment>
  );
};

export default StaffSettingPermission;
