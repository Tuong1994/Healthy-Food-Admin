import { FC } from "react";
import { Card } from "@/components/UI";
import { FormItem, Input, InputPhone, TextArea } from "@/components/Control";
import { useRule } from "@/hooks";
import type { Lang } from "@/common/type";

interface ShipmentFormProps {
  lang: Lang;
}

const ShipmentForm: FC<ShipmentFormProps> = ({ lang }) => {
  const { common, phone, email } = useRule();

  return (
    <Card>
      <FormItem name="fullName" rules={common()}>
        <Input required label={lang.common.form.label.fullName} />
      </FormItem>
      <FormItem name="phone" rules={phone()}>
        <InputPhone required label={lang.common.form.label.phone} />
      </FormItem>
      <FormItem name="email" rules={email()}>
        <Input required label={lang.common.form.label.email} />
      </FormItem>
      <FormItem name="address" rules={common()}>
        <TextArea required rows={3} label={lang.common.form.label.fullAddress} />
      </FormItem>
    </Card>
  );
};

export default ShipmentForm;
