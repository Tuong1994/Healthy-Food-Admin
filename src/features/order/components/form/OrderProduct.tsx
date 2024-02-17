import { FC, Dispatch, SetStateAction, ChangeEvent } from "react";
import { Space, Card, Image, Button, Divider, Typography, Grid } from "@/components/UI";
import { HiMinus, HiPlus, HiTrash } from "react-icons/hi2";
import { ONLY_DIGIT_REGEX } from "@/components/Control/regex";
import { useLang } from "@/hooks";
import { linkPaths } from "@/common/constant/url";
import { Link } from "react-router-dom";
import type { OrderItem } from "@/services/order/type";
import utils from "@/utils";

const { PRODUCT } = linkPaths;

const { Paragraph } = Typography;

const { Row, Col } = Grid;

interface OrderProductProps {
  selectedItems: OrderItem[];
  handleOpenSelect: () => void;
  setSelectedItems: Dispatch<SetStateAction<OrderItem[]>>;
}

const OrderProduct: FC<OrderProductProps> = ({ selectedItems, setSelectedItems, handleOpenSelect }) => {
  const { locale, lang } = useLang();

  const handleQuantityClick = (type: "plus" | "minus", productId: string) => {
    const idx = selectedItems.findIndex((item) => item.product?.id === productId);
    const updatedItem = selectedItems[idx];
    if (type === "plus") updatedItem.quantity++;
    else updatedItem.quantity--;
    setSelectedItems([...selectedItems]);
  };

  const handleQuantityInput = (e: ChangeEvent<HTMLInputElement>, productId: string) => {
    const value = e.target.value.replace(ONLY_DIGIT_REGEX, "");
    const quantity = Number(value);
    const idx = selectedItems.findIndex((item) => item.product?.id === productId);
    const updatedItem = selectedItems[idx];
    if (e.type === "blur") {
      if (quantity === 0) updatedItem.quantity = 1;
    } else updatedItem.quantity = quantity;
    setSelectedItems([...selectedItems]);
  };

  const handleRemoveItem = (productId: string) => {
    const filterItems = selectedItems.filter((item) => item.productId !== productId);
    setSelectedItems([...filterItems]);
  };

  const renderList = () => {
    if (!selectedItems.length) {
      return (
        <Paragraph align="center" variant="danger">
          {lang.order.form.productNote}
        </Paragraph>
      );
    }
    return selectedItems.map((item) => {
      const { product } = item;
      const btnDisabled = item.quantity === 1;
      const btnDisabledClassName = btnDisabled ? "quantity-btn-disabled" : "";
      return (
        <Card hoverable key={product?.id} rootClassName="product-card" bodyClassName="card-inner">
          <Row justify="between" align="middle">
            <Col span={12}>
              <Space size={15} align="middle">
                <Image imgWidth={40} imgHeight={40} />
                <Paragraph rootClassName="inner-name">{product?.name}</Paragraph>
              </Space>
            </Col>
            <Col span={5}>
              <div className="inner-quantity">
                <button
                  type="button"
                  disabled={btnDisabled}
                  className={utils.formatClassName("quantity-btn", btnDisabledClassName)}
                  onClick={() => handleQuantityClick("minus", product?.id as string)}
                >
                  <HiMinus />
                </button>
                <input
                  className="quantity-input"
                  value={item.quantity}
                  onBlur={(e) => handleQuantityInput(e, product?.id as string)}
                  onChange={(e) => handleQuantityInput(e, product?.id as string)}
                />
                <button
                  type="button"
                  className="quantity-btn"
                  onClick={() => handleQuantityClick("plus", product?.id as string)}
                >
                  <HiPlus />
                </button>
              </div>
            </Col>
            <Col span={5}>
              <Paragraph>{utils.formatPrice(locale, product?.totalPrice)}</Paragraph>
            </Col>
            <Col span={2}>
              <button
                type="button"
                className="inner-remove"
                onClick={() => handleRemoveItem(product?.id as string)}
              >
                <HiTrash size={16} />
              </button>
            </Col>
          </Row>
        </Card>
      );
    });
  };

  return (
    <Card rootClassName="order-product card-section">
      <Space justify="center">
        <Button color="blue" onClick={handleOpenSelect}>
          {lang.order.form.select}
        </Button>
        <Link to={PRODUCT}>
          <Button ghost>{lang.order.form.create}</Button>
        </Link>
      </Space>
      <Divider />
      {renderList()}
    </Card>
  );
};

export default OrderProduct;
