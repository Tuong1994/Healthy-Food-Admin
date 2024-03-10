import { FC, Fragment, ReactNode, useEffect } from "react";
import { useLang } from "@/hooks";
import { useNavigate } from "react-router";
import { linkPaths } from "@/common/constant/url";
import { ERole } from "@/services/user/enum";
import useAuthStore from "@/store/AuthStore";
import useMessage from "@/components/UI/ToastMessage/useMessage";

const { MAIN_SETTING } = linkPaths;

interface ProtectedRouteProps {
  children?: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const messageApi = useMessage();

  const navigate = useNavigate();

  const { lang } = useLang();

  const auth = useAuthStore((state) => state.auth);

  const { info } = auth;

  const validatePermission = () => {
    const { role } = info;
    if (!role) return navigate(MAIN_SETTING);
    if (role !== ERole.MANAGER) {
      messageApi.warning(lang.common.message.warning.permission);
      return navigate(MAIN_SETTING);
    }
  };

  useEffect(() => {
    validatePermission();
  }, []);

  return <Fragment>{children}</Fragment>;
};

export default ProtectedRoute;
