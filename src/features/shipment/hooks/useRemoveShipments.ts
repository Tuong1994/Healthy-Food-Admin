import { removeShipments } from "@/services/shipment/api";
import { useLang } from "@/hooks";
import type { ApiQuery } from "@/services/type";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import { useMutation } from "react-query";

const useRemoveShipments = () => {
  const messageApi = useMessage();

  const { lang } = useLang();

  const onRemoveShipments = async (query: ApiQuery) => {
    const response = await removeShipments(query);
    return response;
  };

  const mutation = useMutation(onRemoveShipments, {
    onError: () => messageApi.error(lang.common.message.error.remove),
  });

  return mutation;
};

export default useRemoveShipments;
