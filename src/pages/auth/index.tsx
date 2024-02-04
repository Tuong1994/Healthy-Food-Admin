import { FC } from "react";
import { Grid } from "@/components/UI";
import AuthTranslate from "@/features/auth/components/AuthTranslate";
import AuthForm from "@/features/auth/components/AuthForm";
import AuthLogo from "@/features/auth/components/AuthLogo";

const { Row, Col } = Grid;

const Auth: FC<{}> = () => {
  return (
    <div className="auth">
      <AuthTranslate />
      <Row rootClassName="auth-content">
        <Col span={12}>
          <AuthLogo />
        </Col>
        <Col span={12}>
          <AuthForm />
        </Col>
      </Row>
    </div>
  );
};

export default Auth;
