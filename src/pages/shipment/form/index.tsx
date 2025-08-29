import { FC, Fragment, useMemo } from "react";
import { Breadcrumb, Button } from "@/components/UI";
import { useLang, useHasLocationState, usePermission } from "@/hooks";
import { Link } from "react-router-dom";
import type { BreadcrumbItems } from "@/components/UI/Breadcrumb/type";
import type { ContentHeaderProps } from "@/components/Page/ContentHeader";
import type { ShipmentFormData } from "@/services/shipment/type";
import { linkPaths } from "@/common/constant/url";
import FormLayout from "@/components/Page/FormLayout";
import ShipmentForm from "@/features/shipment/components/form/ShipmentForm";
import ShipmentOrder from "@/features/shipment/components/form/ShipmentOrder";
import useGetShipment from "@/features/shipment/hooks/useGetShipment";
import useUpdateShipment from "@/features/shipment/hooks/useUpdateShipment";

const { SHIPMENTS } = linkPaths;

interface ShipmentProps {}

const Shipment: FC<ShipmentProps> = () => {
  const { lang } = useLang();

  const { canUpdate } = usePermission();

  const { state } = useHasLocationState();

  const { data: response, isFetching, refetch } = useGetShipment({ shipmentId: state?.id as string });

  const { mutate: updateShipment, isLoading: updateLoading } = useUpdateShipment();

  const pageTitle = lang.shipment.form.editTitle;

  const items: BreadcrumbItems = [
    { id: "1", label: <Link to={SHIPMENTS}>{lang.shipment.list.title}</Link> },
    { id: "2", label: pageTitle, actived: true },
  ];

  const initialData: ShipmentFormData = useMemo(
    () => ({
      fullName: response ? response.data?.fullName : "",
      phone: response ? response.data?.phone : "",
      email: response ? response.data?.email : "",
      address: response ? response.data?.address : "",
      orderId: response ? response.data?.orderId : "",
    }),
    [response]
  );

  const headerProps: ContentHeaderProps = {
    headTitle: pageTitle,
    right: () =>
      !isFetching &&
      canUpdate && (
        <Button loading={updateLoading} disabled={updateLoading} type="submit">
          {lang.common.actions.update}
        </Button>
      ),
  };

  const handleSubmit = (formData: ShipmentFormData) => {
    const args = { query: { shipmentId: response?.data?.id }, formData };
    updateShipment(args, { onSuccess: () => refetch() });
  };

  const leftItems = <ShipmentForm lang={lang} />;

  const rightItems = <ShipmentOrder lang={lang} shipment={response?.data} />;

  return (
    <Fragment>
      <Breadcrumb items={items} />
      <FormLayout<ShipmentFormData>
        loading={isFetching}
        submitting={!canUpdate || updateLoading}
        headerProps={headerProps}
        initialData={initialData}
        leftItems={leftItems}
        rightItems={rightItems}
        onFinish={handleSubmit}
      />
    </Fragment>
  );
};

export default Shipment;
