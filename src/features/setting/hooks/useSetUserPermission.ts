import { useLang } from "@/hooks";
import { useMutation } from "react-query";
import { settingPermission } from "@/services/setting/api";
import type { UserPermission } from "@/services/setting/type";
import useMessage from "@/components/UI/ToastMessage/useMessage";

const useSetUserPermission = () => {
  const messageApi = useMessage();

  const { lang } = useLang();

  const onSetUserPermission = async (data: UserPermission) => {
    const response = await settingPermission(data);
    return response;
  };

  const mutation = useMutation(onSetUserPermission, {
    onSuccess: (response) => {
      if (!response.success) return messageApi.error(lang.common.message.success.setting);
      messageApi.success(lang.common.message.success.setting);
    },
    onError: () => messageApi.error(lang.common.message.error.setting),
  });

  return mutation;
};

export default useSetUserPermission;
