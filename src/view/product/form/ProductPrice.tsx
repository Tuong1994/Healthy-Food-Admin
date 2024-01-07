import React from "react";
import { UI, Control } from "@/components";
import type { Lang } from "@/common/type";
import { useSelectOption } from "@/hooks";

const { Space, Divider, Card, Typography, Grid } = UI;

const { Row, Col } = Grid;

const { Paragraph } = Typography;

const { FormItem, Input, Select } = Control;

interface ProductPriceProps {
  lang: Lang;
}

const ProductPrice: React.FC<ProductPriceProps> = ({ lang }) => {
  const options = useSelectOption();

  return (
    <Card
      rootClassName="card-section"
      head={
        <Paragraph size={16} weight={600}>
          {lang.product.form.price}
        </Paragraph>
      }
    >
      <Row justify="between">
        <Col xs={24} md={24} lg={12} span={12}>
          <FormItem name="costPrice">
            <Input label={lang.common.form.label.cost} />
          </FormItem>
        </Col>
        <Col xs={24} md={24} lg={12} span={12}>
          <FormItem name="profit">
            <Select label={lang.common.form.label.profit} addonAfter="%" options={options.profit} />
          </FormItem>
        </Col>
      </Row>
      <Divider />
      <Space justify="end">
        <Paragraph size={16}>{lang.common.form.label.price} :</Paragraph>
        <Paragraph size={16} weight={600}>
          0
        </Paragraph>
      </Space>
    </Card>
  );
};

export default ProductPrice;
