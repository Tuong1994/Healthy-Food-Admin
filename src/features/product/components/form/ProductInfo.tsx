import { FC } from "react";
import { Card, Grid } from "@/components/UI";
import { FormItem, Upload, Input } from "@/components/Control";
import type { Lang } from "@/common/type";

const { Row, Col } = Grid;

const { ImageUpload } = Upload;

const { SingleImageUpload } = ImageUpload;

interface ProductInfoProps {
  lang: Lang;
}

const ProductInfo: FC<ProductInfoProps> = ({ lang }) => {
  return (
    <Card rootClassName="card-section">
      <Row justify="between">
        <Col xs={24} md={24} lg={6} span={6}>
          <SingleImageUpload />
        </Col>
        <Col xs={24} md={24} lg={18} span={18}>
          <FormItem name="nameEn">
            <Input label={lang.common.form.label.productNameEn} />
          </FormItem>
          <FormItem name="nameVn">
            <Input label={lang.common.form.label.productNameVn} />
          </FormItem>
        </Col>
      </Row>
    </Card>
  );
};

export default ProductInfo;
