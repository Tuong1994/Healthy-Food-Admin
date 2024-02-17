import { Dispatch, FC, SetStateAction, useState, useEffect } from "react";
import { Card, Space, Divider, Image, Modal, Pagination, Loading, Typography, Empty } from "@/components/UI";
import { Input } from "@/components/Control";
import type { ModalProps } from "@/components/UI/Modal";
import type { OrderItem } from "@/services/order/type";
import type { Product } from "@/services/product/type";
import type { ApiQuery } from "@/services/type";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useLang } from "@/hooks";
import Error from "@/components/Page/Error";
import useDebounce from "@/hooks/features/useDebounce";
import useGetProductsOptions from "@/features/order/hooks/useGetProductsOptions";
import utils from "@/utils";

const { Paragraph } = Typography;

const { Spinner } = Loading;

type SelectedProduct = Pick<Product, "id" | "name" | "image" | "totalPrice">;

interface SelectProductModalProps extends ModalProps {
  isUpdate: boolean;
  selectedItems: OrderItem[];
  setSelectedItems: Dispatch<SetStateAction<OrderItem[]>>;
}

const SelectProductModal: FC<SelectProductModalProps> = ({
  isUpdate,
  selectedItems,
  setSelectedItems,
  onCancel,
  ...restProps
}) => {
  const { lang, locale } = useLang();

  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);

  const [apiQuery, setApiQuery] = useState<ApiQuery>({
    page: 1,
    limit: 10,
    keywords: "",
  });

  const debounce = useDebounce(apiQuery.keywords as string);

  const { data: response, isFetching, isError } = useGetProductsOptions({ ...apiQuery, keywords: debounce });

  const onSetDefaultData = () => {
    if (!isUpdate) return;
    const products: SelectedProduct[] = selectedItems.map((item) => ({
      ...(item.product as SelectedProduct),
    }));
    setSelectedProducts([...products]);
  };

  const onUnSelectProduct = () => {
    const filterProducts = [...selectedProducts].filter(
      (product) => selectedItems.findIndex((item) => item.productId === product.id) > -1
    );
    setSelectedProducts([...filterProducts]);
  };

  useEffect(() => onUnSelectProduct(), [selectedItems.length]);

  useEffect(() => onSetDefaultData(), [isUpdate, selectedItems.length]);

  const handleChangePage = (page: number) => setApiQuery((prev) => ({ ...prev, page }));

  const handleSearch = (text: string) => setApiQuery((prev) => ({ ...prev, keywords: text }));

  const handleCloseModal = () => {
    setApiQuery({ page: 1, limit: 10, keywords: "" });
    onCancel?.();
  };

  const handleSelect = (product: Product) => {
    let products = [...selectedProducts];
    const idx = selectedProducts.findIndex((item) => item.id === product.id);
    if (idx !== -1) products = [...products].filter((item) => item.id !== product.id);
    else products = [...products, product];
    setSelectedProducts(products);
  };

  const handleFinish = () => {
    const items: OrderItem[] = selectedProducts.map((product) => {
      const item = selectedItems.find((item) => item.productId === product.id);
      return {
        id: item ? item.id : "",
        productId: product.id ?? "",
        quantity: item ? item.quantity : 1,
        orderId: item ? item.orderId : "",
        product,
      };
    });
    setSelectedItems([...items]);
    handleCloseModal();
  };

  const renderProducts = () => {
    if (isFetching)
      return (
        <div className="list-product-loading">
          <Spinner size={16} />
        </div>
      );
    if (!response) return <Error />;
    if (isError) return <Error />;
    const { data } = response;
    if (!data.items?.length) return <Empty />;
    return data?.items?.map((product) => {
      const idx = selectedProducts.findIndex((item) => item.id === product.id);
      const selectedClassName = idx !== -1 ? "product-content-selected" : "";
      return (
        <Card
          hoverable
          key={product.id}
          rootClassName="list-product"
          bodyClassName={utils.formatClassName("product-content", selectedClassName)}
          onClick={() => handleSelect(product)}
        >
          <Space size={15}>
            <Image imgWidth={50} imgHeight={50} />
            <div className="content-text">
              <Paragraph>{product.name}</Paragraph>
              <Paragraph size={16} weight={600} variant="success">
                {utils.formatPrice(locale, product.totalPrice)}
              </Paragraph>
            </div>
          </Space>
        </Card>
      );
    });
  };

  const modalDefaultProps: ModalProps = {
    color: "green",
    sizes: "sm",
    rootClassName: "select-product-modal",
    head: lang.order.form.select,
    cancelButtonProps: { ghost: true, color: "green" },
    onOk: handleFinish,
    onCancel: handleCloseModal,
    ...restProps,
  };

  return (
    <Modal {...modalDefaultProps}>
      <Input
        color="green"
        placeholder={lang.common.form.placeholder.search}
        addonAfter={<HiMagnifyingGlass />}
        onChangeInput={handleSearch}
      />
      <Divider />
      <div className="modal-list">{renderProducts()}</div>
      <Pagination
        simple
        ghost
        color="green"
        total={response?.data?.totalItems ?? 0}
        onChangePage={handleChangePage}
      />
    </Modal>
  );
};

export default SelectProductModal;
