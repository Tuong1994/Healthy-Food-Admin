import { FC, Fragment, Dispatch, SetStateAction } from "react";
import { Grid } from "@/components/UI";
import { Input, Select } from "@/components/Control";
import type { Lang } from "@/common/type";
import type { ApiQuery } from "@/services/type";
import type { GridColProps } from "@/components/UI/Grid/Col";
import { useSelectOption } from "@/hooks";

const { Col } = Grid;

interface SubCategoriesTableFilterProps {
  lang: Lang;
  apiQuery: ApiQuery;
  setApiQuery: Dispatch<SetStateAction<ApiQuery>>;
}

const SubCategoriesTableFilter: FC<SubCategoriesTableFilterProps> = ({ lang, apiQuery, setApiQuery }) => {
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
          sizes="sm"
          color="green"
          value={keywords}
          placeholder={lang.category.filter.placeholder.search}
          onChangeInput={(text) => setApiQuery((prev) => ({ ...prev, keywords: text }))}
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

export default SubCategoriesTableFilter;
