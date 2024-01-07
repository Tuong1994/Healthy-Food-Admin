import React from "react";
import { UI, Control } from "@/components";
import type { Lang } from "@/common/type";
import { useSelectOption } from "@/hooks";

const { Card, Typography } = UI;

const { Paragraph } = Typography;

const { FormItem, Select } = Control;

interface ProductOthersProps {
  lang: Lang;
}

const ProductOthers: React.FC<ProductOthersProps> = ({ lang }) => {
  const options = useSelectOption();

  return (
    <Card
      head={
        <Paragraph size={16} weight={600}>
          {lang.product.form.others}
        </Paragraph>
      }
    >
      <FormItem name="status">
        <Select label={lang.common.form.label.status} options={options.productStatus} />
      </FormItem>
      <FormItem name="unit">
        <Select label={lang.common.form.label.unit} options={options.unit} />
      </FormItem>
      <FormItem name="origin">
        <Select label={lang.common.form.label.origin} options={options.origin} />
      </FormItem>
      <FormItem name="supplier">
        <Select label={lang.common.form.label.supplier} options={options.supplier} />
      </FormItem>
    </Card>
  );
};

export default ProductOthers;
