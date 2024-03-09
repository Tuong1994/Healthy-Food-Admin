import { useLang } from "@/hooks";
import { updateOrder } from "@/services/order/api";
import { useMutation } from "react-query";
import type { OrderFormData } from "@/services/order/type";
import type { ApiQuery } from "@/services/type";
import useMessage from "@/components/UI/ToastMessage/useMessage";

const useUpdateOrder = () => {
  const messageApi = useMessage();

  const { lang } = useLang();

  const onUpdateOrder = async (args: { query: ApiQuery; formData: OrderFormData }) => {
    const { query, formData } = args;
    const response = await updateOrder(query, formData);
    return response;
  };

  const mutation = useMutation(onUpdateOrder, {
    onSuccess: (response) => {
      if (!response.success) return messageApi.error(lang.common.message.error.update);
      messageApi.success(lang.common.message.success.update);
    },
    onError: () => messageApi.error(lang.common.message.error.update),
  });

  return mutation;
};

export default useUpdateOrder;
