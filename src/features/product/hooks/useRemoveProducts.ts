import { useLang } from "@/hooks";
import { useMutation } from "react-query";
import { removeProducts } from "@/services/product/api";
import type { ApiQuery } from "@/services/type";
import useMessage from "@/components/UI/ToastMessage/useMessage";

const useRemoveProducts = () => {
  const messageApi = useMessage();

  const { lang } = useLang();

  const onRemoveProducts = async (query: ApiQuery) => {
    const response = await removeProducts(query);
    return response;
  };

  const mutation = useMutation(onRemoveProducts, {
    onError: () => messageApi.error(lang.common.message.error.remove),
  });

  return mutation;
};

export default useRemoveProducts;
