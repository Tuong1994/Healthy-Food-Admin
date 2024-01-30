import { FC, Fragment } from "react";
import { Breadcrumb, Button } from "@/components/UI";
import { useLang, useHasLocationState } from "@/hooks";
import { EGender, ERole } from "@/services/customer/enum";
import type { Customer } from "@/services/customer/type";
import type { ContentHeaderProps } from "@/components/Page/ContentHeader";
import type { BreadcrumbItems } from "@/components/UI/Breadcrumb/type";
import { Link } from "react-router-dom";
import { linkPaths } from "@/common/constant/url";
import FormLayout from "@/components/Page/FormLayout";
import CustomerAuth from "@/features/customer/components/form/CustomerAuth";
import CustomerInfo from "@/features/customer/components/form/CustomerInfo";
import CustomerPermission from "@/features/customer/components/form/CustomerPermission";
import CustomerAddress from "@/features/customer/components/form/CustomerAddress";

const { CUSTOMERS } = linkPaths;

interface CustomerProps {}

const Customer: FC<CustomerProps> = () => {
  const { lang } = useLang();

  const { isUpdate, state } = useHasLocationState();

  const isUserUpdate = state && state.isUser;

  const pageTitle = () => {
    if (isUserUpdate) return lang.pageComponent.header.profile.user;
    return isUpdate ? lang.customer.form.editTitle : lang.customer.form.addTitle;
  };

  const items: BreadcrumbItems = [
    { id: "1", label: <Link to={CUSTOMERS}>{lang.customer.list.title}</Link> },
    { id: "2", label: pageTitle(), actived: true },
  ];

  const initialData: Customer = {
    email: "",
    password: "",
    phone: "",
    lastName: "",
    firstName: "",
    birthday: new Date(),
    gender: EGender.MALE,
    role: ERole.CUSTOMER,
  };

  const headerProps: ContentHeaderProps = {
    headTitle: pageTitle(),
    right: () => <Button>{lang.common.actions.save}</Button>,
  };

  const leftItems = (
    <Fragment>
      <CustomerAuth lang={lang} isUpdate={isUpdate} />
      <CustomerInfo lang={lang} />
    </Fragment>
  );

  const rightItems = (
    <Fragment>
      <CustomerPermission lang={lang} />
      <CustomerAddress lang={lang} />
    </Fragment>
  );

  return (
    <Fragment>
      {!isUserUpdate && <Breadcrumb items={items} />}
      <FormLayout<Customer>
        initialData={initialData}
        headerProps={headerProps}
        leftItems={leftItems}
        rightItems={rightItems}
      />
    </Fragment>
  );
};

export default Customer;
