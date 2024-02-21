import { FC } from "react";
import { Card, Button, Typography, InfoRow } from "@/components/UI";
import type { Lang } from "@/common/type";
import type { Shipment } from "@/services/shipment/type";
import { Link } from "react-router-dom";
import { linkPaths } from "@/common/constant/url";

const { Paragraph } = Typography;

const { ORDER } = linkPaths;

interface ShipmentOrderProps {
  lang: Lang;
  shipment: Shipment | undefined;
}

const ShipmentOrder: FC<ShipmentOrderProps> = ({ lang, shipment }) => {
  return (
    <Card>
      <InfoRow
        hasColon
        align="middle"
        labelSpanProps={{ span: 8 }}
        textSpanProps={{ span: 10 }}
        labelElement={<Paragraph weight={600}>{lang.common.form.label.orderNumber} :</Paragraph>}
        textElement={
          <Link to={ORDER} state={{ id: shipment?.orderId }}>
            <Button text>{shipment?.order?.orderNumber}</Button>
          </Link>
        }
      />
    </Card>
  );
};

export default ShipmentOrder;
