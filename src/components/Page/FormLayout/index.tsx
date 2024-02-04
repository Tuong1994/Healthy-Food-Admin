import { ReactNode } from "react";
import ContentHeader, { type ContentHeaderProps } from "../ContentHeader";
import { Grid } from "@/components/UI";
import { Form } from "@/components/Control";
import type { FormProps } from "@/components/Control/Form";
import type { GridRowProps } from "@/components/UI/Grid/Row";
import type { GridColProps } from "@/components/UI/Grid/Col";
import FormLayoutLoading from "./Loading";

const { Row, Col } = Grid;

interface FormLayoutProps<M> extends FormProps<M> {
  loading?: boolean;
  submitting?: boolean;
  headerProps?: ContentHeaderProps;
  rowProps?: GridRowProps;
  leftSpanProps?: GridColProps;
  rightSpanProps?: GridColProps;
  leftItems?: ReactNode;
  rightItems?: ReactNode;
}

const FormLayout = <M extends object>({
  loading,
  submitting,
  headerProps,
  rowProps,
  leftSpanProps,
  rightSpanProps,
  leftItems,
  rightItems,
  ...restProps
}: FormLayoutProps<M>) => {
  const headerDefaultProps: ContentHeaderProps = { hasTotal: false, ...headerProps };

  const formDefaultProps: FormProps<M> = { color: "green", disabled: submitting, ...restProps };

  const rowDefaultProps: GridRowProps = { ...rowProps };

  const leftSpanDefaultProps: GridColProps = { xs: 24, md: 24, lg: 24, span: 14, ...leftSpanProps };

  const rightSpanDefaultProps: GridColProps = { xs: 24, md: 24, lg: 24, span: 10, ...rightSpanProps };

  const renderContent = () => {
    if (loading) return <FormLayoutLoading />;
    return (
      <Row {...rowDefaultProps}>
        <Col {...leftSpanDefaultProps}>{leftItems}</Col>
        <Col {...rightSpanDefaultProps}>{rightItems}</Col>
      </Row>
    );
  };

  return (
    <Form<M> {...formDefaultProps}>
      <ContentHeader {...headerDefaultProps} />
      {renderContent()}
    </Form>
  );
};

export default FormLayout;
