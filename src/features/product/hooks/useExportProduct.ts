import { BLOB_DOCUMENT_TYPE } from "@/common/constant/blob";
import { productExport } from "@/services/export/api";
import { useLang } from "@/hooks";
import { useMutation } from "react-query";
import type { ApiQuery } from "@/services/type";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import FileSaver from "file-saver";

const useExportProduct = () => {
  const messageApi = useMessage();

  const { lang } = useLang();

  const onExportProduct = async (query: ApiQuery) => {
    const response = await productExport(query);
    return response;
  };

  const mutation = useMutation(onExportProduct, {
    onSuccess: (response) => {
      if (!response.success) return messageApi.error(lang.common.message.error.export);
      const blob = new Blob([response.data], { type: BLOB_DOCUMENT_TYPE });
      FileSaver.saveAs(blob, "products.xlsx");
    },
    onError: () => messageApi.error(lang.common.message.error.export),
  });

  return mutation;
};

export default useExportProduct;
