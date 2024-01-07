import React from "react";
import { UI, Control } from "@/components";
import type { Lang } from "@/common/type";
import { useSelectOption } from "@/hooks";

const { Card, Typography } = UI;

const { Paragraph } = Typography;

const { FormItem, Input, Select } = Control;

interface ProductStorageProps {
  lang: Lang;
}

const ProductStorage: React.FC<ProductStorageProps> = ({ lang }) => {
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
