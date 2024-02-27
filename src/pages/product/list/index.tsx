import { FC, Fragment, useState } from "react";
import { Space, Button } from "@/components/UI";
import { Link } from "react-router-dom";
import { linkPaths } from "@/common/constant/url";
import { ERecordStatus, ESort } from "@/common/enum";
import { useLang } from "@/hooks";
import type { ApiQuery } from "@/services/type";
import ContentHeader from "@/components/Page/ContentHeader";
import ProductsTable from "@/features/product/components/list/ProductsTable";
import useGetProductsPaging from "@/features/product/hooks/useGetProductsPaging";
import useDebounce from "@/hooks/features/useDebounce";
import useExportProduct from "@/features/product/hooks/useExportProduct";

const { PRODUCT } = linkPaths;

interface ProductsProps {}

const Products: FC<ProductsProps> = () => {
  const { locale, lang } = useLang();

  const initialApiQuery: ApiQuery = {
    page: 1,
    limit: 10,
    keywords: "",
    productStatus: ERecordStatus.ALL,
    productUnit: undefined,
    inventoryStatus: undefined,
    sortBy: ESort.NEWEST,
  };

  const [apiQuery, setApiQuery] = useState<ApiQuery>(initialApiQuery);

  const debounce = useDebounce(apiQuery.keywords as string);

  const {
    data: products,
    isFetching,
    isError,
    refetch,
  } = useGetProductsPaging({ ...apiQuery, keywords: debounce });

  const { mutate: onExportProduct, isLoading } = useExportProduct();

  const handleResetFilter = () => setApiQuery(initialApiQuery);

  const handleReFetch = () => refetch();

  const handleExport = () => {
    const apiQuery: ApiQuery = { langCode: locale };
    onExportProduct(apiQuery);
  };

  return (
    <Fragment>
      <ContentHeader
        total={products?.data?.totalItems}
        headTitle={lang.product.list.title}
        right={() => (
          <Fragment>
            <Space>
              <Button ghost color="blue" loading={isLoading} onClick={handleExport}>
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
        products={products}
        isLoading={isFetching}
        isError={isError}
        apiQuery={apiQuery}
        setApiQuery={setApiQuery}
        handleReFetch={handleReFetch}
        handleResetFilter={handleResetFilter}
      />
    </Fragment>
  );
};

export default Products;
