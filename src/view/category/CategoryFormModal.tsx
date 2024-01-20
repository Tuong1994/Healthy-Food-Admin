import { FC } from "react";
import { Modal, Grid } from "@/components/UI";
import { Form, FormItem, Input, Upload } from "@/components/Control";
import type { ModalProps } from "@/components/UI/Modal";
import type { Lang } from "@/common/type";
import type { ActiveModal } from ".";
import type { Category } from "@/services/category/type";

const { Row, Col } = Grid;

const { ImageUpload } = Upload;

const { SingleImageUpload } = ImageUpload;

interface FormModalProps extends ModalProps {
  lang: Lang;
  openModal: ActiveModal;
}

const FormModal: FC<FormModalProps> = ({ lang, openModal, ...restProps }) => {
  const modalDefaultProps: ModalProps = {
    sizes: "sm",
    color: "green",
    open: openModal.open,
    head: openModal.activeId ? lang.category.editCategoryTitle : lang.category.addCategoryTitle,
    ...restProps,
  };

  const initialData: Category = {
    nameEn: "",
    nameVn: "",
  };

  return (
    <Modal {...modalDefaultProps}>
      <Form<Category> initialData={initialData}>
        <Row justify="between">
          <Col xs={24} md={6} lg={6} span={6}>
            <SingleImageUpload />
          </Col>
          <Col xs={24} md={18} lg={16} span={16}>
            <FormItem name="nameEn">
              <Input label={lang.common.form.label.categoryNameEn} />
            </FormItem>
            <FormItem name="nameVn">
              <Input label={lang.common.form.label.categoryNameVn} />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default FormModal;
