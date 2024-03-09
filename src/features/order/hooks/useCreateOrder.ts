import { useLang } from "@/hooks";
import { createOrder } from "@/services/order/api";
import { OrderFormData } from "@/services/order/type";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { linkPaths } from "@/common/constant/url";
import useMessage from "@/components/UI/ToastMessage/useMessage";

const { ORDER } = linkPaths;

const useCreateOrder = () => {
  const messageApi = useMessage();

  const navigate = useNavigate();

  const { lang } = useLang();

  const onCreateOrder = async (data: OrderFormData) => {
    const response = await createOrder(data);
    return response;
  };

  const mutation = useMutation(onCreateOrder, {
    onSuccess: (response) => {
      if (!response.success) return messageApi.error(lang.common.message.error.create);
      messageApi.success(lang.common.message.success.create);
      navigate(ORDER, { state: { id: response.data?.id } });
    },
    onError: () => messageApi.error(lang.common.message.error.create),
  });

  return mutation;
};

export default useCreateOrder;
