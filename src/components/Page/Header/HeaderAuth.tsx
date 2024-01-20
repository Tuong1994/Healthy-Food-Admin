import { FC } from "react";
import { Space, Avatar, Dropdown, Grid } from "@/components/UI";
import type { DropdownItems } from "@/components/UI/Dropdown/type";
import type { Lang } from "@/common/type";
import { HiUser } from "react-icons/hi2";
import { HiLogout } from "react-icons/hi";
import { Link } from "react-router-dom";
import url from "@/common/constant/url";

const { CUSTOMER_FORM } = url;

const { Row, Col } = Grid;

interface HeaderAuthProps {
  lang: Lang;
}

const HeaderAuth: FC<HeaderAuthProps> = ({ lang }) => {
  const items: DropdownItems = [
    {
      id: "1",
      label: (
        <Space align="middle">
          <HiUser />
          <Link to={CUSTOMER_FORM} state={{ id: "", isUser: true }}>
            {lang.pageComponent.header.profile.user}
          </Link>
        </Space>
      ),
    },
    {
      id: "2",
      label: (
        <Space align="middle">
          <HiLogout />
          <span>{lang.pageComponent.header.profile.logout}</span>
        </Space>
      ),
    },
  ];

  return (
    <Row align="middle" justify="end" rootClassName="header-auth">
      <Col>
        <Dropdown items={items} placement="right">
          <Avatar color="green" />
        </Dropdown>
      </Col>
    </Row>
  );
};

export default HeaderAuth;
