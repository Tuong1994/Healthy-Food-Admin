import { FC } from "react";
import { Space, Grid } from "@/components/UI";
import { Link } from "react-router-dom";
import { HiBars3 } from "react-icons/hi2";
import { useLang } from "@/hooks";
import Logo from "@/components/Page/Logo";
import HeaderAuth from "./HeaderAuth";
import HeaderTranslate from "./HeaderTranslate";
import HeaderTheme from "./HeaderTheme";
import useLayout from "@/components/UI/Layout/useLayout";
import url from "@/common/constant/url";

const { DASHBOARD } = url;

const { Row, Col } = Grid;

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const { lang } = useLang();

  const { layoutApi } = useLayout();

  return (
    <Row align="middle" justify="between" rootClassName="header">
      <Col xs={12} md={8} span={18}>
        <Link to={DASHBOARD}>
          <Logo />
        </Link>
      </Col>

      <Col md={6}>
        <HeaderTheme />
      </Col>

      <Col xs={0} md={7}>
        <Space size="md" align="middle">
          <HeaderTranslate />
          <HeaderAuth lang={lang} />
        </Space>
      </Col>

      <Col xs={2} md={2} lg={0} span={0}>
        <button type="button" className="header-mobile-btn" onClick={layoutApi.onShowSide}>
          <HiBars3 size={18} />
        </button>
      </Col>
    </Row>
  );
};

export default Header;
