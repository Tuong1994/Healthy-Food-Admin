import { FC } from "react";
import { Modal } from "@/components/UI";
import { Form, FormItem, InputPassword } from "@/components/Control";
import type { Lang } from "@/common/type";
import type { ModalProps } from "@/components/UI/Modal";
import type { AuthPassword } from "@/services/auth/type";
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
    head: lang.customer.form.changePass,
    ...restProps,
  };

  const initialData: AuthPassword = {
    newPassword: "",
    oldPassword: "",
  };

  const handleSubmit = (data: AuthPassword) => {
    console.log(data);
  };

  return (
    <Modal {...modalDefaultProps} onOk={form?.handleSubmit}>
      <Form<AuthPassword> color="green" initialData={initialData} onFinish={handleSubmit}>
        <FormItem name="oldPassword">
          <InputPassword required label={lang.common.form.label.oldPassword} />
        </FormItem>
        <FormItem name="newPassword">
          <InputPassword required label={lang.common.form.label.newPassword} />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default AddressModal;
