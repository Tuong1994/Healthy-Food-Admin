import { useLang } from "@/hooks";
import { useMutation } from "react-query";
import { forgotPassword } from "@/services/auth/api";
import type { AuthForgotPassword } from "@/services/auth/type";
import type { ApiQuery } from "@/services/type";
import useMessage from "@/components/UI/ToastMessage/useMessage";

const useForgotPassword = () => {
  const messageApi = useMessage();

  const { lang } = useLang();

  const onForgotPassword = async (args: { query: ApiQuery; formData: AuthForgotPassword }) => {
    const { query, formData } = args;
    const response = await forgotPassword(query, formData);
    return response;
  };

  const mutation = useMutation(onForgotPassword, {
    onSuccess: (response) => {
      if (!response.success) return messageApi.error(lang.common.message.error.api);
    },
    onError: () => messageApi.error(lang.common.message.error.api),
  });

  return mutation;
};

export default useForgotPassword;
