import { FC } from "react";
import { Card, Button, Space, Divider, Typography } from "@/components/UI";
import { Form, FormItem, Input, InputPassword } from "@/components/Control";
import { AuthSignIn } from "@/services/auth/type";
import { useLang, useRule } from "@/hooks";
import { linkPaths } from "@/common/constant/url";
import { Link } from "react-router-dom";
import useSignIn from "../hooks/useSignIn";

const { AUTH_FORGOT_PASSWORD } = linkPaths;

const { Title } = Typography;

interface AuthSignInFormProps {}

const AuthSignInForm: FC<AuthSignInFormProps> = () => {
  const { lang } = useLang();

  const { email, password } = useRule();

  const { mutate: onLogin, isLoading } = useSignIn();

  const initialData: AuthSignIn = {
    email: "",
    password: "",
  };

  const handleSubmit = (formData: AuthSignIn) => onLogin(formData);

  return (
    <Card head={<Title level={3}>{lang.auth.signIn.title}</Title>} rootClassName="content-form">
      <Form<AuthSignIn> color="green" disabled={isLoading} initialData={initialData} onFinish={handleSubmit}>
        <FormItem name="email" rules={email()}>
          <Input required label={lang.common.form.label.email} />
        </FormItem>
        <FormItem name="password" rules={password()}>
          <InputPassword required label={lang.common.form.label.password} />
        </FormItem>
        <Space justify="end">
          <Link to={AUTH_FORGOT_PASSWORD}>
            <Button text>{lang.auth.forgot}</Button>
          </Link>
        </Space>
        <Divider />
        <Space>
          <Button loading={isLoading} type="submit" rootClassName="form-btn">
            {lang.auth.signIn.title}
          </Button>
        </Space>
      </Form>
    </Card>
  );
};

export default AuthSignInForm;
