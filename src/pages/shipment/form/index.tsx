import { FC, Fragment } from "react";
import { Breadcrumb, Card, Button } from "@/components/UI";
import { FormItem, Input, Select } from "@/components/Control";
import { useLang, useHasLocationState } from "@/hooks";
import { Link } from "react-router-dom";
import type { BreadcrumbItems } from "@/components/UI/Breadcrumb/type";
import type { ContentHeaderProps } from "@/components/Page/ContentHeader";
import type { Shipment } from "@/services/shipment/type";
import { linkPaths } from "@/common/constant/url";
import FormLayout from "@/components/Page/FormLayout";

const { SHIPMENTS } = linkPaths;

interface ShipmentProps {}

const Shipment: FC<ShipmentProps> = () => {
  const { lang } = useLang();

  const { isUpdate } = useHasLocationState();

  const pageTitle = isUpdate ? lang.shipment.form.editTitle : lang.shipment.form.addTitle;

  const items: BreadcrumbItems = [
    { id: "1", label: <Link to={SHIPMENTS}>{lang.shipment.list.title}</Link> },
    { id: "2", label: pageTitle, actived: true },
  ];

  const initialData: Shipment = {
    fullName: "",
    phone: "",
    email: "",
    address: "",
    orderId: "",
  };

  const headerProps: ContentHeaderProps = {
    headTitle: pageTitle,
    right: () => <Button>{lang.common.actions.save}</Button>,
  };

  const leftItems = (
    <Card>
      <FormItem name="fullName">
        <Input label={lang.common.form.label.fullName} />
      </FormItem>
      <FormItem name="phone">
        <Input label={lang.common.form.label.phone} />
      </FormItem>
      <FormItem name="email">
        <Input label={lang.common.form.label.email} />
      </FormItem>
      <FormItem name="address">
        <Input label={lang.common.form.label.fullAddress} />
      </FormItem>
      <FormItem name="orderId">
        <Select async label={lang.common.form.label.orderNumber} />
      </FormItem>
    </Card>
  );

  return (
    <Fragment>
      <Breadcrumb items={items} />
      <FormLayout<Shipment> headerProps={headerProps} initialData={initialData} leftItems={leftItems} />
    </Fragment>
  );
};

export default Shipment;
