import { FC, useState } from "react";
import { Card, Typography, Grid, Switch, Divider, InfoRow } from "@/components/UI";
import { HiBookmark, HiCalendar, HiPhone, HiUser } from "react-icons/hi2";
import { FaTransgender } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { EGender, ERole } from "@/services/user/enum";
import type { Lang } from "@/common/type";
import type { PermissionType, UserPermission } from "@/services/setting/type";
import type { InfoRowProps } from "@/components/UI/InfoRow";
import Error from "@/components/Page/Error";
import getDisplayGender from "@/features/user/data-display/getDisplayGender";
import getDisplayRole from "@/features/user/data-display/getDisplayRole";
import moment from "moment";

const { Paragraph } = Typography;

const { Row, Col } = Grid;

interface PermissionsActionsProps {
  lang: Lang;
  permission: UserPermission;
  onSetPermission: (permission: UserPermission) => void;
}

const PermissionsActions: FC<PermissionsActionsProps> = ({ lang, permission, onSetPermission }) => {
  const [staffPermission, setStaffPermission] = useState<UserPermission>(permission);

  const handleSetPermission = (type: PermissionType, checked: boolean) => {
    const permission = { ...staffPermission };
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
    setStaffPermission(permission);
    onSetPermission(permission);
  };

  const renderStaffInfo = () => {
    const { user } = staffPermission;
    if (!user) return <Error />;
    const { fullName, phone, email, gender, birthday, role } = user;
    const commonProps: InfoRowProps = {
      hasColon: true,
      labelSpanProps: { xs: 2, md: 2, lg: 2, span: 2 },
    };
    return (
      <Card>
        <InfoRow {...commonProps} labelElement={<HiUser />} text={fullName} />
        <InfoRow {...commonProps} labelElement={<HiPhone />} text={phone} />
        <InfoRow {...commonProps} labelElement={<HiMail />} text={email} />
        <InfoRow
          {...commonProps}
          labelElement={<FaTransgender />}
          textElement={getDisplayGender(lang, gender as EGender)}
        />
        <InfoRow
          {...commonProps}
          labelElement={<HiCalendar />}
          text={moment(birthday).format("DD/MM/YYYY")}
        />
        <InfoRow
          {...commonProps}
          labelElement={<HiBookmark />}
          textElement={getDisplayRole(lang, role as ERole)}
        />
      </Card>
    );
  };

  return (
    <Row>
      <Col xs={24} md={24} lg={24} span={10}>
        {renderStaffInfo()}
      </Col>
      <Col xs={24} md={24} lg={24} span={14}>
        <Card>
          <Row align="middle" justify="between">
            <Col>
              <Paragraph>{lang.setting.staff.settingLabel.create}</Paragraph>
            </Col>
            <Col>
              <Switch
                color="green"
                checked={staffPermission.create}
                onSwitch={(checked) => handleSetPermission("create", checked)}
              />
            </Col>
          </Row>
          <Divider />
          <Row align="middle" justify="between">
            <Col>
              <Paragraph>{lang.setting.staff.settingLabel.update}</Paragraph>
            </Col>
            <Col>
              <Switch
                color="green"
                checked={staffPermission.update}
                onSwitch={(checked) => handleSetPermission("update", checked)}
              />
            </Col>
          </Row>
          <Divider />
          <Row align="middle" justify="between">
            <Col>
              <Paragraph>{lang.setting.staff.settingLabel.remove}</Paragraph>
            </Col>
            <Col>
              <Switch
                color="green"
                checked={staffPermission.remove}
                onSwitch={(checked) => handleSetPermission("remove", checked)}
              />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default PermissionsActions;
