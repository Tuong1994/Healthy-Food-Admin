import { useLang } from "@/hooks";
import { removeUsers } from "@/services/user/api";
import { useMutation } from "react-query";
import type { ApiQuery } from "@/services/type";
import useMessage from "@/components/UI/ToastMessage/useMessage";

const useRemoveUsers = () => {
  const messageApi = useMessage();

  const { lang } = useLang();

  const onRemoveUsers = async (query: ApiQuery) => {
    const response = await removeUsers(query);
    return response;
  };

  const mutation = useMutation(onRemoveUsers, {
    onSuccess: (response) => {
      if (!response.success) return messageApi.error(lang.common.message.error.remove);
      messageApi.success(lang.common.message.success.remove);
    },
    onError: () => messageApi.error(lang.common.message.error.remove),
  });

  return mutation;
};

export default useRemoveUsers;
