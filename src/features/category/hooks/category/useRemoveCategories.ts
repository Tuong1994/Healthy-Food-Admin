import { useLang } from "@/hooks";
import { useMutation } from "react-query";
import { removeCategories } from "@/services/category/api";
import type { ApiQuery } from "@/services/type";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import helper from "@/helper";

const useRemoveCategories = () => {
  const messageApi = useMessage();

  const { lang } = useLang();

  const onRemoveCategories = async (query: ApiQuery) => {
    const response = await removeCategories(query);
    return response;
  };

  const mutation = useMutation(onRemoveCategories, {
    onSuccess: (response) => {
      if (!response.success) {
        if (helper.isAbort(response)) return;
        return messageApi.error(lang.common.message.error.remove);
      }
      messageApi.success(lang.common.message.success.remove);
    },
    onError: () => messageApi.error(lang.common.message.error.remove),
  });

  return mutation;
};

export default useRemoveCategories;
