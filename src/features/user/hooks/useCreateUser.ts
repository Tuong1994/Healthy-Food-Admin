import { createUser } from "@/services/user/api";
import { useMutation } from "react-query";
import { useLang } from "@/hooks";
import { useNavigate } from "react-router";
import { linkPaths } from "@/common/constant/url";
import useMessage from "@/components/UI/ToastMessage/useMessage";

const { USER } = linkPaths;

const useCreateUser = () => {
  const messageApi = useMessage();

  const { lang } = useLang();

  const navigate = useNavigate();

  const createNewUser = async (formData: FormData) => {
    const response = await createUser(formData);
    return response;
  };

  const mutation = useMutation(createNewUser, {
    onSuccess: (response) => {
      if (!response.success) return messageApi.error(lang.common.message.error.create);
      messageApi.success(lang.common.message.success.create);
      navigate(USER, { state: { id: response.data?.id } });
    },
    onError: () => messageApi.error(lang.common.message.error.create),
  });

  return mutation;
};

export default useCreateUser;
