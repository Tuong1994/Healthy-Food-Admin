import React from "react";
import { UI, Control } from "@/components";
import type { Lang } from "@/common/type";
import { useSelectOption } from "@/hooks";

const { Card, Typography } = UI;

const { Paragraph } = Typography;

const { FormItem, Select } = Control;

interface OrderSettingProps {
  lang: Lang;
}

const OrderSetting: React.FC<OrderSettingProps> = ({ lang }) => {
  const options = useSelectOption();

  return (
    <Card
      rootClassName="card-section"
      head={
        <Paragraph size={16} weight={600}>
          {lang.order.form.setting}
        </Paragraph>
      }
    >
      <FormItem name="status">
        <Select label={lang.common.form.label.status} options={options.orderStatus} />
      </FormItem>
      <FormItem name="paymentMethod">
        <Select label={lang.common.form.label.paymentMethod} options={options.paymentMethod} />
      </FormItem>
      <FormItem name="paymentStatus">
        <Select label={lang.common.form.label.paymentStatus} options={options.paymentStatus} />
      </FormItem>
    </Card>
  );
};

export default OrderSetting;
