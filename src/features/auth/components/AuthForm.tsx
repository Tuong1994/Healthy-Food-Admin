import { FC } from "react";
import { Card, Button, Space, Divider, Typography } from "@/components/UI";
import { Form, FormItem, Input, InputPassword } from "@/components/Control";
import { AuthSignIn } from "@/services/auth/type";
import { useLang, useRule } from "@/hooks";
import useSignIn from "../hooks/useSignIn";

const { Title } = Typography;

interface AuthFormProps {}

const AuthForm: FC<AuthFormProps> = () => {
  const { lang } = useLang();

  const { email, password } = useRule();

  const { mutate: onLogin, isLoading } = useSignIn();

  const initialData: AuthSignIn = {
    email: "",
    password: "",
  };

  const handleSubmit = (formData: AuthSignIn) => onLogin(formData);

  return (
    <Card head={<Title level={3}>{lang.auth.title}</Title>} rootClassName="content-form">
      <Form<AuthSignIn> color="green" disabled={isLoading} initialData={initialData} onFinish={handleSubmit}>
        <FormItem name="email" rules={email()}>
          <Input required label={lang.common.form.label.email} />
        </FormItem>
        <FormItem name="password" rules={password()}>
          <InputPassword required label={lang.common.form.label.password} />
        </FormItem>
        <Space justify="end">
          <Button text>{lang.auth.forgot}</Button>
        </Space>
        <Divider />
        <Space>
          <Button loading={isLoading} type="submit" rootClassName="form-btn">
            {lang.auth.title}
          </Button>
        </Space>
      </Form>
    </Card>
  );
};

export default AuthForm;
