import { useMutation } from "react-query";
import { useLang } from "@/hooks";
import { changePassword } from "@/services/auth/api";
import type { AuthChangePassword } from "@/services/auth/type";
import type { ApiQuery } from "@/services/type";
import useMessage from "@/components/UI/ToastMessage/useMessage";

const useChangePassword = () => {
  const messageApi = useMessage();

  const { lang } = useLang();

  const onChangePassword = async (args: { query: ApiQuery; formData: AuthChangePassword }) => {
    const { query, formData } = args;
    const response = await changePassword(query, formData);
    return response;
  };

  const mutation = useMutation(onChangePassword, {
    onError: () => messageApi.error(lang.common.message.error.api),
  });

  return mutation;
};

export default useChangePassword;
