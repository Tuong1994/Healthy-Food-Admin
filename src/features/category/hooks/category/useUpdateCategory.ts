import { updateCategory } from "@/services/category/api";
import { useLang } from "@/hooks";
import { useMutation } from "react-query";
import type { ApiQuery } from "@/services/type";
import useMessage from "@/components/UI/ToastMessage/useMessage";

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
      if (!response.success) return messageApi.error(lang.common.message.error.create);
      messageApi.success(lang.common.message.success.create);
    },
    onError: () => messageApi.error(lang.common.message.error.create),
  });

  return mutation;
};

export default useUpdateCategory;
