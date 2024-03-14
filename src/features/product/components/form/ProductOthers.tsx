import { FC } from "react";
import { Card, Typography } from "@/components/UI";
import { FormItem, Select } from "@/components/Control";
import { useRule, useSelectOption } from "@/hooks";
import type { Lang } from "@/common/type";

const { Paragraph } = Typography;

interface ProductOthersProps {
  lang: Lang;
}

const ProductOthers: FC<ProductOthersProps> = ({ lang }) => {
  const options = useSelectOption();

  const { common } = useRule();

  return (
    <Card
      head={
        <Paragraph size={16} weight={600}>
          {lang.product.form.others}
        </Paragraph>
      }
    >
      <FormItem name="status" rules={common()}>
        <Select required label={lang.common.form.label.status} options={options.recordStatus} />
      </FormItem>
      <FormItem name="unit" rules={common()}>
        <Select required label={lang.common.form.label.unit} options={options.unit} />
      </FormItem>
      <FormItem name="origin" rules={common()}>
        <Select required label={lang.common.form.label.origin} options={options.origin} />
      </FormItem>
      <FormItem name="supplier" rules={common()}>
        <Select required label={lang.common.form.label.supplier} options={options.supplier} />
      </FormItem>
    </Card>
  );
};

export default ProductOthers;
