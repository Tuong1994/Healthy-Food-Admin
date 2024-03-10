import useMessage from "@/components/UI/ToastMessage/useMessage";
import { useLang } from "@/hooks";
import { signIn } from "@/services/auth/api";
import { AuthSignIn } from "@/services/auth/type";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { HttpStatus } from "@/services/axios";
import type { ApiQuery } from "@/services/type";
import useAuthStore from "@/store/AuthStore";
import usePathnameStore from "@/store/PathnameStore";

const useSignIn = () => {
  const messageApi = useMessage();

  const { lang } = useLang();

  const previousPath = usePathnameStore((state) => state.previousPath);

  const setAuth = useAuthStore((state) => state.setAuth);

  const navigate = useNavigate();

  const onSignIn = async (formData: AuthSignIn) => {
    const apiQuery: ApiQuery = { admin: true };
    const response = await signIn(apiQuery, formData);
    return response;
  };

  const mutation = useMutation(onSignIn, {
    onSuccess: (response) => {
      if (!response.success) {
        const status = response.error?.status;
        let message = "";
        if (status === HttpStatus.NOT_FOUND) message = lang.common.message.error.authEmail;
        if (status === HttpStatus.FORBIDDEN) message = lang.common.message.error.authPassword;
        if (status === HttpStatus.UNAUTHORIZED) message = lang.common.message.error.unauthorized;
        return messageApi.error(message);
      }
      messageApi.success(lang.common.message.success.signIn);
      setAuth(response.data);
      navigate(previousPath);
    },
    onError: () => messageApi.error(lang.common.message.error.signIn),
  });

  return mutation;
};

export default useSignIn;
