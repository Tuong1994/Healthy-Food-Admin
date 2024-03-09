import { FC } from "react";
import { Card, Grid, Typography } from "@/components/UI";
import { HiChevronRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { linkPaths } from "@/common/constant/url";
import type { Lang } from "@/common/type";

const { USER_SETTING } = linkPaths;

const { Paragraph } = Typography;

const { Row, Col } = Grid;

interface MainSettingUserProps {
  lang: Lang;
}

const MainSettingUser: FC<MainSettingUserProps> = ({ lang }) => {
  return (
    <Card rootClassName="setting-user">
      <Row justify="between" align="middle">
        <Col>
          <Paragraph>{lang.setting.main.user.title}</Paragraph>
        </Col>
        <Col>
          <Link to={USER_SETTING} className="user-action">
            <HiChevronRight size={25} />
          </Link>
        </Col>
      </Row>
    </Card>
  );
};

export default MainSettingUser;
