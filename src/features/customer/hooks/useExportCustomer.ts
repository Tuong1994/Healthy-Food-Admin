import { customerExport } from "@/services/export/api";
import { useMutation } from "react-query";
import { useLang } from "@/hooks";
import { BLOB_DOCUMENT_TYPE } from "@/common/constant/blob";
import type { ApiQuery } from "@/services/type";
import FileSaver from "file-saver";
import useMessage from "@/components/UI/ToastMessage/useMessage";

const useExportCustomer = () => {
  const messageApi = useMessage();

  const { lang } = useLang();

  const onExportCustomer = async (query: ApiQuery) => {
    const response = await customerExport(query);
    return response;
  };

  const mutation = useMutation(onExportCustomer, {
    onSuccess: (response) => {
      if (!response.success) return messageApi.error(lang.common.message.error.export);
      const blob = new Blob([response.data], { type: BLOB_DOCUMENT_TYPE });
      FileSaver.saveAs(blob, "customers.xlsx");
    },
    onError: () => messageApi.error(lang.common.message.error.export),
  });

  return mutation;
};

export default useExportCustomer;
