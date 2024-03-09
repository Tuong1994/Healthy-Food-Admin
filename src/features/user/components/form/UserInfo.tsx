import { FC } from "react";
import { Card, Typography, Grid } from "@/components/UI";
import { FormItem, Input, InputPhone, Select, DatePicker } from "@/components/Control";
import type { Lang } from "@/common/type";
import type { GridColProps } from "@/components/UI/Grid/Col";
import { useRule, useSelectOption } from "@/hooks";

const { Row, Col } = Grid;

const { Paragraph } = Typography;

interface UserInfoProps {
  lang: Lang;
}

const UserInfo: FC<UserInfoProps> = ({ lang }) => {
  const options = useSelectOption();

  const { phone } = useRule();

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
          {lang.user.form.info}
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
          <FormItem name="phone" rules={phone()}>
            <InputPhone required label={lang.common.form.label.phone} />
          </FormItem>
        </Col>
        <Col {...colProps}>
          <FormItem name="gender">
            <Select label={lang.common.form.label.gender} options={options.gender} />
          </FormItem>
        </Col>
        <Col {...colProps}>
          <FormItem name="birthday">
            <DatePicker max="today" label={lang.common.form.label.birthday} />
          </FormItem>
        </Col>
      </Row>
    </Card>
  );
};

export default UserInfo;
