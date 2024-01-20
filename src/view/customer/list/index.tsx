import { FC, Fragment } from "react";
import { Space, Button } from "@/components/UI";
import { useLang } from "@/hooks";
import { Link } from "react-router-dom";
import ContentHeader from "@/components/Page/ContentHeader";
import CustomersTable from "./CustomersTable";
import url from "@/common/constant/url";

const { CUSTOMER_FORM } = url;

interface CustomersProps {}

const Customers: FC<CustomersProps> = () => {
  const { lang } = useLang();

  return (
    <Fragment>
      <ContentHeader
        headTitle={lang.customer.list.title}
        right={() => (
          <Fragment>
            <Space>
              <Button color="blue" ghost>
                {lang.common.actions.export}
              </Button>
              <Link to={CUSTOMER_FORM}>
                <Button color="green">{lang.common.actions.create}</Button>
              </Link>
            </Space>
          </Fragment>
        )}
      />
      <CustomersTable lang={lang} />
    </Fragment>
  );
};

export default Customers;
