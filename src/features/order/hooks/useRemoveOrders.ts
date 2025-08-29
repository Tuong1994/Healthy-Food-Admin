import { useMutation } from "react-query";
import { useLang } from "@/hooks";
import { removeOrders } from "@/services/order/api";
import type { ApiQuery } from "@/services/type";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import helper from "@/helper";

const useRemoveOrders = () => {
  const messageApi = useMessage();

  const { lang } = useLang();

  const onRemoveOrders = async (query: ApiQuery) => {
    const response = await removeOrders(query);
    return response;
  };

  const mutation = useMutation(onRemoveOrders, {
    onSuccess: (response) => {
      if (!response.success) {
        if (helper.isAbort(response)) return;
        return messageApi.error(lang.common.message.error.remove);
      }
      messageApi.success(lang.common.message.success.remove);
    },
    onError: () => messageApi.error(lang.common.message.error.remove),
  });

  return mutation;
};

export default useRemoveOrders;
