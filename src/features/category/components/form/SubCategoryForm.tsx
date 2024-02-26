import { FC, Fragment, useMemo, useState } from "react";
import { Button, Card, Breadcrumb, Grid } from "@/components/UI";
import { FormItem, Input, Select, Upload } from "@/components/Control";
import type { BreadcrumbItems } from "@/components/UI/Breadcrumb/type";
import type { ContentHeaderProps } from "@/components/Page/ContentHeader";
import type { SubCategoryFormData } from "@/services/subcategory/type";
import type { ApiQuery } from "@/services/type";
import type { Category } from "@/services/category/type";
import { ERecordStatus } from "@/common/enum";
import { Link } from "react-router-dom";
import { linkPaths } from "@/common/constant/url";
import { useHasLocationState, useLang, useSelectOption } from "@/hooks";
import FormLayout from "@/components/Page/FormLayout";
import useGetSubCategory from "../../hooks/subcategory/useGetSubCategory";
import useGetCategoriesOptions from "@/features/product/hooks/useGetCategoriesOptions";
import useCreateSubCategory from "../../hooks/subcategory/useCreateSubCategory";
import useUpdateSubCategory from "../../hooks/subcategory/useUpdateSubCategory";
import utils from "@/utils";

const { SUBCATEGORIES } = linkPaths;

const { Row, Col } = Grid;

const { ImageUpload } = Upload;

const { SingleImageUpload } = ImageUpload;

interface SubCategoryFormProps {}

const SubCategoryForm: FC<SubCategoryFormProps> = () => {
  const options = useSelectOption();

  const { lang } = useLang();

  const { isUpdate, state } = useHasLocationState();

  const [apiQuery, setApiQuery] = useState<ApiQuery>({ page: 1, limit: 10, keywords: "" });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    data: response,
    isFetching,
    refetch,
  } = useGetSubCategory({ subCategoryId: state?.id as string }, isUpdate);

  const { data: categories, isFetching: optionsLoading } = useGetCategoriesOptions(apiQuery);

  const { mutate: createSubCategory, isLoading: createLoading } = useCreateSubCategory();

  const { mutate: updateSubCategory, isLoading: updateLoading } = useUpdateSubCategory();

  const pageTitle = lang.category.subcategory.form[!isUpdate ? "addTitle" : "editTitle"];

  const defaultImageUrl = response ? response.data?.image?.path : "";

  const isSubmitting = !isUpdate ? createLoading : updateLoading;

  const categoryOptions = utils.mapDataToOptions<Category>(categories?.data?.items || [], "name", "id");

  const statusOptions = options.recordStatus.filter((option) => option.value !== ERecordStatus.ALL);

  const items: BreadcrumbItems = [
    { id: "1", label: <Link to={SUBCATEGORIES}>{lang.category.subcategory.list.title}</Link> },
    { id: "2", label: pageTitle, actived: true },
  ];

  const headerProps: ContentHeaderProps = {
    headTitle: pageTitle,
    right: () =>
      !isFetching && (
        <Button loading={isSubmitting} type="submit">
          {lang.common.actions[!isUpdate ? "create" : "update"]}
        </Button>
      ),
  };

  const initialData: SubCategoryFormData = useMemo(
    () => ({
      nameEn: response ? response.data?.nameEn : "",
      nameVn: response ? response.data?.nameVn : "",
      categoryId: response ? response.data?.categoryId : "",
      status: response ? response.data?.status : ERecordStatus.DRAFT,
    }),
    [response]
  );

  const handleChangePage = (page: number) => setApiQuery((prev) => ({ ...prev, page }));

  const handleSearch = (text: string) => setApiQuery((prev) => ({ ...prev, keywords: text }));

  const handleUpload = (imageFile: File | null) => setImageFile(imageFile);

  const handleSubmit = (data: SubCategoryFormData) => {
    const formData = new FormData();
    if (imageFile) formData.append("image", imageFile);
    for (let [key, value] of Object.entries(data)) {
      formData.append(key, value as string);
    }
    if (!isUpdate) return createSubCategory(formData);
    const args = { query: { subCategoryId: state?.id as string }, formData };
    updateSubCategory(args, { onSuccess: () => refetch() });
  };

  const leftItems = (
    <Card>
      <Row justify="between">
        <Col xs={24} md={6} lg={6} span={6}>
          <SingleImageUpload defaultImageUrl={defaultImageUrl} onUpload={handleUpload} />
        </Col>
        <Col xs={24} md={18} lg={16} span={18}>
          <FormItem name="nameEn">
            <Input label={lang.common.form.label.subCategoryNameEn} />
          </FormItem>
          <FormItem name="nameVn">
            <Input label={lang.common.form.label.subCategoryNameVn} />
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
      <FormItem name="categoryId">
        <Select
          async
          loading={optionsLoading}
          label={lang.common.form.label.category}
          options={categoryOptions}
          onChangePage={handleChangePage}
          onChangeSearch={handleSearch}
        />
      </FormItem>
    </Card>
  );

  return (
    <Fragment>
      <Breadcrumb items={items} />
      <FormLayout<SubCategoryFormData>
        loading={isFetching}
        submitting={isSubmitting}
        initialData={initialData}
        headerProps={headerProps}
        leftItems={leftItems}
        rightItems={rightItems}
        onFinish={handleSubmit}
      />
    </Fragment>
  );
};

export default SubCategoryForm;
