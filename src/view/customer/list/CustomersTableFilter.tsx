import React from "react";
import { UI, Control } from "@/components";

const { Grid } = UI;

const { Row, Col } = Grid;

const { Input, Select } = Control;

interface CustomersTableFilterProps {}

const CustomersTableFilter: React.FC<CustomersTableFilterProps> = () => {
  return (
    <Row justify="between">
      <Col xs={24} md={12} lg={12}>
        <Input sizes="sm" />
      </Col>
      <Col xs={24} md={12} lg={12}>
        <Select sizes="sm" />
      </Col>
      <Col xs={24} md={12} lg={12}>
        <Select sizes="sm" />
      </Col>
      <Col xs={24} md={12} lg={12}>
        <Select sizes="sm" />
      </Col>
    </Row>
  );
};

export default CustomersTableFilter;
