import { FC } from "react";
import { Modal } from "@/components/UI";
import { Form, FormItem, Input } from "@/components/Control";
import type { Lang } from "@/common/type";
import type { ModalProps } from "@/components/UI/Modal";
import type { Shipment } from "@/services/shipment/type";

interface ShipmentModalProps extends ModalProps {
  lang: Lang;
}

const ShipmentModal: FC<ShipmentModalProps> = ({ lang, ...restProps }) => {
  const modalDefaultProps: ModalProps = {
    color: "green",
    sizes: "sm",
    head: lang.order.form.shipmentInfo,
    cancelButtonProps: { ghost: true, color: "green" },
    ...restProps,
  };

  const initialData: Shipment = {
    fullName: "",
    phone: "",
    email: "",
    address: "",
    orderId: "",
  };

  return (
    <Modal {...modalDefaultProps}>
      <Form<Shipment> color="green" initialData={initialData}>
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
      </Form>
    </Modal>
  );
};

export default ShipmentModal;
