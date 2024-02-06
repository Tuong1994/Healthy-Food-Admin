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
        <Col xs={0} md={0} lg={10} span={12}>
          <AuthLogo />
        </Col>
        <Col xs={24} md={24} lg={14} span={12}>
          <AuthForm />
        </Col>
      </Row>
    </div>
  );
};

export default Auth;
