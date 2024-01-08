import React from "react";
import { UI } from "@/components";
import { useLang } from "@/hooks";
import { Link } from "react-router-dom";
import ContentHeader from "@/components/Page/ContentHeader";
import url from "@/common/constant/url";
import OrdersTable from "./OrdersTable";

const { ORDER_FORM } = url;

const { Space, Button } = UI;

interface OrdersProps {}

const Orders: React.FC<OrdersProps> = () => {
  const { lang } = useLang();

  return (
    <React.Fragment>
      <ContentHeader
        headTitle={lang.order.list.title}
        right={() => (
          <React.Fragment>
            <Space>
              <Button color="blue" ghost>
                {lang.common.actions.export}
              </Button>
              <Link to={ORDER_FORM}>
                <Button color="green">{lang.common.actions.create}</Button>
              </Link>
            </Space>
          </React.Fragment>
        )}
      />
      <OrdersTable lang={lang} />
    </React.Fragment>
  );
};

export default Orders;
