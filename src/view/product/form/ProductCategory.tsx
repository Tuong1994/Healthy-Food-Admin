import React from "react";
import { UI, Control } from "@/components";
import type { Lang } from "@/common/type";

const { Card, Typography, Grid } = UI;

const { Paragraph } = Typography;

const { Row, Col } = Grid;

const { FormItem, Select } = Control;

interface ProductCategoryProps {
  lang: Lang;
}

const ProductCategory: React.FC<ProductCategoryProps> = ({ lang }) => {
  return (
    <Card
      head={
        <Paragraph size={16} weight={600}>
          {lang.product.form.category}
        </Paragraph>
      }
    >
      <Row justify="between">
        <Col xs={24} md={24} lg={12} span={12}>
          <FormItem name="categoryId">
            <Select label={lang.common.form.label.category} />
          </FormItem>
        </Col>
        <Col xs={24} md={24} lg={12} span={12}>
          <FormItem name="subCategoryId">
            <Select label={lang.common.form.label.subCategory} />
          </FormItem>
        </Col>
      </Row>
    </Card>
  );
};

export default ProductCategory;
