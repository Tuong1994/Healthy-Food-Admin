import { FC, useState } from "react";
import { Card, Button, Typography, Divider, Space } from "@/components/UI";
import { Form, FormItem, InputPassword } from "@/components/Control";
import { AuthResetPassword } from "@/services/auth/type";
import { Link, useParams } from "react-router-dom";
import { useLang, useRule } from "@/hooks";
import { linkPaths } from "@/common/constant/url";
import useResetPassword from "../hooks/useResetPassword";

const { AUTH_SIGN_IN } = linkPaths;

const { Title } = Typography;

interface AuthResetPasswordFormProps {}

const AuthResetPasswordForm: FC<AuthResetPasswordFormProps> = () => {
  const { lang } = useLang();

  const { password, match } = useRule();

  const { token } = useParams();

  const { mutate: onResetPassword, isLoading } = useResetPassword();

  const [newPassword, setNewPassword] = useState<string>("");

  const initialData: AuthResetPassword = {
    resetPassword: "",
    confirmPassword: "",
    token: token ?? "",
  };

  const handleChangeInput = (text: string) => setNewPassword(text);

  const handleSubmit = (formData: AuthResetPassword) => {
    const prepareData: AuthResetPassword = {
      resetPassword: formData.resetPassword,
      token: formData.token,
    };
    onResetPassword(prepareData);
  };

  return (
    <Card head={<Title level={3}>{lang.auth.resetPassword.title}</Title>} rootClassName="content-form">
      <Form<AuthResetPassword>
        color="green"
        disabled={isLoading}
        initialData={initialData}
        onFinish={handleSubmit}
      >
        <FormItem name="resetPassword" rules={password()}>
          <InputPassword required label={lang.common.form.label.password} onChangeInput={handleChangeInput} />
        </FormItem>
        <FormItem name="confirmPassword" rules={match(newPassword)}>
          <InputPassword required label={lang.common.form.label.confirmPassword} />
        </FormItem>
        <Divider />
        <Space align="middle">
          <Button type="submit" loading={isLoading}>
            {lang.auth.resetPassword.action}
          </Button>
          <span>|</span>
          <Link to={AUTH_SIGN_IN}>
            <Button text>{lang.auth.signIn.title}</Button>
          </Link>
        </Space>
      </Form>
    </Card>
  );
};

export default AuthResetPasswordForm;
