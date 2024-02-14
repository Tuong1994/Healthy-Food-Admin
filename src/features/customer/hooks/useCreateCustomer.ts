import { createCustomer } from "@/services/customer/api";
import { useMutation } from "react-query";
import { useLang } from "@/hooks";
import { useNavigate } from "react-router";
import { linkPaths } from "@/common/constant/url";
import useMessage from "@/components/UI/ToastMessage/useMessage";

const { CUSTOMER } = linkPaths;

const useCreateCustomer = () => {
  const messageApi = useMessage();

  const { lang } = useLang();

  const navigate = useNavigate();

  const createNewCustomer = async (formData: FormData) => {
    const response = await createCustomer(formData);
    return response;
  };

  const mutation = useMutation(createNewCustomer, {
    onSuccess: (response) => {
      if (!response.success) return messageApi.error(lang.common.message.error.create);
      messageApi.success(lang.common.message.success.create);
      navigate(CUSTOMER, { state: { id: response.data?.id } });
    },
    onError: () => messageApi.error(lang.common.message.error.create),
  });

  return mutation;
};

export default useCreateCustomer;
