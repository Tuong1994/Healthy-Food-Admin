import { useLang } from "@/hooks";
import { logout } from "@/services/auth/api";
import { ApiQuery } from "@/services/type";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { linkPaths } from "@/common/constant/url";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import useAuthStore from "@/store/AuthStore";

const { AUTH } = linkPaths;

const useLogout = () => {
  const messageApi = useMessage();

  const navigate = useNavigate();

  const { lang } = useLang();

  const [auth, resetAuth] = useAuthStore((state) => [state.auth, state.resetAuth]);

  const onLogout = async () => {
    const { info } = auth;
    const apiQuery: ApiQuery = { customerId: info.id };
    const response = await logout(apiQuery);
    return response;
  };

  const mutation = useMutation(onLogout, {
    onSuccess: () => {
      messageApi.success(lang.common.message.success.logout);
      resetAuth();
      navigate(AUTH);
    },
    onError: () => messageApi.error(lang.common.message.error.logout),
  });

  return mutation
};

export default useLogout;
