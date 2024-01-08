import React from "react";
import { UI } from "@/components";
import { useLang, useHasLocationState } from "@/hooks";
import { Link } from "react-router-dom";
import type { BreadcrumbItems } from "@/components/UI/Breadcrumb/type";
import type { ContentHeaderProps } from "@/components/Page/ContentHeader";
import type { Product } from "@/services/product/type";
import { EInventoryStatus, EProductOrigin, EProductStatus, EProductUnit } from "@/services/product/enum";
import FormLayout from "@/components/Page/FormLayout";
import ProductInfo from "./ProductInfo";
import ProductPrice from "./ProductPrice";
import ProductCategory from "./ProductCategory";
import ProductStorage from "./ProductStorage";
import ProductOthers from "./ProductOthers";
import url from "@/common/constant/url";

const { PRODUCT_LIST } = url;

const { Breadcrumb, Button } = UI;

interface ProductProps {}

const Product: React.FC<ProductProps> = () => {
  const { lang } = useLang();

  const isUpdate = useHasLocationState();

  const pageTitle = isUpdate ? lang.product.form.editTitle : lang.product.form.addTitle;

  const items: BreadcrumbItems = [
    { id: "1", label: <Link to={PRODUCT_LIST}>{lang.product.list.title}</Link> },
    { id: "2", label: pageTitle, actived: true },
  ];

  const initialData: Product = {
    nameEn: "",
    nameVn: "",
    costPrice: 0,
    profit: 0,
    totalPrice: 0,
    inventory: 0,
    unit: EProductUnit.KG,
    status: EProductStatus.DRAFT,
    inventoryStatus: EInventoryStatus.OUT_OF_STOCK,
    origin: EProductOrigin.VN,
    supplier: "",
    categoryId: "",
    subCategoryId: "",
    isNew: true,
  };

  const headerProps: ContentHeaderProps = {
    headTitle: pageTitle,
    right: () => <Button>{lang.common.actions.save}</Button>,
  };

  const leftItems = (
    <React.Fragment>
      <ProductInfo lang={lang} />
      <ProductPrice lang={lang} />
      <ProductCategory lang={lang} />
    </React.Fragment>
  );

  const rightItems = (
    <React.Fragment>
      <ProductStorage lang={lang} />
      <ProductOthers lang={lang} />
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Breadcrumb items={items} />
      <FormLayout<Product>
        headerProps={headerProps}
        initialData={initialData}
        leftItems={leftItems}
        rightItems={rightItems}
      />
    </React.Fragment>
  );
};

export default Product;
