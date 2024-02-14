import { FC } from "react";
import { Card, Grid } from "@/components/UI";
import { FormItem, Upload, Input } from "@/components/Control";
import type { Lang } from "@/common/type";
import type { Product } from "@/services/product/type";
import { useRule } from "@/hooks";

const { Row, Col } = Grid;

const { ImageUpload } = Upload;

const { SingleImageUpload } = ImageUpload;

interface ProductInfoProps {
  lang: Lang;
  product: Product | undefined;
  handleUpload: (image: File | null) => void;
}

const ProductInfo: FC<ProductInfoProps> = ({ lang, product, handleUpload }) => {
  const { common } = useRule();

  return (
    <Card rootClassName="card-section">
      <Row justify="between">
        <Col xs={24} md={24} lg={6} span={6}>
          <SingleImageUpload defaultImageUrl={product?.image?.path} onUpload={handleUpload} />
        </Col>
        <Col xs={24} md={24} lg={18} span={18}>
          <FormItem name="nameEn" rules={common()}>
            <Input required label={lang.common.form.label.productNameEn} />
          </FormItem>
          <FormItem name="nameVn" rules={common()}>
            <Input required label={lang.common.form.label.productNameVn} />
          </FormItem>
        </Col>
      </Row>
    </Card>
  );
};

export default ProductInfo;
