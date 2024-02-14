import useMessage from "@/components/UI/ToastMessage/useMessage";
import { useLang } from "@/hooks";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { createProduct } from "@/services/product/api";
import { linkPaths } from "@/common/constant/url";

const { PRODUCT } = linkPaths;

const useCreateProduct = () => {
  const messageApi = useMessage();

  const navigate = useNavigate();

  const { lang } = useLang();

  const onCreateProduct = async (formData: FormData) => {
    const response = await createProduct(formData);
    return response;
  };

  const mutation = useMutation(onCreateProduct, {
    onSuccess: (response) => {
      if (!response.success) return messageApi.error(lang.common.message.error.create);
      messageApi.success(lang.common.message.success.create);
      navigate(PRODUCT, { state: { id: response.data?.id } });
    },
    onError: () => messageApi.error(lang.common.message.error.create),
  });

  return mutation;
};

export default useCreateProduct;
