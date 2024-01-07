import React from "react";
import { UI } from "@/components";
import type { TableColor } from ".";
import type { Lang } from "@/common/type";

const { Space, Button, Grid } = UI;

const { Row, Col } = Grid;

interface TableFilterProps {
  lang: Lang;
  color: TableColor;
  filter?: React.ReactNode | React.ReactNode[];
  onFilter?: () => void;
  onCancelFilter?: () => void;
}

const TableFilter: React.FC<TableFilterProps> = ({ color, filter, onFilter, onCancelFilter }) => {
  return (
    <Row rootClassName="table-filter">
      {filter}
      <Col>
        <Space align="middle">
          <Button sizes="sm" color={color} onClick={onFilter}>
            Save
          </Button>
          <Button sizes="sm" ghost onClick={onCancelFilter}>
            Cancel
          </Button>
        </Space>
      </Col>
    </Row>
  );
};

export default TableFilter;
