import { useLang } from "@/hooks";
import { updateShipment } from "@/services/shipment/api";
import { useMutation } from "react-query";
import type { ShipmentFormData } from "@/services/shipment/type";
import type { ApiQuery } from "@/services/type";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import helper from "@/helper";

const useUpdateShipment = () => {
  const messageApi = useMessage();

  const { lang } = useLang();

  const onUpdateShipment = async (args: { query: ApiQuery; formData: ShipmentFormData }) => {
    const { query, formData } = args;
    const response = await updateShipment(query, formData);
    return response;
  };

  const mutation = useMutation(onUpdateShipment, {
    onSuccess: (response) => {
      if (!response.success) {
        if (helper.isAbort(response)) return;;
        return messageApi.error(lang.common.message.error.update);
      }
      messageApi.success(lang.common.message.success.update);
    },
    onError: () => messageApi.error(lang.common.message.error.update),
  });

  return mutation;
};

export default useUpdateShipment;
