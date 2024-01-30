import { FC } from "react";
import { Card, Space, Divider, Button, Typography } from "@/components/UI";
import { HiPlus } from "react-icons/hi2";
import type { Lang } from "@/common/type";

const { Paragraph } = Typography;

interface OrderShipmentProps {
  lang: Lang;
  handleOpenShipment: () => void;
}

const OrderShipment: FC<OrderShipmentProps> = ({ lang, handleOpenShipment }) => {
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
