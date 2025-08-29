import { BLOB_DOCUMENT_TYPE } from "@/common/constant/blob";
import { subCategoryExport } from "@/services/export/api";
import { useLang } from "@/hooks";
import { useMutation } from "react-query";
import type { ApiQuery } from "@/services/type";
import FileSaver from "file-saver";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import helper from "@/helper";

const useExportSubCategory = () => {
  const messageApi = useMessage();

  const { lang } = useLang();

  const onExportSubCategory = async (query: ApiQuery) => {
    const response = await subCategoryExport(query);
    return response;
  };

  const mutation = useMutation(onExportSubCategory, {
    onSuccess: (response) => {
      if (!response.success) {
        if (helper.isAbort(response)) return;
        return messageApi.error(lang.common.message.error.export);
      }
      const blob = new Blob([response.data], { type: BLOB_DOCUMENT_TYPE });
      FileSaver.saveAs(blob, "subcategories.xlsx");
    },
    onError: () => messageApi.error(lang.common.message.error.export),
  });

  return mutation;
};

export default useExportSubCategory;
