import { FC } from "react";
import { Space, Card, Button, Divider, Typography } from "@/components/UI";
import type { Lang } from "@/common/type";

const { Paragraph } = Typography;

interface OrderProductProps {
  lang: Lang;
  handleOpenSelect: () => void;
  handleOpenCreate: () => void;
}

const OrderProduct: FC<OrderProductProps> = ({ lang, handleOpenSelect, handleOpenCreate }) => {
  return (
    <Card rootClassName="card-section">
      <Space justify="center">
        <Button color="blue" onClick={handleOpenSelect}>
          {lang.order.form.select}
        </Button>
        <Button ghost onClick={handleOpenCreate}>
          {lang.order.form.create}
        </Button>
      </Space>
      <Divider />
      <Paragraph align="center" variant="danger">
        {lang.order.form.productNote}
      </Paragraph>
    </Card>
  );
};

export default OrderProduct;
