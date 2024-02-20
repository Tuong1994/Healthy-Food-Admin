import { useLang } from "@/hooks";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { createShipment } from "@/services/shipment/api";
import { linkPaths } from "@/common/constant/url";
import type { ShipmentFormData } from "@/services/shipment/type";
import useMessage from "@/components/UI/ToastMessage/useMessage";

const { SHIPMENT } = linkPaths;

const useCreateShipment = () => {
  const messageApi = useMessage();

  const { lang } = useLang();

  const navigate = useNavigate();

  const onCreateShipment = async (formData: ShipmentFormData) => {
    const response = await createShipment(formData);
    return response;
  };

  const mutation = useMutation(onCreateShipment, {
    onSuccess: (response) => {
      if (!response.success) return messageApi.error(lang.common.message.error.create);
      messageApi.success(lang.common.message.success.create);
      navigate(SHIPMENT, { state: response?.data?.id });
    },
    onError: () => messageApi.error(lang.common.message.error.create),
  });

  return mutation;
};

export default useCreateShipment;
