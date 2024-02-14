import { FC, useState } from "react";
import { Card, Typography } from "@/components/UI";
import { FormItem, InputNumber, Select } from "@/components/Control";
import type { Lang } from "@/common/type";
import type { Product } from "@/services/product/type";
import { EInventoryStatus } from "@/services/product/enum";
import { useRule, useSelectOption } from "@/hooks";

const { Paragraph } = Typography;

interface ProductStorageProps {
  lang: Lang;
  product: Product | undefined;
}

const ProductStorage: FC<ProductStorageProps> = ({ lang, product }) => {
  const options = useSelectOption();

  const { common } = useRule();

  const [status, setStatus] = useState<EInventoryStatus>(
    product ? product?.inventoryStatus : EInventoryStatus.OUT_OF_STOCK
  );

  const handleSelect = (value: any) => setStatus(value);

  return (
    <Card
      rootClassName="card-section"
      head={
        <Paragraph size={16} weight={600}>
          {lang.product.form.storage}
        </Paragraph>
      }
    >
      <FormItem name="inventoryStatus" rules={common()}>
        <Select
          required
          label={lang.common.form.label.inventoryStatus}
          options={options.inventoryStatus}
          onChangeSelect={handleSelect}
        />
      </FormItem>
      <FormItem name="inventory" disabled={status === EInventoryStatus.OUT_OF_STOCK}>
        <InputNumber label={lang.common.form.label.inventory} />
      </FormItem>
    </Card>
  );
};

export default ProductStorage;
