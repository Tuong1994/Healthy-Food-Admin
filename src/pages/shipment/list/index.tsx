import { FC, Fragment, useState } from "react";
import { Space, Button } from "@/components/UI";
import { ESort } from "@/common/enum";
import { useLang } from "@/hooks";
import type { ApiQuery } from "@/services/type";
import ContentHeader from "@/components/Page/ContentHeader";
import ShipmentsTable from "@/features/shipment/components/list/ShipmentsTable";
import useDebounce from "@/hooks/features/useDebounce";
import useGetShipmentsPaging from "@/features/shipment/hooks/useGetShipmentsPaging";
import useExportShipment from "@/features/shipment/hooks/useExportShipment";

interface ShipmentsProps {}

const Shipments: FC<ShipmentsProps> = () => {
  const initialApiQuery: ApiQuery = {
    page: 1,
    limit: 10,
    keywords: "",
    sortBy: ESort.NEWEST,
  };

  const { locale, lang } = useLang();

  const [apiQuery, setApiQuery] = useState<ApiQuery>(initialApiQuery);

  const debounce = useDebounce(apiQuery.keywords as string);

  const {
    data: shipments,
    isFetching,
    isError,
    refetch,
  } = useGetShipmentsPaging({ ...apiQuery, keywords: debounce });

  const { mutate: onExportShipment, isLoading } = useExportShipment();

  const handleResetFilter = () => setApiQuery(initialApiQuery);

  const handleReFetch = () => refetch();

  const handleExport = () => {
    const apiQuery: ApiQuery = { langCode: locale };
    onExportShipment(apiQuery);
  };

  return (
    <Fragment>
      <ContentHeader
        headTitle={lang.shipment.list.title}
        total={shipments?.data?.totalItems}
        right={() => (
          <Space>
            <Button ghost color="blue" loading={isLoading} disabled={isLoading} onClick={handleExport}>
              {lang.common.actions.export}
            </Button>
          </Space>
        )}
      />
      <ShipmentsTable
        lang={lang}
        shipments={shipments}
        isLoading={isFetching}
        isError={isError}
        apiQuery={apiQuery}
        setApiQuery={setApiQuery}
        handleReFetch={handleReFetch}
        handleResetFilter={handleResetFilter}
      />
    </Fragment>
  );
};

export default Shipments;
