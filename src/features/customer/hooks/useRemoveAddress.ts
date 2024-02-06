import { useLang } from "@/hooks";
import { removeAddress } from "@/services/customer/api";
import { ApiQuery } from "@/services/type";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import { useMutation } from "react-query";

const useRemoveAddress = () => {
  const messageApi = useMessage();

  const { lang } = useLang();

  const onRemoveAddress = async (query: ApiQuery) => {
    const response = await removeAddress(query);
    return response;
  };

  const mutation = useMutation(onRemoveAddress, {
    onError: () => messageApi.error(lang.common.message.error.remove),
  });

  return mutation;
};

export default useRemoveAddress;
