import React from "react";
import { UI, Control } from "@/components";
import type { Lang } from "@/common/type";
import { useSelectOption } from "@/hooks";

const { Card, Typography } = UI;

const { Paragraph } = Typography;

const { FormItem, Select } = Control;

interface CustomerAuthProps {
  lang: Lang;
}

const CustomerAuth: React.FC<CustomerAuthProps> = ({ lang }) => {
  const options = useSelectOption();

  return (
    <Card
      rootClassName="card-section"
      head={
        <Paragraph size={16} weight={600}>
          {lang.customer.form.permission}
        </Paragraph>
      }
    >
      <FormItem name="role">
        <Select label={lang.common.form.label.role} options={options.role} />
      </FormItem>
    </Card>
  );
};

export default CustomerAuth;
