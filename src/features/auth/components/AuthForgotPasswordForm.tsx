import { FC, useState } from "react";
import { Card, Button, Space, Divider, Typography } from "@/components/UI";
import { Form, FormItem, Input } from "@/components/Control";
import { AuthForgotPassword } from "@/services/auth/type";
import { useLang, useRule } from "@/hooks";
import { Paragraph } from "@/components/UI/Typography";
import { Link } from "react-router-dom";
import { linkPaths } from "@/common/constant/url";
import useForgotPassword from "../hooks/useFogotPassword";

const { AUTH_SIGN_IN } = linkPaths;

const { Title } = Typography;

interface AuthForgotPasswordFormProps {}

const AuthForgotPasswordForm: FC<AuthForgotPasswordFormProps> = () => {
  const { locale, lang } = useLang();

  const { email } = useRule();

  const [isSent, setIsSent] = useState<boolean>(false);

  const { mutate: onForgotPassword, isLoading } = useForgotPassword();

  const initialData: AuthForgotPassword = {
    email: "",
  };

  const handleSubmit = (formData: AuthForgotPassword) => {
    const args = { query: { admin: true, langCode: locale }, formData };
    onForgotPassword(args, { onSuccess: () => setIsSent(true) });
  };

  const renderContent = () => {
    if (!isSent) {
      return (
        <Form<AuthForgotPassword>
          color="green"
          disabled={isLoading}
          initialData={initialData}
          onFinish={handleSubmit}
        >
          <FormItem name="email" rules={email()}>
            <Input required label={lang.common.form.label.email} />
          </FormItem>
          <Divider />
          <Space align="middle">
            <Button loading={isLoading} type="submit">
              {lang.auth.forgotPassword.action}
            </Button>
            <span>|</span>
            <Link to={AUTH_SIGN_IN}>
              <Button text>{lang.auth.signIn.title}</Button>
            </Link>
          </Space>
        </Form>
      );
    }
    return (
      <Paragraph align="center" size={16} variant="success">
        {lang.auth.forgotPassword.message}
      </Paragraph>
    );
  };

  return (
    <Card head={<Title level={3}>{lang.auth.forgotPassword.title}</Title>} rootClassName="content-form">
      {renderContent()}
    </Card>
  );
};

export default AuthForgotPasswordForm;
