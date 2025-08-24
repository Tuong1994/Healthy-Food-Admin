import { FC, Fragment, Dispatch, SetStateAction } from "react";
import { Grid } from "@/components/UI";
import { Input, Select } from "@/components/Control";
import type { GridColProps } from "@/components/UI/Grid/Col";
import type { Lang } from "@/common/type";
import type { ApiQuery } from "@/services/type";
import { useSelectOption } from "@/hooks";

const { Col } = Grid;

interface ShipmentsTableFilterProps {
  lang: Lang;
  apiQuery: ApiQuery;
  setApiQuery: Dispatch<SetStateAction<ApiQuery>>;
}

const ShipmentsTableFilter: FC<ShipmentsTableFilterProps> = ({ lang, apiQuery, setApiQuery }) => {
  const options = useSelectOption();

  const { keywords, sortBy } = apiQuery;

  const commonProps: GridColProps = {
    xs: 24,
    md: 12,
    lg: 12,
  };

  return (
    <Fragment>
      <Col {...commonProps} span={5}>
        <Input
          color="green"
          value={keywords}
          placeholder={lang.shipment.list.filter.placeholder.search}
          onChangeInput={(text) => setApiQuery((prev) => ({ ...prev, keywords: text }))}
        />
      </Col>
      <Col {...commonProps} span={3}>
        <Select
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

export default ShipmentsTableFilter;
