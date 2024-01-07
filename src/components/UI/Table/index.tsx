import React from "react";
import { ButtonProps } from "../Button";
import { ComponentColor } from "@/common/type";
import { Columns } from "./type";
import Pagination, { PaginationProps } from "../Pagination";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import TableEmpty from "./TableEmpty";
import TableLoading from "./TableLoading";
import utils from "@/utils";
import useLayout from "../Layout/useLayout";
import TableFilter from "./TableFilter";

export type TableColor = Exclude<ComponentColor, "black" | "white" | "red" | "gray">;

export interface TableProps<M> extends React.TableHTMLAttributes<HTMLTableElement> {
  rootClassName?: string;
  style?: React.CSSProperties;
  rowKey?: React.Key;
  dataSource: M[];
  columns: Columns<M>;
  color?: TableColor;
  loading?: boolean;
  hasFilter?: boolean;
  hasRowSelection?: boolean;
  hasRowExpand?: boolean;
  hasPagination?: boolean;
  removeButtonTitle?: React.ReactNode | React.ReactNode[];
  cancelButtonTitle?: React.ReactNode | React.ReactNode[];
  filter?: React.ReactNode | React.ReactNode[];
  removeButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  paginationProps?: PaginationProps;
  onFilter?: () => void;
  onCancelFilter?: () => void;
  onSelectRows?: (keys: React.Key[]) => void;
  onChangePage?: (page: number) => void;
  expandRowTable?: (data: M) => React.ReactNode | null;
}

const Table = <M extends object>(
  {
    rootClassName = "",
    style,
    dataSource = [],
    columns = [],
    rowKey,
    color = "blue",
    loading,
    filter,
    hasFilter = false,
    hasRowSelection = false,
    hasRowExpand = false,
    hasPagination = false,
    removeButtonTitle = "Remove",
    cancelButtonTitle = "Cancel",
    removeButtonProps,
    cancelButtonProps,
    paginationProps,
    onFilter,
    onCancelFilter,
    onSelectRows,
    onChangePage,
    expandRowTable,
    ...restProps
  }: TableProps<M>,
  ref: React.ForwardedRef<HTMLTableElement>
) => {
  const { layoutValue } = useLayout();

  const { layoutTheme: theme } = layoutValue;

  const [rowSelectedKeys, setRowSelectedKeys] = React.useState<React.Key[]>([]);

  const paginationDefaultProps: PaginationProps = {
    color,
    shape: "square",
    rootClassName: "table-pagination",
    onChangePage,
    ...paginationProps,
  };

  const colorClassName = `table-${color}`;

  const themeClassName = `table-${theme}`;

  const mainClassName = utils.formatClassName("table", colorClassName, themeClassName, rootClassName);

  React.useEffect(() => {
    onSelectRows?.(rowSelectedKeys);
  }, [rowSelectedKeys.length]);

  const handleSelectAllRow = () => {
    if (rowSelectedKeys.length === dataSource.length) return setRowSelectedKeys([]);
    setRowSelectedKeys([...dataSource.map((data, idx) => (rowKey ? data[rowKey as keyof M] : `row-${idx}`))]);
  };

  const handleSelectRow = (key: React.Key) => {
    if (rowSelectedKeys.indexOf(key) === -1) return setRowSelectedKeys((prev) => [...prev, key]);
    setRowSelectedKeys((prev) => [...prev].filter((k) => k !== key));
  };

  const handleCancelSelect = () => setRowSelectedKeys([]);

  return (
    <React.Fragment>
      <div style={style} className={mainClassName}>
        {hasFilter && (
          <TableFilter color={color} filter={filter} onFilter={onFilter} onCancelFilter={onCancelFilter} />
        )}

        <div className="table-content">
          <table ref={ref} {...restProps}>
            <TableHead<M>
              columns={columns}
              totalRows={dataSource.length}
              rowSelectedKeys={rowSelectedKeys}
              hasRowExpand={hasRowExpand}
              hasRowSelection={hasRowSelection}
              removeButtonTitle={removeButtonTitle}
              cancelButtonTitle={cancelButtonTitle}
              removeButtonProps={removeButtonProps}
              cancelButtonProps={cancelButtonProps}
              onSelectRow={onSelectRows}
              handleSelectAllRow={handleSelectAllRow}
              handleCancelSelect={handleCancelSelect}
            />

            {dataSource.length > 0 && (
              <TableBody<M>
                rowKey={rowKey}
                dataSource={dataSource}
                columns={columns}
                color={color}
                rowSelectedKeys={rowSelectedKeys}
                hasRowExpand={hasRowExpand}
                hasRowSelection={hasRowSelection}
                handleSelectRow={handleSelectRow}
                expandRowTable={expandRowTable}
              />
            )}
          </table>

          {dataSource.length === 0 && <TableEmpty />}
        </div>

        {loading && <TableLoading />}
      </div>
      {hasPagination && <Pagination {...paginationDefaultProps} />}
    </React.Fragment>
  );
};

export default React.forwardRef(Table);
