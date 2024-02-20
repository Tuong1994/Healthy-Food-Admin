import { FC } from "react";
import { Modal } from "@/components/UI";
import { Form, FormItem, Input, InputPhone, TextArea } from "@/components/Control";
import type { Lang } from "@/common/type";
import type { ModalProps } from "@/components/UI/Modal";
import type { Shipment, ShipmentFormData } from "@/services/shipment/type";
import { useRule } from "@/hooks";
import useForm from "@/components/Control/Form/useForm";

interface ShipmentModalProps extends ModalProps {
  lang: Lang;
  isUpdate: boolean;
  orderId: string | undefined;
  shipment: Shipment | undefined;
  onReFetch: () => void;
  onFinish: (data: ShipmentFormData) => void;
}

const ShipmentModal: FC<ShipmentModalProps> = ({
  lang,
  isUpdate,
  orderId,
  shipment,
  onReFetch,
  onFinish,
  onCancel,
  ...restProps
}) => {
  const { common, phone, email } = useRule();

  const form = useForm();

  const modalDefaultProps: ModalProps = {
    color: "green",
    sizes: "sm",
    head: lang.order.form.shipmentInfo,
    cancelButtonProps: { ghost: true, color: "green" },
    onOk: form?.handleSubmit,
    onCancel,
    ...restProps,
  };

  const initialData: ShipmentFormData = {
    fullName: shipment ? shipment.fullName : "",
    phone: shipment ? shipment.phone : "",
    email: shipment ? shipment.email : "",
    address: shipment ? shipment.address : "",
    orderId: shipment ? shipment.orderId : "",
  };

  const handleFinish = (formData: ShipmentFormData) => {
    const prepareData: ShipmentFormData = { ...formData, orderId: orderId ? orderId : "" };
    onFinish(prepareData);
    onCancel?.();
  };

  return (
    <Modal {...modalDefaultProps}>
      <Form<Shipment> color="green" initialData={initialData} onFinish={handleFinish}>
        <FormItem name="fullName" rules={common()}>
          <Input required label={lang.common.form.label.fullName} />
        </FormItem>
        <FormItem name="phone" rules={phone()}>
          <InputPhone required label={lang.common.form.label.phone} />
        </FormItem>
        <FormItem name="email" rules={email()}>
          <Input required label={lang.common.form.label.email} />
        </FormItem>
        <FormItem name="address" rules={common()}>
          <TextArea rows={3} required label={lang.common.form.label.fullAddress} />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default ShipmentModal;
