import { ApiQuery } from "@/services/type";
import { AuthPassword } from "@/services/auth/type";
import { changePassword } from "@/services/auth/api";
import { useMutation } from "react-query";
import { useLang } from "@/hooks";
import useMessage from "@/components/UI/ToastMessage/useMessage";

const useChangePassword = () => {
  const messageApi = useMessage();

  const { lang } = useLang();

  const onChangePassword = async (args: { query: ApiQuery; formData: AuthPassword }) => {
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
