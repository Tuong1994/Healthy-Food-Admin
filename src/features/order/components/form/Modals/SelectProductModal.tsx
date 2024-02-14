import { FC, useState } from "react";
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

interface SelectProductModalProps extends ModalProps {
  onSelect: (items: OrderItem[]) => void;
}

const SelectProductModal: FC<SelectProductModalProps> = ({ onSelect, onCancel, ...restProps }) => {
  const { lang, locale } = useLang();

  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const [apiQuery, setApiQuery] = useState<ApiQuery>({
    page: 1,
    limit: 10,
    keywords: "",
  });

  const debounce = useDebounce(apiQuery.keywords as string);

  const { data: response, isFetching, isError } = useGetProductsOptions({ ...apiQuery, keywords: debounce });

  const handleChangePage = (page: number) => setApiQuery((prev) => ({ ...prev, page }));

  const handleSearch = (text: string) => setApiQuery((prev) => ({ ...prev, keywords: text }));

  const handleSelect = (product: Product) => {
    let products = [...selectedProducts];
    const idx = selectedProducts.findIndex((item) => item.id === product.id);
    if (idx !== -1) products = [...products].filter((item) => item.id !== product.id);
    else products = [...products, product];
    setSelectedProducts(products);
  };

  const handleFinish = () => {
    const items: OrderItem[] = selectedProducts.map((product) => ({
      productId: product.id as string,
      quantity: 1,
      orderId: "",
      product,
    }));
    onSelect(items);
    onCancel?.();
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
    onCancel,
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
