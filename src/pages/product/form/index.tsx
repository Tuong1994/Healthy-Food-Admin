import { FC, Fragment, useState, useMemo, useEffect } from "react";
import { Breadcrumb, Button } from "@/components/UI";
import type { BreadcrumbItems } from "@/components/UI/Breadcrumb/type";
import type { ContentHeaderProps } from "@/components/Page/ContentHeader";
import type { Product, ProductFormData } from "@/services/product/type";
import { EInventoryStatus, EProductOrigin, EProductStatus, EProductUnit } from "@/services/product/enum";
import { useLang, useHasLocationState } from "@/hooks";
import { Link } from "react-router-dom";
import { linkPaths } from "@/common/constant/url";
import FormLayout from "@/components/Page/FormLayout";
import ProductInfo from "@/features/product/components/form/ProductInfo";
import ProductPrice from "@/features/product/components/form/ProductPrice";
import ProductCategory from "@/features/product/components/form/ProductCategory";
import ProductStorage from "@/features/product/components/form/ProductStorage";
import ProductOthers from "@/features/product/components/form/ProductOthers";
import useGetProduct from "@/features/product/hooks/useGetProduct";
import useCreateProduct from "@/features/product/hooks/useCreateProduct";
import useUpdateProduct from "@/features/product/hooks/useUpdateProduct";

const { PRODUCTS } = linkPaths;

interface ProductProps {}

const Product: FC<ProductProps> = () => {
  const { lang } = useLang();

  const { isUpdate, state } = useHasLocationState();

  const { data: response, isFetching, refetch } = useGetProduct({ productId: state?.id as string }, isUpdate);

  const { mutate: onCreateProduct, isLoading: createLoading } = useCreateProduct();

  const { mutate: onUpdateProduct, isLoading: updateLoading } = useUpdateProduct();

  const [price, setPrice] = useState<number>(0);

  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (isUpdate && response) setPrice(response.data?.totalPrice);
  }, [isUpdate, response]);

  const pageTitle = isUpdate ? lang.product.form.editTitle : lang.product.form.addTitle;

  const isSubmitting = !isUpdate ? createLoading : updateLoading;

  const items: BreadcrumbItems = [
    { id: "1", label: <Link to={PRODUCTS}>{lang.product.list.title}</Link> },
    { id: "2", label: pageTitle, actived: true },
  ];

  const initialData: ProductFormData = useMemo(
    () => ({
      nameEn: response ? response.data?.nameEn : "",
      nameVn: response ? response.data?.nameVn : "",
      costPrice: response ? response.data?.costPrice : 0,
      profit: response ? response.data?.profit : 0,
      totalPrice: response ? response.data?.totalPrice : 0,
      inventory: response ? response.data?.inventory : 0,
      unit: response ? response.data?.unit : EProductUnit.KG,
      status: response ? response.data?.status : EProductStatus.DRAFT,
      origin: response ? response.data?.origin : EProductOrigin.VN,
      inventoryStatus: response ? response.data?.inventoryStatus : EInventoryStatus.OUT_OF_STOCK,
      supplier: response ? response.data?.supplier : "Healthy Food",
      categoryId: response ? response.data?.categoryId : "",
      subCategoryId: response ? response.data?.subCategoryId : "",
    }),
    [response]
  );

  const headerProps: ContentHeaderProps = {
    headTitle: pageTitle,
    right: () =>
      !isFetching && (
        <Button type="submit" loading={isSubmitting}>
          {lang.common.actions[!isUpdate ? "save" : "update"]}
        </Button>
      ),
  };

  const handleUpload = (image: File | null) => setImage(image);

  const handleSubmit = (data: ProductFormData) => {
    const formData = new FormData();
    const prepareData: ProductFormData = { ...data, totalPrice: price };
    if (image) formData.append("image", image);
    for (let [key, value] of Object.entries(prepareData)) {
      formData.append(key, value as string);
    }
    if (!isUpdate) return onCreateProduct(formData);
    const args = { query: { productId: response?.data?.id }, formData };
    onUpdateProduct(args, { onSuccess: () => refetch() });
  };

  const leftItems = (
    <Fragment>
      <ProductInfo lang={lang} product={response?.data} handleUpload={handleUpload} />
      <ProductPrice product={response?.data} price={price} setPrice={setPrice} />
      <ProductCategory lang={lang} product={response?.data} />
    </Fragment>
  );

  const rightItems = (
    <Fragment>
      <ProductStorage lang={lang} product={response?.data} />
      <ProductOthers lang={lang} />
    </Fragment>
  );

  return (
    <Fragment>
      <Breadcrumb items={items} />
      <FormLayout<ProductFormData>
        loading={isFetching}
        submitting={isSubmitting}
        headerProps={headerProps}
        initialData={initialData}
        leftItems={leftItems}
        rightItems={rightItems}
        onFinish={handleSubmit}
      />
    </Fragment>
  );
};

export default Product;
