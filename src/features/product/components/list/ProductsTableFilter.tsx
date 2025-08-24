import { Dispatch, FC, Fragment, SetStateAction } from "react";
import { Grid } from "@/components/UI";
import { Input, Select } from "@/components/Control";
import { useSelectOption } from "@/hooks";
import type { GridColProps } from "@/components/UI/Grid/Col";
import type { Lang } from "@/common/type";
import type { ApiQuery } from "@/services/type";

const { Col } = Grid;

interface ProductsTableFilterProps {
  lang: Lang;
  apiQuery: ApiQuery;
  setApiQuery: Dispatch<SetStateAction<ApiQuery>>;
}

const ProductsTableFilter: FC<ProductsTableFilterProps> = ({ lang, apiQuery, setApiQuery }) => {
  const options = useSelectOption();

  const { keywords, sortBy, productStatus, productUnit, inventoryStatus } = apiQuery;

  const colProps: GridColProps = {
    xs: 24,
    md: 12,
    lg: 12,
    span: 6,
  };

  return (
    <Fragment>
      <Col {...colProps}>
        <Input
          color="green"
          value={keywords}
          placeholder={lang.product.list.filter.placeholder.search}
          onChangeInput={(text) => setApiQuery((prev) => ({ ...prev, keywords: text }))}
        />
      </Col>
      <Col {...colProps} span={4}>
        <Select
          color="green"
          placeholder={lang.product.list.filter.placeholder.unit}
          defaultValue={productUnit}
          options={options.unit}
          onChangeSelect={(value: any) => setApiQuery((prev) => ({ ...prev, productUnit: value }))}
        />
      </Col>
      <Col {...colProps} span={4}>
        <Select
          color="green"
          placeholder={lang.product.list.filter.placeholder.inventory}
          defaultValue={inventoryStatus}
          options={options.inventoryStatus}
          onChangeSelect={(value: any) => setApiQuery((prev) => ({ ...prev, inventoryStatus: value }))}
        />
      </Col>
      <Col {...colProps} span={4}>
        <Select
          color="green"
          placeholder={lang.product.list.filter.placeholder.status}
          defaultValue={productStatus}
          options={options.recordStatus}
          onChangeSelect={(value: any) => setApiQuery((prev) => ({ ...prev, productStatus: value }))}
        />
      </Col>
      <Col {...colProps} span={3}>
        <Select
          color="green"
          hasClear={false}
          placeholder={lang.common.form.placeholder.sortBy}
          defaultValue={sortBy}
          options={options.sortBy}
          onChangeSelect={(value: any) => setApiQuery((prev) => ({ ...prev, sortBy: value }))}
        />
      </Col>
    </Fragment>
  );
};

export default ProductsTableFilter;
