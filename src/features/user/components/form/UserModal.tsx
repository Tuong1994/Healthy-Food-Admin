import { FC } from "react";
import { Modal } from "@/components/UI";
import { Form, FormItem, InputPassword } from "@/components/Control";
import type { Lang } from "@/common/type";
import type { ModalProps } from "@/components/UI/Modal";
import type { AuthChangePassword } from "@/services/auth/type";
import type { User } from "@/services/user/type";
import type { ApiQuery } from "@/services/type";
import { useRule } from "@/hooks";
import { HttpStatus } from "@/services/axios";
import useForm from "@/components/Control/Form/useForm";
import useChangePassword from "@/features/auth/hooks/useChangePassword";
import useMessage from "@/components/UI/ToastMessage/useMessage";

interface PasswordModalProps extends ModalProps {
  lang: Lang;
  user: User | undefined;
  onReFetch: () => void;
}

const PasswordModal: FC<PasswordModalProps> = ({ lang, user, onReFetch, onCancel, ...restProps }) => {
  const form = useForm();

  const messageApi = useMessage();

  const { password } = useRule();

  const { mutate: onChangePassword, isLoading } = useChangePassword();

  const modalDefaultProps: ModalProps = {
    sizes: "sm",
    color: "green",
    okButtonProps: { loading: isLoading },
    cancelButtonProps: { ghost: true },
    head: lang.user.form.changePass,
    ...restProps,
  };

  const initialData: AuthChangePassword = {
    newPassword: "",
    oldPassword: "",
  };

  const handleSubmit = (formData: AuthChangePassword) => {
    const query: ApiQuery = { userId: user?.id };
    onChangePassword(
      { query, formData },
      {
        onSuccess: (response) => {
          if (!response.success) {
            let message = "";
            if (response.error?.status === HttpStatus.FORBIDDEN)
              message = lang.common.message.error.authPassword;
            return messageApi.error(message);
          }
          messageApi.success(lang.common.message.success.update);
          onReFetch();
          onCancel?.();
        },
      }
    );
  };

  return (
    <Modal {...modalDefaultProps} onOk={form?.handleSubmit} onCancel={onCancel}>
      <Form<AuthChangePassword>
        color="green"
        disabled={isLoading}
        initialData={initialData}
        onFinish={handleSubmit}
      >
        <FormItem name="oldPassword" rules={password()}>
          <InputPassword required label={lang.common.form.label.oldPassword} />
        </FormItem>
        <FormItem name="newPassword" rules={password()}>
          <InputPassword required label={lang.common.form.label.newPassword} />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default PasswordModal;
