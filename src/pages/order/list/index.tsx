import { FC, Fragment } from "react";
import { Space, Button } from "@/components/UI";
import { Link } from "react-router-dom";
import { useLang } from "@/hooks";
import { linkPaths } from "@/common/constant/url";
import ContentHeader from "@/components/Page/ContentHeader";
import OrdersTable from "@/features/order/components/list/OrdersTable";

const { ORDER } = linkPaths;

interface OrdersProps {}

const Orders: FC<OrdersProps> = () => {
  const { lang } = useLang();

  return (
    <Fragment>
      <ContentHeader
        headTitle={lang.order.list.title}
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
      <OrdersTable lang={lang} />
    </Fragment>
  );
};

export default Orders;
