import { FC, Fragment } from "react";
import { Grid } from "@/components/UI";
import { Input, Select } from "@/components/Control";
import type { GridColProps } from "@/components/UI/Grid/Col";

const { Col } = Grid;

interface CustomersTableFilterProps {}

const CustomersTableFilter: FC<CustomersTableFilterProps> = () => {
  const commonProps: GridColProps = {
    xs: 24,
    md: 12,
    lg: 12,
  };

  return (
    <Fragment>
      <Col {...commonProps}>
        <Input sizes="sm" />
      </Col>
      <Col {...commonProps}>
        <Select sizes="sm" />
      </Col>
      <Col {...commonProps}>
        <Select sizes="sm" />
      </Col>
      <Col {...commonProps}>
        <Select sizes="sm" />
      </Col>
    </Fragment>
  );
};

export default CustomersTableFilter;
