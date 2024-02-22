import { FC, Fragment } from "react";
import { Button, Card, Breadcrumb, Grid } from "@/components/UI";
import { FormItem, Input, Select, Upload } from "@/components/Control";
import { useHasLocationState, useLang } from "@/hooks";
import { BreadcrumbItems } from "@/components/UI/Breadcrumb/type";
import { ContentHeaderProps } from "@/components/Page/ContentHeader";
import { Link } from "react-router-dom";
import { linkPaths } from "@/common/constant/url";
import type { SubCategoryFormData } from "@/services/subcategory/type";
import FormLayout from "@/components/Page/FormLayout";

const { SUBCATEGORIES } = linkPaths;

const { Row, Col } = Grid;

const { ImageUpload } = Upload;

const { SingleImageUpload } = ImageUpload;

interface SubCategoryFormProps {}

const SubCategoryForm: FC<SubCategoryFormProps> = () => {
  const { lang } = useLang();

  const { isUpdate, state } = useHasLocationState();

  const pageTitle = lang.category.subcategory.form[!isUpdate ? "addTitle" : "editTitle"];

  const items: BreadcrumbItems = [
    { id: "1", label: <Link to={SUBCATEGORIES}>{lang.category.subcategory.list.title}</Link> },
    { id: "2", label: pageTitle, actived: true },
  ];

  const headerProps: ContentHeaderProps = {
    headTitle: pageTitle,
    right: () => <Button type="submit">{lang.common.actions[!isUpdate ? "create" : "update"]}</Button>,
  };

  const initialData: SubCategoryFormData = {
    nameEn: "",
    nameVn: "",
    categoryId: "",
  };

  const leftItems = (
    <Card>
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
    </Card>
  );

  return (
    <Fragment>
      <Breadcrumb items={items} />
      <FormLayout<SubCategoryFormData>
        color="green"
        initialData={initialData}
        headerProps={headerProps}
        leftItems={leftItems}
      />
    </Fragment>
  );
};

export default SubCategoryForm;
