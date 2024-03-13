import { FC, ReactNode, Fragment, useCallback, useEffect } from "react";
import { authenticate, logout } from "@/services/auth/api";
import { useNavigate } from "react-router";
import { linkPaths } from "@/common/constant/url";
import RedirectModal from "./RedirectModal";
import useAuthStore from "@/store/AuthStore";
import useRedirect from "./hooks/useRedirect";
import useRefreshToken from "./hooks/useRefreshToken";

const { AUTH_SIGN_IN } = linkPaths;

interface AppAuthProps {
  children?: ReactNode;
}

const AppAuth: FC<AppAuthProps> = ({ children }) => {
  const [auth, resetAuth] = useAuthStore((state) => [state.auth, state.resetAuth]);

  const navigate = useNavigate();

  const { open, setOpen, setReLogin } = useRefreshToken();

  useRedirect();

  const { isAuth, info } = auth;

  const onLogout = useCallback(async () => {
    if (!isAuth) return;
    await logout({ userId: info.id });
    resetAuth();
  }, [isAuth]);

  const handleReLogin = async () => {
    setOpen(false);
    setReLogin(true);
    await onLogout();
    navigate(AUTH_SIGN_IN);
  };

  const onAuthenticate = async () => await authenticate();

  useEffect(() => {
    onAuthenticate();
  }, []);

  return (
    <Fragment>
      {children}
      <RedirectModal open={open} onOk={handleReLogin} />
    </Fragment>
  );
};

export default AppAuth;
