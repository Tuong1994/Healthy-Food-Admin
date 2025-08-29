import { BLOB_DOCUMENT_TYPE } from "@/common/constant/blob";
import { shipmentExport } from "@/services/export/api";
import { useLang } from "@/hooks";
import { useMutation } from "react-query";
import type { ApiQuery } from "@/services/type";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import FileSaver from "file-saver";
import helper from "@/helper";

const useExportShipment = () => {
  const messageApi = useMessage();

  const { lang } = useLang();

  const onExportShipment = async (query: ApiQuery) => {
    const response = await shipmentExport(query);
    return response;
  };

  const mutation = useMutation(onExportShipment, {
    onSuccess: (response) => {
      if (!response.success) {
        if (helper.isAbort(response)) return;
        return messageApi.error(lang.common.message.error.export);
      }
      const blob = new Blob([response.data], { type: BLOB_DOCUMENT_TYPE });
      FileSaver.saveAs(blob, "shipments.xlsx");
    },
    onError: () => messageApi.error(lang.common.message.error.export),
  });

  return mutation;
};

export default useExportShipment;
