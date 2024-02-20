import { FC, Dispatch, SetStateAction, ChangeEvent, Fragment, useState } from "react";
import { Space, Card, Image, Button, Divider, Typography, Grid } from "@/components/UI";
import { CheckBox } from "@/components/Control";
import { HiMinus, HiPlus } from "react-icons/hi2";
import { ONLY_DIGIT_REGEX } from "@/components/Control/regex";
import { linkPaths } from "@/common/constant/url";
import { Link } from "react-router-dom";
import { useLang } from "@/hooks";
import type { OrderItem } from "@/services/order/type";
import utils from "@/utils";

const { PRODUCT } = linkPaths;

const { Paragraph } = Typography;

const { Row, Col } = Grid;

interface OrderProductProps {
  isUpdate: boolean;
  selectedItems: OrderItem[];
  onReFetch: () => void;
  handleOpenSelect: () => void;
  setSelectedItems: Dispatch<SetStateAction<OrderItem[]>>;
  setItemRemovedIds: Dispatch<SetStateAction<string[]>>;
}

const OrderProduct: FC<OrderProductProps> = ({
  isUpdate,
  selectedItems,
  onReFetch,
  setSelectedItems,
  setItemRemovedIds,
  handleOpenSelect,
}) => {
  const { locale, lang } = useLang();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

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

  const handleSelect = (productId: string) => {
    let listIds = [...selectedIds];
    const idx = listIds.findIndex((id) => id === productId);
    if (idx !== -1) listIds = listIds.filter((id) => id !== productId);
    else listIds = [...listIds, productId];
    setSelectedIds(listIds);
    if (isUpdate) setItemRemovedIds(listIds);
  };

  const handleCancelSelect = () => setSelectedIds([]);

  const handleRemoveItems = () => {
    const filterItems = selectedItems.filter((item) => !selectedIds.includes(item.productId));
    setSelectedItems([...filterItems]);
    setSelectedIds([]);
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
      const productId = product?.id as string;
      const isSelected = selectedIds.includes(productId);
      const btnDisabled = item.quantity === 1;
      const btnDisabledClassName = btnDisabled ? "quantity-btn-disabled" : "";
      const selectedClassName = isSelected ? "card-inner-selected" : "";
      return (
        <Card
          hoverable
          key={productId}
          rootClassName="product-card"
          bodyClassName={utils.formatClassName("card-inner", selectedClassName)}
        >
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
                  onClick={() => handleQuantityClick("minus", productId)}
                >
                  <HiMinus />
                </button>
                <input
                  className="quantity-input"
                  value={item.quantity}
                  onBlur={(e) => handleQuantityInput(e, productId)}
                  onChange={(e) => handleQuantityInput(e, productId)}
                />
                <button
                  type="button"
                  className="quantity-btn"
                  onClick={() => handleQuantityClick("plus", productId)}
                >
                  <HiPlus />
                </button>
              </div>
            </Col>
            <Col span={5}>
              <Paragraph>{utils.formatPrice(locale, product?.totalPrice)}</Paragraph>
            </Col>
            <Col span={2}>
              <CheckBox
                color="green"
                rootClassName="inner-checkbox"
                checked={isSelected}
                onCheck={() => handleSelect(productId)}
              />
            </Col>
          </Row>
        </Card>
      );
    });
  };

  return (
    <Card rootClassName="order-product card-section">
      <Space justify="center">
        <Button onClick={handleOpenSelect}>{lang.order.form.select}</Button>
        <Link to={PRODUCT}>
          <Button ghost>{lang.order.form.create}</Button>
        </Link>
      </Space>
      <Divider />
      {selectedIds.length > 0 && (
        <Space justify="end" rootClassName="product-remove-btn">
          <Button sizes="sm" color="red" ghost onClick={handleRemoveItems}>
            {lang.common.actions.remove}
          </Button>
          <Button sizes="sm" ghost onClick={handleCancelSelect}>
            {lang.common.actions.cancel}
          </Button>
        </Space>
      )}
      {renderList()}
    </Card>
  );
};

export default OrderProduct;
