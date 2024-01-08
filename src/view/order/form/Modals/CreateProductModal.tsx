import React from "react";
import { UI, Control } from "@/components";
import type { Lang } from "@/common/type";
import type { ModalProps } from "@/components/UI/Modal";
import { Product } from "@/services/product/type";
import { EInventoryStatus, EProductOrigin, EProductStatus, EProductUnit } from "@/services/product/enum";
import { useSelectOption } from "@/hooks";

const { Modal, Grid } = UI;

const { Row, Col } = Grid;

const { Form, FormItem, Input, InputNumber, Select, Upload } = Control;

const { ImageUpload } = Upload;

const { SingleImageUpload } = ImageUpload;

interface CreateProductModalProps extends ModalProps {
  lang: Lang;
}

const CreateProductModal: React.FC<CreateProductModalProps> = ({ lang, ...restProps }) => {
  const options = useSelectOption();

  const modalDefaultProps: ModalProps = {
    color: "green",
    sizes: "sm",
    rootClassName: "create-product-modal",
    head: lang.order.form.create,
    cancelButtonProps: { ghost: true, color: "green" },
    ...restProps,
  };

  const initialData: Product = {
    nameEn: "",
    nameVn: "",
    totalPrice: 0,
    inventory: 0,
    unit: EProductUnit.KG,
    status: EProductStatus.DRAFT,
    inventoryStatus: EInventoryStatus.OUT_OF_STOCK,
    origin: EProductOrigin.VN,
    supplier: "",
    categoryId: "",
    subCategoryId: "",
    isNew: true,
  };

  return (
    <Modal {...modalDefaultProps}>
      <Form<Product> color="green" initialData={initialData}>
        <Row justify="between">
          <Col xs={24} md={6} span={6}>
            <SingleImageUpload />
          </Col>
          <Col xs={24} md={18} span={16}>
            <FormItem name="nameEn">
              <Input label={lang.common.form.label.nameEn} />
            </FormItem>
            <FormItem name="nameVn">
              <Input label={lang.common.form.label.nameEn} />
            </FormItem>
          </Col>
        </Row>
        <FormItem name="categoryId">
          <Select label={lang.common.form.label.category} />
        </FormItem>
        <FormItem name="subCategoryId">
          <Select label={lang.common.form.label.subCategory} />
        </FormItem>
        <FormItem name="totalPrice">
          <InputNumber label={lang.common.form.label.price} />
        </FormItem>
        <FormItem name="inventory">
          <InputNumber label={lang.common.form.label.inventory} />
        </FormItem>
        <FormItem name="inventoryStatus">
          <Select label={lang.common.form.label.inventoryStatus} options={options.inventoryStatus} />
        </FormItem>
        <FormItem name="unit">
          <Select label={lang.common.form.label.unit} options={options.unit} />
        </FormItem>
        <FormItem name="status">
          <Select label={lang.common.form.label.status} options={options.productStatus} />
        </FormItem>
        <FormItem name="origin">
          <Select label={lang.common.form.label.origin} options={options.origin} />
        </FormItem>
        <FormItem name="supplier">
          <Select label={lang.common.form.label.supplier} options={options.supplier} />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateProductModal;
