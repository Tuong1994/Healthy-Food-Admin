import { FC, Fragment } from "react";
import { Space, Button } from "@/components/UI";
import { useLang } from "@/hooks";
import { Link } from "react-router-dom";
import { linkPaths } from "@/common/constant/url";
import ContentHeader from "@/components/Page/ContentHeader";
import ShipmentsTable from "@/features/shipment/components/ShipmentsTable";

const { SHIPMENT } = linkPaths;

interface ShipmentsProps {}

const Shipments: FC<ShipmentsProps> = () => {
  const { lang } = useLang();

  return (
    <Fragment>
      <ContentHeader
        headTitle={lang.shipment.list.title}
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
      <ShipmentsTable lang={lang} />
    </Fragment>
  );
};

export default Shipments;
