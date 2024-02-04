import { FC } from "react";
import { Card, Typography } from "@/components/UI";
import { FormItem, Select } from "@/components/Control";
import { useRule, useSelectOption } from "@/hooks";
import type { Lang } from "@/common/type";

const { Paragraph } = Typography;

interface CustomerAuthProps {
  lang: Lang;
}

const CustomerAuth: FC<CustomerAuthProps> = ({ lang }) => {
  const options = useSelectOption();

  const { common } = useRule();

  return (
    <Card
      rootClassName="card-section"
      head={
        <Paragraph size={16} weight={600}>
          {lang.customer.form.permission}
        </Paragraph>
      }
    >
      <FormItem name="role" rules={common()}>
        <Select required label={lang.common.form.label.role} options={options.role} />
      </FormItem>
    </Card>
  );
};

export default CustomerAuth;
