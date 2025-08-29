import { createSubCategory } from "@/services/subcategory/api";
import { linkPaths } from "@/common/constant/url";
import { useLang } from "@/hooks";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import helper from "@/helper";

const { SUBCATEGORY } = linkPaths;

const useCreateSubCategory = () => {
  const messageApi = useMessage();

  const { lang } = useLang();

  const navigate = useNavigate();

  const onCreateSubCategory = async (formData: FormData) => {
    const response = await createSubCategory(formData);
    return response;
  };

  const mutation = useMutation(onCreateSubCategory, {
    onSuccess: (response) => {
      if (!response.success) {
        if (helper.isAbort(response)) return;
        return messageApi.error(lang.common.message.error.create);
      }
      messageApi.success(lang.common.message.success.create);
      navigate(SUBCATEGORY, { state: { id: response.data?.id } });
    },
    onError: () => messageApi.error(lang.common.message.error.create),
  });

  return mutation;
};

export default useCreateSubCategory;
