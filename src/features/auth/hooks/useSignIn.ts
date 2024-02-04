import useMessage from "@/components/UI/ToastMessage/useMessage";
import { useLang } from "@/hooks";
import { signIn } from "@/services/auth/api";
import { AuthSignIn } from "@/services/auth/type";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { HttpStatus } from "@/services/axios";
import { linkPaths } from "@/common/constant/url";
import useAuthStore from "@/store/AuthStore";

const { DASHBOARD } = linkPaths;

const useSignIn = () => {
  const messageApi = useMessage();

  const { lang } = useLang();

  const setAuth = useAuthStore((state) => state.setAuth);

  const navigate = useNavigate();

  const onSignIn = async (formData: AuthSignIn) => {
    const response = await signIn(formData);
    return response;
  };

  const mutation = useMutation(onSignIn, {
    onSuccess: (response) => {
      if (!response.success) {
        const status = response.error?.status;
        let message = "";
        if (status === HttpStatus.NOT_FOUND) message = lang.common.message.error.authEmail;
        if (status === HttpStatus.FORBIDDEN) message = lang.common.message.error.authPassword;
        return messageApi.error(message);
      }
      messageApi.success(lang.common.message.success.signIn);
      setAuth(response.data);
      navigate(DASHBOARD);
    },
    onError: () => messageApi.error(lang.common.message.error.signIn),
  });

  return mutation;
};

export default useSignIn;
