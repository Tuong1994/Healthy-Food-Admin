import { FC } from "react";
import { Card, Typography } from "@/components/UI";
import { FormItem, Input, Select } from "@/components/Control";
import { useSelectOption } from "@/hooks";
import type { Lang } from "@/common/type";

const { Paragraph } = Typography;

interface ProductStorageProps {
  lang: Lang;
}

const ProductStorage: FC<ProductStorageProps> = ({ lang }) => {
  const options = useSelectOption();

  return (
    <Card
      rootClassName="card-section"
      head={
        <Paragraph size={16} weight={600}>
          {lang.product.form.storage}
        </Paragraph>
      }
    >
      <FormItem name="inventoryStatus">
        <Select label={lang.common.form.label.inventoryStatus} options={options.inventoryStatus} />
      </FormItem>
      <FormItem name="inventory">
        <Input label={lang.common.form.label.inventory} />
      </FormItem>
    </Card>
  );
};

export default ProductStorage;
