import { FC, ReactNode } from "react";
import { UI } from "@/components";
import type { TableColor } from ".";
import type { Lang } from "@/common/type";

const { Space, Button, Grid } = UI;

const { Row, Col } = Grid;

interface TableFilterProps {
  lang: Lang;
  color: TableColor;
  filter?: ReactNode | ReactNode[];
  onFilter?: () => void;
  onCancelFilter?: () => void;
}

const TableFilter: FC<TableFilterProps> = ({ lang, color, filter, onFilter, onCancelFilter }) => {
  return (
    <Row rootClassName="table-filter">
      {filter}
      <Col>
        <Space align="middle">
          <Button sizes="sm" color={color} onClick={onFilter}>
            {lang.common.actions.filter}
          </Button>
          <Button sizes="sm" ghost onClick={onCancelFilter}>
            {lang.common.actions.cancel}
          </Button>
        </Space>
      </Col>
    </Row>
  );
};

export default TableFilter;
