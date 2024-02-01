import { FC, Fragment, useState } from "react";
import { Space, Button } from "@/components/UI";
import { useLang } from "@/hooks";
import { Link } from "react-router-dom";
import { ESort } from "@/common/enum";
import { linkPaths } from "@/common/constant/url";
import type { ApiQuery } from "@/services/type";
import ContentHeader from "@/components/Page/ContentHeader";
import ShipmentsTable from "@/features/shipment/components/ShipmentsTable";
import useDebounce from "@/hooks/features/useDebounce";
import useGetShipmentsPaging from "@/features/shipment/hooks/useGetShipmentsPaging";

const { SHIPMENT } = linkPaths;

interface ShipmentsProps {}

const Shipments: FC<ShipmentsProps> = () => {
  const { lang } = useLang();

  const initialApiQuery: ApiQuery = {
    page: 1,
    limit: 10,
    keywords: "",
    sortBy: ESort.NEWEST,
  };

  const [apiQuery, setApiQuery] = useState<ApiQuery>(initialApiQuery);

  const debounce = useDebounce(apiQuery.keywords as string);

  const { data: shipments, isFetching, isError } = useGetShipmentsPaging({ ...apiQuery, keywords: debounce });

  const handleResetFilter = () => setApiQuery(initialApiQuery);

  return (
    <Fragment>
      <ContentHeader
        headTitle={lang.shipment.list.title}
        total={shipments?.data?.totalItems}
        right={() => (
          <Fragment>
            <Space>
              <Button color="blue" ghost>
                {lang.common.actions.export}
              </Button>
              <Link to={SHIPMENT}>
                <Button color="green">{lang.common.actions.create}</Button>
              </Link>
            </Space>
          </Fragment>
        )}
      />
      <ShipmentsTable
        lang={lang}
        shipments={shipments}
        isLoading={isFetching}
        isError={isError}
        apiQuery={apiQuery}
        setApiQuery={setApiQuery}
        handleResetFilter={handleResetFilter}
      />
    </Fragment>
  );
};

export default Shipments;
