import React from "react";
import ContentHeader, { type ContentHeaderProps } from "../ContentHeader";
import { UI, Control } from "@/components";
import type { FormProps } from "@/components/Control/Form";
import type { GridRowProps } from "@/components/UI/Grid/Row";
import type { GridColProps } from "@/components/UI/Grid/Col";

const { Grid } = UI;

const { Row, Col } = Grid;

const { Form } = Control;

interface FormLayoutProps<M> extends FormProps<M> {
  headerProps?: ContentHeaderProps;
  rowProps?: GridRowProps;
  leftSpanProps?: GridColProps;
  rightSpanProps?: GridColProps;
  leftItems?: React.ReactNode;
  rightItems?: React.ReactNode;
}

const FormLayout = <M extends object>({
  headerProps,
  rowProps,
  leftSpanProps,
  rightSpanProps,
  leftItems,
  rightItems,
  ...restProps
}: FormLayoutProps<M>) => {
  const formDefaultProps: FormProps<M> = { color: "green", ...restProps };

  const rowDefaultProps: GridRowProps = { ...rowProps };

  const leftSpanDefaultProps: GridColProps = { xs: 24, md: 12, lg: 14, span: 14, ...leftSpanProps };

  const rightSpanDefaultProps: GridColProps = { xs: 24, md: 12, lg: 10, span: 10, ...rightSpanProps };

  return (
    <Form<M> {...formDefaultProps}>
      <ContentHeader {...headerProps} />
      <Row {...rowDefaultProps}>
        <Col {...leftSpanDefaultProps}>{leftItems}</Col>
        <Col {...rightSpanDefaultProps}>{rightItems}</Col>
      </Row>
    </Form>
  );
};

export default FormLayout;
