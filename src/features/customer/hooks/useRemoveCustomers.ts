import { useLang } from "@/hooks";
import { removeCustomers } from "@/services/customer/api";
import { useMutation } from "react-query";
import type { ApiQuery } from "@/services/type";
import useMessage from "@/components/UI/ToastMessage/useMessage";

const useRemoveCustomers = () => {
  const messageApi = useMessage();

  const { lang } = useLang();

  const onRemoveCustomers = async (query: ApiQuery) => {
    const response = await removeCustomers(query);
    return response;
  };

  const mutation = useMutation(onRemoveCustomers, {
    onSuccess: (response) => {
      if (!response.success) return messageApi.error(lang.common.message.error.remove);
      messageApi.success(lang.common.message.success.remove);
    },
    onError: () => messageApi.error(lang.common.message.error.remove),
  });

  return mutation;
};

export default useRemoveCustomers;
