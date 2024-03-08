import { useLang } from "@/hooks";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { resetPassword } from "@/services/auth/api";
import { linkPaths } from "@/common/constant/url";
import type { AuthResetPassword } from "@/services/auth/type";
import useMessage from "@/components/UI/ToastMessage/useMessage";

const { AUTH_SIGN_IN, AUTH_FORGOT_PASSWORD } = linkPaths;

const useResetPassword = () => {
  const messageApi = useMessage();

  const navigate = useNavigate();

  const { lang } = useLang();

  const onResetPassword = async (formData: AuthResetPassword) => {
    const response = await resetPassword(formData);
    return response;
  };

  const mutation = useMutation(onResetPassword, {
    onSuccess: (response) => {
      if (!response.success) {
        navigate(AUTH_FORGOT_PASSWORD);
        return messageApi.error(lang.common.message.error.api);
      }
      messageApi.success(lang.common.message.success.resetPassword);
      navigate(AUTH_SIGN_IN);
    },
    onError: () => {
      messageApi.error(lang.common.message.error.api);
      navigate(AUTH_FORGOT_PASSWORD);
    },
  });

  return mutation;
};

export default useResetPassword;
