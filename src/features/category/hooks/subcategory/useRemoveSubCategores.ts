import { useLang } from "@/hooks";
import { useMutation } from "react-query";
import { removeSubCategories } from "@/services/subcategory/api";
import type { ApiQuery } from "@/services/type";
import useMessage from "@/components/UI/ToastMessage/useMessage";

const useRemoveSubCategories = () => {
  const messageApi = useMessage();

  const { lang } = useLang();

  const onRemoveSubCategories = async (query: ApiQuery) => {
    const response = await removeSubCategories(query);
    return response;
  };

  const mutation = useMutation(onRemoveSubCategories, {
    onSuccess: (response) => {
      if (!response.success) return messageApi.error(lang.common.message.error.remove);
      messageApi.success(lang.common.message.success.remove);
    },
    onError: () => messageApi.error(lang.common.message.error.remove),
  });

  return mutation;
};

export default useRemoveSubCategories;
