import { BLOB_DOCUMENT_TYPE } from "@/common/constant/blob";
import { useLang } from "@/hooks";
import { useMutation } from "react-query";
import { orderExport } from "@/services/export/api";
import type { ApiQuery } from "@/services/type";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import FileSaver from "file-saver";

const useExportOrder = () => {
  const messageApi = useMessage();

  const { lang } = useLang();

  const onExportOrder = async (query: ApiQuery) => {
    const response = await orderExport(query);
    return response;
  };

  const mutation = useMutation(onExportOrder, {
    onSuccess: (response) => {
      if (!response.success) return messageApi.error(lang.common.message.error.export);
      const blob = new Blob([response.data], { type: BLOB_DOCUMENT_TYPE });
      FileSaver.saveAs(blob, "orders.xlsx");
    },
    onError: () => messageApi.error(lang.common.message.error.export),
  });

  return mutation;
};

export default useExportOrder;
