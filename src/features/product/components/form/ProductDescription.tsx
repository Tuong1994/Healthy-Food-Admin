import { FC } from "react";
import { Card } from "@/components/UI";
import { Editor, FormItem } from "@/components/Control";
import type { Lang } from "@/common/type";

interface ProductDescriptionProps {
  lang: Lang;
}

const ProductDescription: FC<ProductDescriptionProps> = ({ lang }) => {
  return (
    <Card rootClassName="card-section product-description">
      <FormItem name="descriptionEn">
        <Editor label={lang.common.form.label.descriptionEn} />
      </FormItem>
      <FormItem name="descriptionVn">
        <Editor label={lang.common.form.label.descriptionVn} />
      </FormItem>
    </Card>
  );
};

export default ProductDescription;
