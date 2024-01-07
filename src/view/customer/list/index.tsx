import React from "react";
import { UI } from "@/components";
import { useLang } from "@/hooks";
import { Link } from "react-router-dom";
import ContentHeader from "@/components/Page/ContentHeader";
import url from "@/common/constant/url";
import CustomersTable from "./CustomersTable";

const { CUSTOMER_FORM } = url;

const { Space, Button } = UI;

interface CustomersProps {}

const Customers: React.FC<CustomersProps> = () => {
  const { lang } = useLang();
  return (
    <React.Fragment>
      <ContentHeader
        headTitle={lang.customer.list.title}
        right={() => (
          <React.Fragment>
            <Space>
              <Button color="blue" ghost>
                {lang.common.actions.export}
              </Button>
              <Link to={CUSTOMER_FORM}>
                <Button color="green">{lang.common.actions.create}</Button>
              </Link>
            </Space>
          </React.Fragment>
        )}
      />
      <CustomersTable lang={lang} />
    </React.Fragment>
  );
};

export default Customers;
