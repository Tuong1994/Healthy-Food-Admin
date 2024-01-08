import React from "react";
import { UI } from "@/components";
import type { Lang } from "@/common/type";
import { HiPlus } from "react-icons/hi2";

const { Card, Space, Divider, Button, Typography } = UI;

const { Paragraph } = Typography;

interface OrderShipmentProps {
  lang: Lang;
  handleOpenShipment: () => void;
}

const OrderShipment: React.FC<OrderShipmentProps> = ({ lang, handleOpenShipment }) => {
  return (
    <Card
      rootClassName="card-section"
      head={
        <Paragraph size={16} weight={600}>
          {lang.order.form.deliveryAddress}
        </Paragraph>
      }
    >
      <Paragraph>{lang.order.form.note}</Paragraph>
      <Divider />
      <Button ghost color="green" onClick={handleOpenShipment}>
        <Space align="middle">
          <span>{lang.order.form.addShipment}</span>
          <HiPlus />
        </Space>
      </Button>
    </Card>
  );
};

export default OrderShipment;
