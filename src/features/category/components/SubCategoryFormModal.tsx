import { FC } from "react";
import { Modal, Grid } from "@/components/UI";
import { Form, FormItem, Input, Select, Upload } from "@/components/Control";
import type { ModalProps } from "@/components/UI/Modal";
import type { Lang } from "@/common/type";
import type { ActiveModal } from ".";
import type { SubCategory } from "@/services/subcategory/type";

const { Row, Col } = Grid;

const { ImageUpload } = Upload;

const { SingleImageUpload } = ImageUpload;

interface SubCategoryFormModalProps extends ModalProps {
  lang: Lang;
  openModal: ActiveModal;
}

const SubCategoryFormModal: FC<SubCategoryFormModalProps> = ({ lang, openModal, ...restProps }) => {
  const modalDefaultProps: ModalProps = {
    sizes: "sm",
    color: "green",
    open: openModal.open,
    head: openModal.activeId ? lang.category.editSubCategoryTitle : lang.category.addSubCategoryTitle,
    ...restProps,
  };

  const initialData: SubCategory = {
    nameEn: "",
    nameVn: "",
    categoryId: "",
  };

  return (
    <Modal {...modalDefaultProps}>
      <Form<SubCategory> color="green" initialData={initialData}>
        <Row justify="between">
          <Col xs={24} md={6} lg={6} span={6}>
            <SingleImageUpload />
          </Col>
          <Col xs={24} md={18} lg={16} span={16}>
            <FormItem name="nameEn">
              <Input label={lang.common.form.label.subCategoryNameEn} />
            </FormItem>
            <FormItem name="nameVn">
              <Input label={lang.common.form.label.subCategoryNameVn} />
            </FormItem>
          </Col>
        </Row>
        <FormItem name="categoryId">
          <Select async label={lang.common.form.label.category} />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default SubCategoryFormModal;
