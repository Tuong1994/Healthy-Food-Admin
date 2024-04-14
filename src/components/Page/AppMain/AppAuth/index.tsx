import { FC, ReactNode, Fragment, useCallback } from "react";
import { logout } from "@/services/auth/api";
import { useNavigate } from "react-router";
import { linkPaths } from "@/common/constant/url";
import RedirectModal from "./RedirectModal";
import useAuthStore from "@/store/AuthStore";
import useRefreshToken from "./hooks/useRefreshToken";
import useAuthenticate from "./hooks/useAuthenticate";

const { AUTH_SIGN_IN } = linkPaths;

interface AppAuthProps {
  children?: ReactNode;
}

const AppAuth: FC<AppAuthProps> = ({ children }) => {
  const [auth, resetAuth] = useAuthStore((state) => [state.auth, state.resetAuth]);

  const navigate = useNavigate();

  const { open, setOpen, setReLogin } = useRefreshToken();

  useAuthenticate();

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

  return (
    <Fragment>
      {children}
      <RedirectModal open={open} onOk={handleReLogin} />
    </Fragment>
  );
};

export default AppAuth;
