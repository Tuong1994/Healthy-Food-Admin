import { FC, Fragment, useState } from "react";
import { Space, Button } from "@/components/UI";
import { useLang } from "@/hooks";
import { Link } from "react-router-dom";
import { linkPaths } from "@/common/constant/url";
import { ESort } from "@/common/enum";
import type { ApiQuery } from "@/services/type";
import ContentHeader from "@/components/Page/ContentHeader";
import UsersTable from "@/features/user/components/list/UsersTable";
import useGetUsersPaging from "@/features/user/hooks/useGetUsersPaging";
import useExportUser from "@/features/user/hooks/useExportUser";
import useDebounce from "@/hooks/features/useDebounce";

const { USER } = linkPaths;

interface UsersProps {}

const Users: FC<UsersProps> = () => {
  const { locale, lang } = useLang();

  const initialApiQuery: ApiQuery = {
    page: 1,
    limit: 10,
    keywords: "",
    sortBy: ESort.NEWEST,
    gender: undefined,
    role: undefined,
  };

  const [apiQuery, setApiQuery] = useState<ApiQuery>(initialApiQuery);

  const debounce = useDebounce(apiQuery.keywords as string);

  const {
    data: users,
    isFetching,
    isError,
    refetch,
  } = useGetUsersPaging({ ...apiQuery, keywords: debounce });

  const { mutate: onExportUser, isLoading } = useExportUser();

  const handleResetFilter = () => setApiQuery(initialApiQuery);

  const handleReFetch = () => refetch();

  const handleExport = () => {
    const apiQuery: ApiQuery = { langCode: locale };
    onExportUser(apiQuery);
  };

  return (
    <Fragment>
      <ContentHeader
        headTitle={lang.user.list.title}
        total={users?.data?.totalItems}
        right={() => (
          <Fragment>
            <Space>
              <Button ghost color="blue" loading={isLoading} onClick={handleExport}>
                {lang.common.actions.export}
              </Button>
              <Link to={USER}>
                <Button color="green">{lang.common.actions.create}</Button>
              </Link>
            </Space>
          </Fragment>
        )}
      />
      <UsersTable
        users={users}
        isLoading={isFetching}
        isError={isError}
        apiQuery={apiQuery}
        setApiQuery={setApiQuery}
        handleReFetch={handleReFetch}
        handleResetFilter={handleResetFilter}
      />
    </Fragment>
  );
};

export default Users;
