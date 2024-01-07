import React from "react";
import { UI, Control } from "@/components";
import type { Lang } from "@/common/type";
import { useSelectOption } from "@/hooks";
import { GridColProps } from "@/components/UI/Grid/Col";

const { Card, Typography, Grid } = UI;

const { Row, Col } = Grid;

const { Paragraph } = Typography;

const { FormItem, Input, Select, DatePicker } = Control;

interface CustomerAuthProps {
  lang: Lang;
}

const CustomerAuth: React.FC<CustomerAuthProps> = ({ lang }) => {
  const options = useSelectOption();

  const colProps: GridColProps = {
    xs: 24,
    md: 12,
    lg: 12,
    span: 12,
  };

  return (
    <Card
      head={
        <Paragraph size={16} weight={600}>
          {lang.customer.form.info}
        </Paragraph>
      }
    >
      <Row justify="between">
        <Col {...colProps}>
          <FormItem name="firstName">
            <Input label={lang.common.form.label.firstName} />
          </FormItem>
        </Col>
        <Col {...colProps}>
          <FormItem name="lastName">
            <Input label={lang.common.form.label.lastName} />
          </FormItem>
        </Col>
        <Col {...colProps}>
          <FormItem name="phone">
            <Input label={lang.common.form.label.phone} />
          </FormItem>
        </Col>
        <Col {...colProps}>
          <FormItem name="gender">
            <Select label={lang.common.form.label.gender} options={options.gender} />
          </FormItem>
        </Col>
        <Col {...colProps}>
          <FormItem name="birthday">
            <DatePicker label={lang.common.form.label.birthday} />
          </FormItem>
        </Col>
      </Row>
    </Card>
  );
};

export default CustomerAuth;
