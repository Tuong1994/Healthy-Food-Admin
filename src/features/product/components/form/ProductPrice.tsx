import { Dispatch, FC, SetStateAction, useState, useEffect } from "react";
import { Space, Divider, Card, Typography, Grid } from "@/components/UI";
import { FormItem, InputNumber, Select } from "@/components/Control";
import { useLang, useRule, useSelectOption } from "@/hooks";
import type { Product } from "@/services/product/type";
import utils from "@/utils";

const { Row, Col } = Grid;

const { Paragraph } = Typography;

interface ProductPriceProps {
  price: number;
  product: Product | undefined;
  setPrice: Dispatch<SetStateAction<number>>;
}

const ProductPrice: FC<ProductPriceProps> = ({ product, price, setPrice }) => {
  const { locale, lang } = useLang();

  const { minNumber } = useRule();

  const options = useSelectOption();

  const [costPrice, setCostPrice] = useState<number>(product?.costPrice ?? 0);

  const [profit, setProfit] = useState<number>(product?.profit ?? 0);

  useEffect(() => {
    if (!costPrice || !profit) return;
    const profitPercent = (costPrice * profit) / 100;
    const totalPrice = costPrice + profitPercent;
    setPrice(totalPrice);
  }, [costPrice, profit]);

  const handleInputCostPrice = (cost: number) => {
    setPrice(0);
    if (!cost) setPrice(product?.totalPrice ?? 0);
    setCostPrice(cost);
  };

  const handleSelectProfit = (profit: any) => {
    if (!profit) setPrice(product?.totalPrice ?? 0);
    setProfit(profit);
  };

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
          <FormItem name="costPrice" rules={minNumber(1)}>
            <InputNumber required label={lang.common.form.label.cost} onChangeInput={handleInputCostPrice} />
          </FormItem>
        </Col>
        <Col xs={24} md={24} lg={12} span={12}>
          <FormItem name="profit" rules={minNumber(1)}>
            <Select
              required
              addonAfter="%"
              hasSearch={false}
              hasClear={false}
              options={options.profit}
              label={lang.common.form.label.profit}
              onChangeSelect={handleSelectProfit}
            />
          </FormItem>
        </Col>
      </Row>
      <Divider />
      <Space justify="end">
        <Paragraph size={16}>{lang.common.form.label.price} :</Paragraph>
        <Paragraph size={16} weight={600}>
          {utils.formatPrice(locale, price)}
        </Paragraph>
      </Space>
    </Card>
  );
};

export default ProductPrice;
