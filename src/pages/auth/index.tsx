import { FC } from "react";
import { Grid } from "@/components/UI";
import AuthTranslate from "@/features/auth/components/AuthTranslate";
import AuthSignInForm from "@/features/auth/components/AuthSignInForm";
import AuthLogo from "@/features/auth/components/AuthLogo";
import AuthForgotPasswordForm from "@/features/auth/components/AuthForgotPasswordForm";
import AuthResetPasswordForm from "@/features/auth/components/AuthResetPasswordForm";
import utils from "@/utils";

const { Row, Col } = Grid;

const Auth: FC<{}> = () => {
  const renderContent = () => {
    const name = utils.getNameCurrentUrl(2);
    if (name === "forgotPassword") return <AuthForgotPasswordForm />;
    if (name === "resetPassword") return <AuthResetPasswordForm />;
    return <AuthSignInForm />;
  };

  return (
    <div className="auth">
      <AuthTranslate />
      <Row rootClassName="auth-content">
        <Col xs={0} md={0} lg={10} span={12}>
          <AuthLogo />
        </Col>
        <Col xs={24} md={24} lg={14} span={12}>
          {renderContent()}
        </Col>
      </Row>
    </div>
  );
};

export default Auth;
