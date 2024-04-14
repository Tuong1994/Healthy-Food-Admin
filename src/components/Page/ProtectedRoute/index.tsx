import { FC, Fragment, ReactNode } from "react";
import { Navigate } from "react-router";
import { linkPaths } from "@/common/constant/url";
import useAuthStore from "@/store/AuthStore";

const { AUTH_SIGN_IN } = linkPaths;

interface ProtectedRouteProps {
  children?: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const auth = useAuthStore((state) => state.auth);

  const { isAuth } = auth;

  if (!isAuth) return <Navigate to={AUTH_SIGN_IN} replace />;

  return <Fragment>{children}</Fragment>;
};

export default ProtectedRoute;
