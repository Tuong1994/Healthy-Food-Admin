import { FC, Fragment } from "react";
import { Space, Button } from "@/components/UI";
import { useLang } from "@/hooks";
import { Link } from "react-router-dom";
import { linkPaths } from "@/common/constant/url";
import ContentHeader from "@/components/Page/ContentHeader";
import CustomersTable from "@/features/customer/components/list/CustomersTable";

const { CUSTOMER } = linkPaths;

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
              <Link to={CUSTOMER}>
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
