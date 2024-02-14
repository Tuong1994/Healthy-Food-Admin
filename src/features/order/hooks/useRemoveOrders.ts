import { useMutation } from "react-query";
import { useLang } from "@/hooks";
import { removeOrders } from "@/services/order/api";
import type { ApiQuery } from "@/services/type";
import useMessage from "@/components/UI/ToastMessage/useMessage";

const useRemoveOrders = () => {
  const messageApi = useMessage();

  const { lang } = useLang();

  const onRemoveOrders = async (query: ApiQuery) => {
    const response = await removeOrders(query);
    return response;
  };

  const mutation = useMutation(onRemoveOrders, {
    onError: () => messageApi.error(lang.common.message.error.remove),
  });

  return mutation;
};

export default useRemoveOrders;
