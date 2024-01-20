import { FC } from "react";
import { Modal } from "@/components/UI";
import { Form, FormItem, Input, Select } from "@/components/Control";
import type { Lang } from "@/common/type";
import type { ModalProps } from "@/components/UI/Modal";
import type { CustomerAddress } from "@/services/customer/type";
import useForm from "@/components/Control/Form/useForm";

interface AddressModalProps extends ModalProps {
  lang: Lang;
}

const AddressModal: FC<AddressModalProps> = ({ lang, ...restProps }) => {
  const form = useForm();

  const modalDefaultProps: ModalProps = {
    color: "green",
    sizes: "sm",
    cancelButtonProps: { ghost: true },
    head: lang.customer.form.address.modalTitle,
    ...restProps,
  };

  const initialData: CustomerAddress = {
    addressEn: "",
    addressVn: "",
    cityCode: 0,
    districtCode: 0,
    wardCode: 0,
  };

  const handleSubmit = (data: CustomerAddress) => {
    console.log(data);
  };

  return (
    <Modal {...modalDefaultProps} onOk={form?.handleSubmit}>
      <Form<CustomerAddress> color="green" initialData={initialData} onFinish={handleSubmit}>
        <FormItem name="addressEn">
          <Input label={lang.common.form.label.addressEn} />
        </FormItem>
        <FormItem name="addressVn">
          <Input label={lang.common.form.label.addressVn} />
        </FormItem>
        <FormItem name="cityCode">
          <Select label={lang.common.form.label.city} />
        </FormItem>
        <FormItem name="districtCode">
          <Select label={lang.common.form.label.district} />
        </FormItem>
        <FormItem name="wardCode">
          <Select label={lang.common.form.label.ward} />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default AddressModal;
