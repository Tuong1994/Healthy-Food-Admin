import { FC } from "react";
import { Space, Avatar, Image, Dropdown, Grid, Loading } from "@/components/UI";
import type { DropdownItems } from "@/components/UI/Dropdown/type";
import type { Lang } from "@/common/type";
import { HiUser } from "react-icons/hi2";
import { HiLogout } from "react-icons/hi";
import { Link } from "react-router-dom";
import { linkPaths } from "@/common/constant/url";
import useLogout from "@/features/auth/hooks/useLogout";
import useAuthStore from "@/store/AuthStore";

const { CUSTOMER } = linkPaths;

const { Row, Col } = Grid;

const { Spinner } = Loading;

interface HeaderAuthProps {
  lang: Lang;
}

const HeaderAuth: FC<HeaderAuthProps> = ({ lang }) => {
  const { mutate: onLogout, isLoading } = useLogout();

  const auth = useAuthStore((state) => state.auth);

  const { info } = auth;

  const handleLogout = () => onLogout();

  const items: DropdownItems = [
    {
      id: "1",
      label: (
        <Space align="middle">
          <HiUser />
          <Link to={CUSTOMER} state={{ id: info.id, isUser: true }}>
            {lang.pageComponent.header.profile.user}
          </Link>
        </Space>
      ),
    },
    {
      id: "2",
      label: (
        <Space align="middle" onClick={handleLogout}>
          {isLoading ? <Spinner /> : <HiLogout />}
          <span>{lang.pageComponent.header.profile.logout}</span>
        </Space>
      ),
    },
  ];

  return (
    <Row align="middle" justify="end" rootClassName="header-auth">
      <Col>
        <Dropdown items={items} placement="right">
          <Avatar color="green">
            <Image src={info.image?.path} imgWidth="100%" imgHeight="100%" />
          </Avatar>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default HeaderAuth;
