import { FC, Fragment, useMemo, useState } from "react";
import { Grid, Card, Breadcrumb, Button } from "@/components/UI";
import { FormItem, Input, Select, Upload } from "@/components/Control";
import { useHasLocationState, useLang, usePermission, useSelectOption } from "@/hooks";
import { Link } from "react-router-dom";
import { linkPaths } from "@/common/constant/url";
import { ERecordStatus } from "@/common/enum";
import type { BreadcrumbItems } from "@/components/UI/Breadcrumb/type";
import type { CategoryFormData } from "@/services/category/type";
import type { ContentHeaderProps } from "@/components/Page/ContentHeader";
import FormLayout from "@/components/Page/FormLayout";
import useGetCategory from "../../hooks/category/useGetCategory";
import useCreateCategory from "../../hooks/category/useCreateCategory";
import useUpdateCategory from "../../hooks/category/useUpdateCategory";

const { CATEGORIES } = linkPaths;

const { Row, Col } = Grid;

const { ImageUpload } = Upload;

const { SingleImageUpload } = ImageUpload;

interface CategoryFormProps {}

const CategoryForm: FC<CategoryFormProps> = () => {
  const options = useSelectOption();

  const { canCreate, canUpdate } = usePermission();

  const { lang } = useLang();

  const { isUpdate, state } = useHasLocationState();

  const {
    data: response,
    isFetching,
    refetch,
  } = useGetCategory({ categoryId: state?.id as string }, isUpdate);

  const { mutate: createCategory, isLoading: createLoading } = useCreateCategory();

  const { mutate: updateCategory, isLoading: updateLoading } = useUpdateCategory();

  const [imageFile, setImageFile] = useState<File | null>(null);

  const pageTitle = lang.category.mainCategory.form[!isUpdate ? "addTitle" : "editTitle"];

  const isSubmitting = !isUpdate ? createLoading : updateLoading;

  const canInteract = !isUpdate ? canCreate : canUpdate;

  const statusOptions = options.recordStatus.filter((option) => option.value !== ERecordStatus.ALL);

  const items: BreadcrumbItems = [
    { id: "1", label: <Link to={CATEGORIES}>{lang.category.mainCategory.list.title}</Link> },
    { id: "2", label: pageTitle, actived: true },
  ];

  const headerProps: ContentHeaderProps = {
    headTitle: pageTitle,
    right: () =>
      !isFetching &&
      canInteract && (
        <Button type="submit" loading={isSubmitting}>
          {lang.common.actions[!isUpdate ? "create" : "update"]}
        </Button>
      ),
  };

  const defaultImageUrl = response ? response.data?.image?.path : "";

  const initialData: CategoryFormData = useMemo(
    () => ({
      nameEn: response ? response.data?.nameEn : "",
      nameVn: response ? response.data?.nameVn : "",
      status: response ? response.data?.status : ERecordStatus.DRAFT,
    }),
    [response]
  );

  const handleUpload = (imageFile: File | null) => setImageFile(imageFile);

  const handleSubmit = (data: CategoryFormData) => {
    const formData = new FormData();
    if (imageFile) formData.append("image", imageFile);
    for (let [key, value] of Object.entries(data)) {
      formData.append(key, value as string);
    }
    if (!isUpdate) return createCategory(formData);
    const args = { query: { categoryId: state?.id as string }, formData };
    updateCategory(args, { onSuccess: () => refetch() });
  };

  const leftItems = (
    <Card>
      <Row justify="between">
        <Col xs={24} md={6} lg={6} span={6}>
          <SingleImageUpload defaultImageUrl={defaultImageUrl} onUpload={handleUpload} />
        </Col>
        <Col xs={24} md={18} lg={16} span={18}>
          <FormItem name="nameEn">
            <Input label={lang.common.form.label.categoryNameEn} />
          </FormItem>
          <FormItem name="nameVn">
            <Input label={lang.common.form.label.categoryNameVn} />
          </FormItem>
        </Col>
      </Row>
    </Card>
  );

  const rightItems = (
    <Card>
      <FormItem name="status">
        <Select label={lang.common.form.label.status} options={statusOptions} />
      </FormItem>
    </Card>
  );

  return (
    <Fragment>
      <Breadcrumb items={items} />
      <FormLayout<CategoryFormData>
        loading={isFetching}
        submitting={!canInteract || isSubmitting}
        initialData={initialData}
        headerProps={headerProps}
        leftItems={leftItems}
        rightItems={rightItems}
        onFinish={handleSubmit}
      />
    </Fragment>
  );
};

export default CategoryForm;
