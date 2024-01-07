import React from "react";
import { UI } from "@/components";
import { useLang, useHasLocationState } from "@/hooks";
import { EGender, ERole } from "@/services/customer/enum";
import type { Customer } from "@/services/customer/type";
import type { ContentHeaderProps } from "@/components/Page/ContentHeader";
import type { BreadcrumbItems } from "@/components/UI/Breadcrumb/type";
import { Link } from "react-router-dom";
import FormLayout from "@/components/Page/FormLayout";
import CustomerAuth from "./CustomerAuth";
import CustomerInfo from "./CustomerInfo";
import CustomerPermission from "./CustomerPermission";
import CustomerAddress from "./CustomerAddress";
import url from "@/common/constant/url";

const { CUSTOMER_LIST } = url;

const { Breadcrumb, Button } = UI;

interface CustomerProps {}

const Customer: React.FC<CustomerProps> = () => {
  const { lang } = useLang();

  const isUpdate = useHasLocationState();

  const pageTitle = isUpdate ? lang.customer.form.editTitle : lang.customer.form.addTitle;

  const items: BreadcrumbItems = [
    { id: "1", label: <Link to={CUSTOMER_LIST}>{lang.customer.list.title}</Link> },
    { id: "2", label: pageTitle, actived: true },
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
    headTitle: pageTitle,
    right: () => <Button>{lang.common.actions.save}</Button>,
  };

  const leftItems = (
    <React.Fragment>
      <CustomerAuth lang={lang} isUpdate={isUpdate} />
      <CustomerInfo lang={lang} />
    </React.Fragment>
  );

  const rightItems = (
    <React.Fragment>
      <CustomerPermission lang={lang} />
      <CustomerAddress lang={lang} />
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Breadcrumb items={items} />
      <FormLayout<Customer>
        initialData={initialData}
        headerProps={headerProps}
        leftItems={leftItems}
        rightItems={rightItems}
      />
    </React.Fragment>
  );
};

export default Customer;
