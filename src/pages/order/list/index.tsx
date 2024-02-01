import { FC, Fragment, useState } from "react";
import { Space, Button } from "@/components/UI";
import { Link } from "react-router-dom";
import { ESort } from "@/common/enum";
import { linkPaths } from "@/common/constant/url";
import { useLang } from "@/hooks";
import type { ApiQuery } from "@/services/type";
import ContentHeader from "@/components/Page/ContentHeader";
import OrdersTable from "@/features/order/components/list/OrdersTable";
import useDebounce from "@/hooks/features/useDebounce";
import useGetOrdersPaging from "@/features/order/hooks/useGetOrdersPaging";

const { ORDER } = linkPaths;

interface OrdersProps {}

const Orders: FC<OrdersProps> = () => {
  const { lang } = useLang();

  const initialApiQuery: ApiQuery = {
    page: 1,
    limit: 10,
    keywords: "",
    sortBy: ESort.NEWEST,
    orderStatus: undefined,
    paymentMethod: undefined,
    paymentStatus: undefined,
  };

  const [apiQuery, setApiQuery] = useState<ApiQuery>(initialApiQuery);

  const debounce = useDebounce(apiQuery.keywords as string);

  const { data: orders, isFetching, isError } = useGetOrdersPaging({ ...apiQuery, keywords: debounce });

  const handleResetFilter = () => setApiQuery(initialApiQuery);

  return (
    <Fragment>
      <ContentHeader
        headTitle={lang.order.list.title}
        total={orders?.data?.totalItems}
        right={() => (
          <Fragment>
            <Space>
              <Button color="blue" ghost>
                {lang.common.actions.export}
              </Button>
              <Link to={ORDER}>
                <Button color="green">{lang.common.actions.create}</Button>
              </Link>
            </Space>
          </Fragment>
        )}
      />
      <OrdersTable
        orders={orders}
        isLoading={isFetching}
        isError={isError}
        apiQuery={apiQuery}
        setApiQuery={setApiQuery}
        handleResetFilter={handleResetFilter}
      />
    </Fragment>
  );
};

export default Orders;
