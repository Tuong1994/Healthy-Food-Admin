import React from "react";
import { UI } from "@/components";
import { useLang } from "@/hooks";
import { Link } from "react-router-dom";
import ContentHeader from "@/components/Page/ContentHeader";
import ProductsTable from "./ProductsTable";
import url from "@/common/constant/url";

const { PRODUCT_FORM } = url;

const { Space, Button } = UI;

interface ProductsProps {}

const Products: React.FC<ProductsProps> = () => {
  const { lang } = useLang();

  return (
    <React.Fragment>
      <ContentHeader
        headTitle={lang.product.list.title}
        right={() => (
          <React.Fragment>
            <Space>
              <Button color="blue" ghost>
                {lang.common.actions.export}
              </Button>
              <Link to={PRODUCT_FORM}>
                <Button color="green">{lang.common.actions.create}</Button>
              </Link>
            </Space>
          </React.Fragment>
        )}
      />
      <ProductsTable lang={lang} />
    </React.Fragment>
  );
};

export default Products;
