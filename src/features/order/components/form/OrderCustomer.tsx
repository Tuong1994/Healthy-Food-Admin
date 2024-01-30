import { FC } from "react";
import { Card, Typography } from "@/components/UI";
import { FormItem, Select } from "@/components/Control";
import type { Lang } from "@/common/type";

const { Paragraph } = Typography;

interface OrderCustomerProps {
  lang: Lang;
}

const OrderCustomer: FC<OrderCustomerProps> = ({ lang }) => {
  return (
    <Card
      rootClassName="card-section"
      head={
        <Paragraph size={16} weight={600}>
          {lang.order.form.customer}
        </Paragraph>
      }
    >
      <FormItem name="customerId">
        <Select async />
      </FormItem>
    </Card>
  );
};

export default OrderCustomer;
