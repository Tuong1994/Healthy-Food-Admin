import { FC, Fragment } from "react";
import { Space, Card, Divider, Typography, Grid, Switch } from "@/components/UI";
import { Select } from "@/components/Control";
import { Lang } from "@/common/type";

const { Row, Col } = Grid;

const { Paragraph } = Typography;

interface UserSettingPermissionsProps {
  lang: Lang;
}

const UserSettingPermissions: FC<UserSettingPermissionsProps> = ({ lang }) => {
  return (
    <Fragment>
      <Space align="middle" size="lg">
        <Paragraph>{lang.setting.user.selectLabel}</Paragraph>
        <Select color="green" />
      </Space>
      <Divider />
      <Row>
        <Col span={16}>
          <Card>
            <Row align="middle" justify="between">
              <Col>
                <Paragraph>{lang.setting.user.settingLabel.create}</Paragraph>
              </Col>
              <Col>
                <Switch color="green" />
              </Col>
            </Row>
            <Divider />
            <Row align="middle" justify="between">
              <Col>
                <Paragraph>{lang.setting.user.settingLabel.update}</Paragraph>
              </Col>
              <Col>
                <Switch color="green" />
              </Col>
            </Row>
            <Divider />
            <Row align="middle" justify="between">
              <Col>
                <Paragraph>{lang.setting.user.settingLabel.remove}</Paragraph>
              </Col>
              <Col>
                <Switch color="green" />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default UserSettingPermissions;
