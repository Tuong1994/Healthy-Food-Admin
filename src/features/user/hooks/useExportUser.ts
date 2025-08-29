import { userExport } from "@/services/export/api";
import { useMutation } from "react-query";
import { useLang } from "@/hooks";
import { BLOB_DOCUMENT_TYPE } from "@/common/constant/blob";
import type { ApiQuery } from "@/services/type";
import FileSaver from "file-saver";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import helper from "@/helper";

const useExportUser = () => {
  const messageApi = useMessage();

  const { lang } = useLang();

  const onExportUser = async (query: ApiQuery) => {
    const response = await userExport(query);
    return response;
  };

  const mutation = useMutation(onExportUser, {
    onSuccess: (response) => {
      if (!response.success) {
        if (helper.isAbort(response)) return;
        return messageApi.error(lang.common.message.error.export);
      }
      const blob = new Blob([response.data], { type: BLOB_DOCUMENT_TYPE });
      FileSaver.saveAs(blob, "users.xlsx");
    },
    onError: () => messageApi.error(lang.common.message.error.export),
  });

  return mutation;
};

export default useExportUser;
