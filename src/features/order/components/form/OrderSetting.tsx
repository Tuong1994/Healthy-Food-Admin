import { FC } from "react";
import { Card, Typography } from "@/components/UI";
import { FormItem, Select } from "@/components/Control";
import { useSelectOption } from "@/hooks";
import type { Lang } from "@/common/type";

const { Paragraph } = Typography;

interface OrderSettingProps {
  lang: Lang;
}

const OrderSetting: FC<OrderSettingProps> = ({ lang }) => {
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
