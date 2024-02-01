import { FC, Fragment, useState } from "react";
import { Space, Button } from "@/components/UI";
import { useLang } from "@/hooks";
import { Link } from "react-router-dom";
import { linkPaths } from "@/common/constant/url";
import { ESort } from "@/common/enum";
import type { ApiQuery } from "@/services/type";
import ContentHeader from "@/components/Page/ContentHeader";
import ProductsTable from "@/features/product/components/list/ProductsTable";
import useGetProducts from "@/features/product/hooks/useGetProducts";
import useDebounce from "@/hooks/features/useDebounce";

const { PRODUCT } = linkPaths;

interface ProductsProps {}

const Products: FC<ProductsProps> = () => {
  const { lang } = useLang();

  const [apiQuery, setApiQuery] = useState<ApiQuery>({
    page: 1,
    limit: 10,
    keywords: "",
    productStatus: undefined,
    productUnit: undefined,
    inventoryStatus: undefined,
    sortBy: ESort.NEWEST,
  });

  const debounce = useDebounce(apiQuery.keywords as string);

  const { data: products, isFetching, isError } = useGetProducts({ ...apiQuery, keywords: debounce });

  return (
    <Fragment>
      <ContentHeader
        total={products?.data?.totalItems}
        headTitle={lang.product.list.title}
        right={() => (
          <Fragment>
            <Space>
              <Button color="blue" ghost>
                {lang.common.actions.export}
              </Button>
              <Link to={PRODUCT}>
                <Button color="green">{lang.common.actions.create}</Button>
              </Link>
            </Space>
          </Fragment>
        )}
      />
      <ProductsTable
        lang={lang}
        products={products}
        isLoading={isFetching}
        isError={isError}
        apiQuery={apiQuery}
        setApiQuery={setApiQuery}
      />
    </Fragment>
  );
};

export default Products;
