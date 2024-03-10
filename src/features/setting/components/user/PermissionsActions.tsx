import { FC, useState } from "react";
import { Card, Typography, Grid, Switch, Divider } from "@/components/UI";
import type { Lang } from "@/common/type";
import type { PermissionType, UserPermission } from "@/services/setting/type";

const { Paragraph } = Typography;

const { Row, Col } = Grid;

interface PermissionsActionsProps {
  lang: Lang;
  permission: UserPermission;
  onSetPermission: (permission: UserPermission) => void;
}

const PermissionsActions: FC<PermissionsActionsProps> = ({ lang, permission, onSetPermission }) => {
  const [userPermission, setUserPermission] = useState<UserPermission>(permission);

  const handleSetPermission = (type: PermissionType, checked: boolean) => {
    const permission = { ...userPermission };
    switch (type) {
      case "create": {
        permission.create = checked;
        break;
      }
      case "update": {
        permission.update = checked;
        break;
      }
      case "remove": {
        permission.remove = checked;
        break;
      }
    }
    setUserPermission(permission);
    onSetPermission(permission);
  };

  return (
    <Card>
      <Row align="middle" justify="between">
        <Col>
          <Paragraph>{lang.setting.user.settingLabel.create}</Paragraph>
        </Col>
        <Col>
          <Switch
            color="green"
            checked={userPermission.create}
            onSwitch={(checked) => handleSetPermission("create", checked)}
          />
        </Col>
      </Row>
      <Divider />
      <Row align="middle" justify="between">
        <Col>
          <Paragraph>{lang.setting.user.settingLabel.update}</Paragraph>
        </Col>
        <Col>
          <Switch
            color="green"
            checked={userPermission.update}
            onSwitch={(checked) => handleSetPermission("update", checked)}
          />
        </Col>
      </Row>
      <Divider />
      <Row align="middle" justify="between">
        <Col>
          <Paragraph>{lang.setting.user.settingLabel.remove}</Paragraph>
        </Col>
        <Col>
          <Switch
            color="green"
            checked={userPermission.remove}
            onSwitch={(checked) => handleSetPermission("remove", checked)}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default PermissionsActions;
