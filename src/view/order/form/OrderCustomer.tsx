import React from "react";
import { UI, Control } from "@/components";
import type { Lang } from "@/common/type";

const { Card, Typography } = UI;

const { Paragraph } = Typography;

const { FormItem, Select } = Control;

interface OrderCustomerProps {
  lang: Lang;
}

const OrderCustomer: React.FC<OrderCustomerProps> = ({ lang }) => {
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
