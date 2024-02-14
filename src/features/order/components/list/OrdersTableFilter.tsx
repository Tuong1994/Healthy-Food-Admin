import { FC, Fragment, Dispatch, SetStateAction } from "react";
import { Grid } from "@/components/UI";
import { Input, Select } from "@/components/Control";
import { useSelectOption } from "@/hooks";
import type { Lang } from "@/common/type";
import type { ApiQuery } from "@/services/type";
import type { GridColProps } from "@/components/UI/Grid/Col";

const { Col } = Grid;

interface OrdersTableFilterProps {
  lang: Lang;
  apiQuery: ApiQuery;
  setApiQuery: Dispatch<SetStateAction<ApiQuery>>;
}

const OrdersTableFilter: FC<OrdersTableFilterProps> = ({ lang, apiQuery, setApiQuery }) => {
  const options = useSelectOption();

  const { keywords, orderStatus, paymentMethod, paymentStatus, sortBy } = apiQuery;

  const commonProps: GridColProps = {
    xs: 24,
    md: 12,
    lg: 12,
  };

  return (
    <Fragment>
      <Col {...commonProps}>
        <Input
          sizes="sm"
          color="green"
          value={keywords}
          placeholder={lang.order.list.filter.placeholder.search}
          onChangeInput={(text) => setApiQuery((prev) => ({ ...prev, keywords: text }))}
        />
      </Col>
      <Col {...commonProps} span={4}>
        <Select
          sizes="sm"
          color="green"
          defaultValue={orderStatus}
          options={options.orderStatus}
          placeholder={lang.order.list.filter.placeholder.status}
          onChangeSelect={(value: any) => setApiQuery((prev) => ({ ...prev, orderStatus: value }))}
        />
      </Col>
      <Col {...commonProps} span={5}>
        <Select
          sizes="sm"
          color="green"
          defaultValue={paymentMethod}
          options={options.paymentMethod}
          placeholder={lang.order.list.filter.placeholder.paymentMethod}
          onChangeSelect={(value: any) => setApiQuery((prev) => ({ ...prev, paymentMethod: value }))}
        />
      </Col>
      <Col {...commonProps} span={5}>
        <Select
          sizes="sm"
          color="green"
          defaultValue={paymentStatus}
          options={options.paymentStatus}
          placeholder={lang.order.list.filter.placeholder.paymentStatus}
          onChangeSelect={(value: any) => setApiQuery((prev) => ({ ...prev, paymentStatus: value }))}
        />
      </Col>
      <Col {...commonProps} span={3}>
        <Select
          sizes="sm"
          color="green"
          hasClear={false}
          defaultValue={sortBy}
          options={options.sortBy}
          placeholder={lang.common.form.placeholder.sortBy}
          onChangeSelect={(value: any) => setApiQuery((prev) => ({ ...prev, sortBy: value }))}
        />
      </Col>
    </Fragment>
  );
};

export default OrdersTableFilter;
