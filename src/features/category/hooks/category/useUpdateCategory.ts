import { updateCategory } from "@/services/category/api";
import { useLang } from "@/hooks";
import { useMutation } from "react-query";
import type { ApiQuery } from "@/services/type";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import helper from "@/helper";

const useUpdateCategory = () => {
  const messageApi = useMessage();

  const { lang } = useLang();

  const onUpdateCategory = async (args: { query: ApiQuery; formData: FormData }) => {
    const { query, formData } = args;
    const response = await updateCategory(query, formData);
    return response;
  };

  const mutation = useMutation(onUpdateCategory, {
    onSuccess: (response) => {
      if (!response.success) {
        if (helper.isAbort(response)) return;
        return messageApi.error(lang.common.message.error.update);
      }
      messageApi.success(lang.common.message.success.update);
    },
    onError: () => messageApi.error(lang.common.message.error.update),
  });

  return mutation;
};

export default useUpdateCategory;
