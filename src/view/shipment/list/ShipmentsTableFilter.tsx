import React from "react";
import { UI, Control } from "@/components";
import type { GridColProps } from "@/components/UI/Grid/Col";

const { Grid } = UI;

const { Col } = Grid;

const { Input, Select } = Control;

interface ShipmentsTableFilterProps {}

const ShipmentsTableFilter: React.FC<ShipmentsTableFilterProps> = () => {
  const commonProps: GridColProps = {
    xs: 24,
    md: 12,
    lg: 12,
  };

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default ShipmentsTableFilter;
