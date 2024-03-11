import { FC } from "react";
import { Card, Grid, Typography } from "@/components/UI";
import { HiChevronRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { linkPaths } from "@/common/constant/url";
import type { Lang } from "@/common/type";

const { STAFF_SETTING } = linkPaths;

const { Paragraph } = Typography;

const { Row, Col } = Grid;

interface MainSettingStaffProps {
  lang: Lang;
}

const MainSettingStaff: FC<MainSettingStaffProps> = ({ lang }) => {
  return (
    <Card rootClassName="setting-staff">
      <Row justify="between" align="middle">
        <Col>
          <Paragraph>{lang.setting.main.staff.title}</Paragraph>
        </Col>
        <Col>
          <Link to={STAFF_SETTING} className="staff-action">
            <HiChevronRight size={25} />
          </Link>
        </Col>
      </Row>
    </Card>
  );
};

export default MainSettingStaff;
