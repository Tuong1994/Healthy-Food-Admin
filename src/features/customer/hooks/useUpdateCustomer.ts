import { useLang } from "@/hooks";
import { updateCustomer } from "@/services/customer/api";
import { useMutation } from "react-query";
import type { ApiQuery } from "@/services/type";
import useMessage from "@/components/UI/ToastMessage/useMessage";

const useUpdateCustomer = () => {
  const messageApi = useMessage();

  const { lang } = useLang();

  const editCustomer = async (args: { query: ApiQuery; formData: FormData }) => {
    const { query, formData } = args;
    const response = await updateCustomer(query, formData);
    return response;
  };

  const mutation = useMutation(editCustomer, {
    onSuccess: () => messageApi.success(lang.common.message.success.update),
    onError: () => messageApi.error(lang.common.message.error.update),
  });

  return mutation;
};

export default useUpdateCustomer;
