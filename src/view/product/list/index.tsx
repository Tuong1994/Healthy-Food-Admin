import { FC, Fragment } from "react";
import { Space, Button } from "@/components/UI";
import { useLang } from "@/hooks";
import { Link } from "react-router-dom";
import { linkPaths } from "@/common/constant/url";
import ContentHeader from "@/components/Page/ContentHeader";
import ProductsTable from "./ProductsTable";

const { PRODUCT } = linkPaths;

interface ProductsProps {}

const Products: FC<ProductsProps> = () => {
  const { lang } = useLang();

  return (
    <Fragment>
      <ContentHeader
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
      <ProductsTable lang={lang} />
    </Fragment>
  );
};

export default Products;
