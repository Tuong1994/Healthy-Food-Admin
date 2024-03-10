import { FC, Fragment, useState } from "react";
import { Space, Button } from "@/components/UI";
import { Link } from "react-router-dom";
import { ESort } from "@/common/enum";
import { linkPaths } from "@/common/constant/url";
import { useLang, usePermission } from "@/hooks";
import type { ApiQuery } from "@/services/type";
import ContentHeader from "@/components/Page/ContentHeader";
import OrdersTable from "@/features/order/components/list/OrdersTable";
import useDebounce from "@/hooks/features/useDebounce";
import useGetOrdersPaging from "@/features/order/hooks/useGetOrdersPaging";
import useExportOrder from "@/features/order/hooks/useExportOrder";

const { ORDER } = linkPaths;

interface OrdersProps {}

const Orders: FC<OrdersProps> = () => {
  const initialApiQuery: ApiQuery = {
    page: 1,
    limit: 10,
    keywords: "",
    sortBy: ESort.NEWEST,
    orderStatus: undefined,
    paymentMethod: undefined,
    paymentStatus: undefined,
  };

  const { locale, lang } = useLang();

  const { canCreate, canRemove } = usePermission();

  const [apiQuery, setApiQuery] = useState<ApiQuery>(initialApiQuery);

  const debounce = useDebounce(apiQuery.keywords as string);

  const {
    data: orders,
    isFetching,
    isError,
    refetch,
  } = useGetOrdersPaging({ ...apiQuery, keywords: debounce });

  const { mutate: onExportOrder, isLoading } = useExportOrder();

  const handleResetFilter = () => setApiQuery(initialApiQuery);

  const handleReFetch = () => refetch();

  const handleExport = () => {
    const apiQuery: ApiQuery = { langCode: locale };
    onExportOrder(apiQuery);
  };

  return (
    <Fragment>
      <ContentHeader
        headTitle={lang.order.list.title}
        total={orders?.data?.totalItems}
        right={() => (
          <Fragment>
            <Space>
              <Button ghost color="blue" loading={isLoading} onClick={handleExport}>
                {lang.common.actions.export}
              </Button>
              {canCreate && (
                <Link to={ORDER}>
                  <Button color="green">{lang.common.actions.create}</Button>
                </Link>
              )}
            </Space>
          </Fragment>
        )}
      />
      <OrdersTable
        orders={orders}
        isLoading={isFetching}
        canRemove={canRemove}
        isError={isError}
        apiQuery={apiQuery}
        setApiQuery={setApiQuery}
        handleReFetch={handleReFetch}
        handleResetFilter={handleResetFilter}
      />
    </Fragment>
  );
};

export default Orders;
