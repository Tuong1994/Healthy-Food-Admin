import { FC, Fragment } from "react";
import { Breadcrumb, Button } from "@/components/UI";
import type { BreadcrumbItems } from "@/components/UI/Breadcrumb/type";
import type { ContentHeaderProps } from "@/components/Page/ContentHeader";
import type { Product } from "@/services/product/type";
import { EInventoryStatus, EProductOrigin, EProductStatus, EProductUnit } from "@/services/product/enum";
import { useLang, useHasLocationState } from "@/hooks";
import { Link } from "react-router-dom";
import { linkPaths } from "@/common/constant/url";
import FormLayout from "@/components/Page/FormLayout";
import ProductInfo from "./ProductInfo";
import ProductPrice from "./ProductPrice";
import ProductCategory from "./ProductCategory";
import ProductStorage from "./ProductStorage";
import ProductOthers from "./ProductOthers";

const { PRODUCTS } = linkPaths;

interface ProductProps {}

const Product: FC<ProductProps> = () => {
  const { lang } = useLang();

  const { isUpdate } = useHasLocationState();

  const pageTitle = isUpdate ? lang.product.form.editTitle : lang.product.form.addTitle;

  const items: BreadcrumbItems = [
    { id: "1", label: <Link to={PRODUCTS}>{lang.product.list.title}</Link> },
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
    <Fragment>
      <ProductInfo lang={lang} />
      <ProductPrice lang={lang} />
      <ProductCategory lang={lang} />
    </Fragment>
  );

  const rightItems = (
    <Fragment>
      <ProductStorage lang={lang} />
      <ProductOthers lang={lang} />
    </Fragment>
  );

  return (
    <Fragment>
      <Breadcrumb items={items} />
      <FormLayout<Product>
        headerProps={headerProps}
        initialData={initialData}
        leftItems={leftItems}
        rightItems={rightItems}
      />
    </Fragment>
  );
};

export default Product;
