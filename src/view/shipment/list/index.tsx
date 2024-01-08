import React from "react";
import { UI } from "@/components";
import { useLang } from "@/hooks";
import { Link } from "react-router-dom";
import ContentHeader from "@/components/Page/ContentHeader";
import ShipmentsTable from "./ShipmentsTable";
import url from "@/common/constant/url";

const { SHIPMENT_FORM } = url;

const { Space, Button } = UI;

interface ShipmentsProps {}

const Shipments: React.FC<ShipmentsProps> = () => {
  const { lang } = useLang();

  return (
    <React.Fragment>
      <ContentHeader
        headTitle={lang.shipment.list.title}
        right={() => (
          <React.Fragment>
            <Space>
              <Button color="blue" ghost>
                {lang.common.actions.export}
              </Button>
              <Link to={SHIPMENT_FORM}>
                <Button color="green">{lang.common.actions.create}</Button>
              </Link>
            </Space>
          </React.Fragment>
        )}
      />
      <ShipmentsTable lang={lang} />
    </React.Fragment>
  );
};

export default Shipments;
