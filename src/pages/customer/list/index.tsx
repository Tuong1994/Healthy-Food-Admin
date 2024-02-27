import { FC, Fragment, useState } from "react";
import { Space, Button } from "@/components/UI";
import { useLang } from "@/hooks";
import { Link } from "react-router-dom";
import { linkPaths } from "@/common/constant/url";
import { ESort } from "@/common/enum";
import type { ApiQuery } from "@/services/type";
import ContentHeader from "@/components/Page/ContentHeader";
import CustomersTable from "@/features/customer/components/list/CustomersTable";
import useGetCustomersPaging from "@/features/customer/hooks/useGetCustomersPaging";
import useDebounce from "@/hooks/features/useDebounce";
import useExportCustomer from "@/features/customer/hooks/useExportCustomer";

const { CUSTOMER } = linkPaths;

interface CustomersProps {}

const Customers: FC<CustomersProps> = () => {
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
    data: customers,
    isFetching,
    isError,
    refetch,
  } = useGetCustomersPaging({ ...apiQuery, keywords: debounce });

  const { mutate: onExportCustomer, isLoading } = useExportCustomer();

  const handleResetFilter = () => setApiQuery(initialApiQuery);

  const handleReFetch = () => refetch();

  const handleExport = () => {
    const apiQuery: ApiQuery = { langCode: locale };
    onExportCustomer(apiQuery);
  };

  return (
    <Fragment>
      <ContentHeader
        headTitle={lang.customer.list.title}
        total={customers?.data?.totalItems}
        right={() => (
          <Fragment>
            <Space>
              <Button ghost color="blue" loading={isLoading} onClick={handleExport}>
                {lang.common.actions.export}
              </Button>
              <Link to={CUSTOMER}>
                <Button color="green">{lang.common.actions.create}</Button>
              </Link>
            </Space>
          </Fragment>
        )}
      />
      <CustomersTable
        customers={customers}
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

export default Customers;
