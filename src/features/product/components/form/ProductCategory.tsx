import { FC, useState } from "react";
import { Card, Typography, Grid } from "@/components/UI";
import { FormItem, Select } from "@/components/Control";
import { ESort } from "@/common/enum";
import type { Lang } from "@/common/type";
import type { SubCategory } from "@/services/subcategory/type";
import type { Category } from "@/services/category/type";
import type { ApiQuery } from "@/services/type";
import type { Product } from "@/services/product/type";
import { useRule } from "@/hooks";
import useGetCategoriesOptions from "../../hooks/useGetCategoriesOptions";
import useGetSubCategoriesOptions from "../../hooks/useGetSubCategoriesOptions";
import useDebounce from "@/hooks/features/useDebounce";
import utils from "@/utils";

const { Paragraph } = Typography;

const { Row, Col } = Grid;

interface ProductCategoryProps {
  lang: Lang;
  product: Product | undefined;
}

const ProductCategory: FC<ProductCategoryProps> = ({ lang, product }) => {
  const { common } = useRule();

  const [categoryQuery, setCategoryQuery] = useState<ApiQuery>({
    page: 1,
    limit: 10,
    keywords: "",
    sortBy: ESort.NEWEST,
  });

  const [subCategoryQuery, setSubCategoryQuery] = useState<ApiQuery>({
    page: 1,
    limit: 10,
    categoryId: product ? product.categoryId : "",
    keywords: "",
    sortBy: ESort.NEWEST,
  });

  const categoryDebounce = useDebounce(categoryQuery.keywords as string);

  const subcategoryDebounce = useDebounce(subCategoryQuery.keywords as string);

  const { data: categories, isFetching: categoryLoading } = useGetCategoriesOptions({
    ...categoryQuery,
    keywords: categoryDebounce,
  });

  const { data: subCategories, isFetching: subCategoryLoading } = useGetSubCategoriesOptions({
    ...subCategoryQuery,
    keywords: subcategoryDebounce,
  });

  const categoryOptions = utils.mapDataToOptions<Category>(categories?.data?.items ?? [], "name", "id");

  const subCategoryOptions = utils.mapDataToOptions<SubCategory>(
    subCategories?.data?.items ?? [],
    "name",
    "id"
  );

  const handleSelectCategory = (value: any) =>
    setSubCategoryQuery((prev) => ({ ...prev, categoryId: value }));

  const handleCategoryChangePage = (page: number) => setCategoryQuery((prev) => ({ ...prev, page }));

  const handleCategorySearch = (text: string) => setCategoryQuery((prev) => ({ ...prev, keywords: text }));

  const handleSubCategoryChangePage = (page: number) => setSubCategoryQuery((prev) => ({ ...prev, page }));

  const handleSubCategoruSearch = (text: string) =>
    setSubCategoryQuery((prev) => ({ ...prev, keywords: text }));

  return (
    <Card
      head={
        <Paragraph size={16} weight={600}>
          {lang.product.form.category}
        </Paragraph>
      }
    >
      <Row justify="between">
        <Col xs={24} md={24} lg={12} span={12}>
          <FormItem name="categoryId" rules={common()}>
            <Select
              async
              required
              loading={categoryLoading}
              total={categories?.data?.totalItems}
              label={lang.common.form.label.category}
              options={categoryOptions}
              onChangeSelect={handleSelectCategory}
              onChangePage={handleCategoryChangePage}
              onChangeSearch={handleCategorySearch}
            />
          </FormItem>
        </Col>
        <Col xs={24} md={24} lg={12} span={12}>
          <FormItem name="subCategoryId" rules={common()}>
            <Select
              async
              required
              loading={subCategoryLoading}
              options={subCategoryOptions}
              total={subCategories?.data?.totalItems}
              label={lang.common.form.label.subCategory}
              emptyContent={lang.common.form.others.subCategoryEmpty}
              onChangePage={handleSubCategoryChangePage}
              onChangeSearch={handleSubCategoruSearch}
            />
          </FormItem>
        </Col>
      </Row>
    </Card>
  );
};

export default ProductCategory;
