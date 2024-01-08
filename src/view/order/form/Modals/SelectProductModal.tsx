import React from "react";
import { UI, Control } from "@/components";
import type { Lang } from "@/common/type";
import type { ModalProps } from "@/components/UI/Modal";
import type { OrderItem } from "@/services/order/type";
import type { Product } from "@/services/product/type";
import { HiMagnifyingGlass } from "react-icons/hi2";

const { Card, Space, Divider, Image, Modal, Pagination, Typography } = UI;

const { Paragraph } = Typography;

const { Input } = Control;

interface SelectProductModalProps extends ModalProps {
  lang: Lang;
}

const SelectProductModal: React.FC<SelectProductModalProps> = ({ lang, ...restProps }) => {
  const [selectedProducts, setSelectedProducts] = React.useState<OrderItem[]>([]);

  const modalDefaultProps: ModalProps = {
    color: "green",
    sizes: "sm",
    rootClassName: "select-product-modal",
    head: lang.order.form.select,
    cancelButtonProps: { ghost: true, color: "green" },
    ...restProps,
  };

  const handleSelect = (product: Product) => {
    
  };

  const renderProducts = () => {
    return [...Array(10)].map((_, idx) => (
      <Card key={idx} rootClassName="list-product" bodyClassName="product-content" hoverable>
        <Space size={15}>
          <Image imgWidth={50} imgHeight={50} />
          <div>
            <Paragraph>Product name</Paragraph>
            <Paragraph size={16} weight={600} variant="success">
              100.000
            </Paragraph>
          </div>
        </Space>
      </Card>
    ));
  };

  return (
    <Modal {...modalDefaultProps}>
      <Input
        color="green"
        placeholder={lang.common.form.placeholder.search}
        addonAfter={<HiMagnifyingGlass />}
      />
      <Divider />
      <div className="modal-list">{renderProducts()}</div>
      <Pagination simple ghost color="green" />
    </Modal>
  );
};

export default SelectProductModal;
