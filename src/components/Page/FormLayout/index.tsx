import { ReactNode } from "react";
import ContentHeader, { type ContentHeaderProps } from "../ContentHeader";
import { Grid } from "@/components/UI";
import { Form } from "@/components/Control";
import type { FormProps } from "@/components/Control/Form";
import type { GridRowProps } from "@/components/UI/Grid/Row";
import type { GridColProps } from "@/components/UI/Grid/Col";

const { Row, Col } = Grid;

interface FormLayoutProps<M> extends FormProps<M> {
  headerProps?: ContentHeaderProps;
  rowProps?: GridRowProps;
  leftSpanProps?: GridColProps;
  rightSpanProps?: GridColProps;
  leftItems?: ReactNode;
  rightItems?: ReactNode;
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
  const headerDefaultProps: ContentHeaderProps = { hasTotal: false, ...headerProps };

  const formDefaultProps: FormProps<M> = { color: "green", ...restProps };

  const rowDefaultProps: GridRowProps = { ...rowProps };

  const leftSpanDefaultProps: GridColProps = { xs: 24, md: 24, lg: 24, span: 14, ...leftSpanProps };

  const rightSpanDefaultProps: GridColProps = { xs: 24, md: 24, lg: 24, span: 10, ...rightSpanProps };

  return (
    <Form<M> {...formDefaultProps}>
      <ContentHeader {...headerDefaultProps} />
      <Row {...rowDefaultProps}>
        <Col {...leftSpanDefaultProps}>{leftItems}</Col>
        <Col {...rightSpanDefaultProps}>{rightItems}</Col>
      </Row>
    </Form>
  );
};

export default FormLayout;
