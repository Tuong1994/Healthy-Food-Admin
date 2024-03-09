import { FC, Fragment, Dispatch, SetStateAction } from "react";
import { Grid } from "@/components/UI";
import { Input, Select } from "@/components/Control";
import { useSelectOption } from "@/hooks";
import type { GridColProps } from "@/components/UI/Grid/Col";
import type { Lang } from "@/common/type";
import type { ApiQuery } from "@/services/type";

const { Col } = Grid;

interface UsersTableFilterProps {
  lang: Lang;
  apiQuery: ApiQuery;
  setApiQuery: Dispatch<SetStateAction<ApiQuery>>;
}

const UsersTableFilter: FC<UsersTableFilterProps> = ({ lang, apiQuery, setApiQuery }) => {
  const options = useSelectOption();

  const { keywords, sortBy, gender, role } = apiQuery;

  const commonProps: GridColProps = {
    xs: 24,
    md: 12,
    lg: 12,
  };

  return (
    <Fragment>
      <Col {...commonProps} span={6}>
        <Input
          sizes="sm"
          color="green"
          value={keywords}
          placeholder={lang.user.list.filter.placeholder.search}
          onChangeInput={(text) => setApiQuery((prev) => ({ ...prev, keywords: text }))}
        />
      </Col>
      <Col {...commonProps} span={4}>
        <Select
          sizes="sm"
          color="green"
          defaultValue={gender}
          options={options.gender}
          placeholder={lang.user.list.filter.placeholder.gender}
          onChangeSelect={(value: any) => setApiQuery((prev) => ({ ...prev, gender: value }))}
        />
      </Col>
      <Col {...commonProps} span={4}>
        <Select
          sizes="sm"
          color="green"
          defaultValue={role}
          options={options.role}
          placeholder={lang.user.list.filter.placeholder.role}
          onChangeSelect={(value: any) => setApiQuery((prev) => ({ ...prev, role: value }))}
        />
      </Col>
      <Col {...commonProps}  span={3}>
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

export default UsersTableFilter;
