import { useLang } from "@/hooks";
import { useMutation } from "react-query";
import { updateSubCategory } from "@/services/subcategory/api";
import type { ApiQuery } from "@/services/type";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import helper from "@/helper";

const useUpdateSubCategory = () => {
  const messageApi = useMessage();

  const { lang } = useLang();

  const onUpdateSubCategory = async (args: { query: ApiQuery; formData: FormData }) => {
    const { query, formData } = args;
    const response = await updateSubCategory(query, formData);
    return response;
  };

  const mutation = useMutation(onUpdateSubCategory, {
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

export default useUpdateSubCategory;
