import { FC } from "react";
import { Card, Typography } from "@/components/UI";
import { FormItem, Select } from "@/components/Control";
import { useSelectOption } from "@/hooks";
import type { Lang } from "@/common/type";

const { Paragraph } = Typography;

interface ProductOthersProps {
  lang: Lang;
}

const ProductOthers: FC<ProductOthersProps> = ({ lang }) => {
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
