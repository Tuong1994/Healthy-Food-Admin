import { createCategory } from "@/services/category/api";
import { linkPaths } from "@/common/constant/url";
import { useLang } from "@/hooks";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import useMessage from "@/components/UI/ToastMessage/useMessage";

const { CATEGORY } = linkPaths;

const useCreateCategory = () => {
  const messageApi = useMessage();

  const { lang } = useLang();

  const navigate = useNavigate();

  const onCreateCategory = async (formData: FormData) => {
    const response = await createCategory(formData);
    return response;
  };

  const mutation = useMutation(onCreateCategory, {
    onSuccess: (response) => {
      if (!response.success) return messageApi.error(lang.common.message.error.create);
      messageApi.success(lang.common.message.success.create);
      navigate(CATEGORY, { state: { id: response.data?.id } });
    },
    onError: () => messageApi.error(lang.common.message.error.create),
  });

  return mutation;
};

export default useCreateCategory;
