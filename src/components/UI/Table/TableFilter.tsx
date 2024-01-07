import React from "react";
import { UI } from "@/components";
import { TableColor } from ".";

const { Space, Button } = UI;

interface TableFilterProps {
  color: TableColor;
  filter?: React.ReactNode | React.ReactNode[];
  onFilter?: () => void;
  onCancelFilter?: () => void;
}

const TableFilter: React.FC<TableFilterProps> = ({ color, filter, onFilter, onCancelFilter }) => {
  return (
    <div className="table-filter">
      <Space align="middle">
        {filter}
        <Button sizes="sm" color={color} onClick={onFilter}>
          Save
        </Button>
        <Button sizes="sm" ghost onClick={onCancelFilter}>
          Cancel
        </Button>
      </Space>
    </div>
  );
};

export default TableFilter;
