import { useLang } from "@/hooks";
import { useMutation } from "react-query";
import { removeShipmentsPermanent } from "@/services/shipment/api";
import type { ApiQuery } from "@/services/type";
import useMessage from "@/components/UI/ToastMessage/useMessage";

const useRemoveShipments = () => {
  const messageApi = useMessage();

  const { lang } = useLang();

  const onRemoveShipments = async (query: ApiQuery) => {
    const response = await removeShipmentsPermanent(query);
    return response;
  };

  const mutation = useMutation(onRemoveShipments, {
    onSuccess: (response) => {
      if (!response.success) return messageApi.error(lang.common.message.error.remove);
      messageApi.success(lang.common.message.success.remove);
    },
    onError: () => messageApi.error(lang.common.message.error.remove),
  });

  return mutation;
};

export default useRemoveShipments;
