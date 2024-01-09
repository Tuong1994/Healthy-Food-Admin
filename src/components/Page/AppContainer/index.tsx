import React from "react";
import Header from "../Header";
import { UI } from "@/components";
import { useLang } from "@/hooks";
import { BrowserRouter as Router, Routes, Link } from "react-router-dom";
import { MenuItems } from "@/components/UI/Layout/Menu/type";
import { GridAppContext } from "@/components/UI/Grid/Context";
import { HiChartBar, HiInbox, HiListBullet, HiShoppingCart, HiTruck, HiUser } from "react-icons/hi2";
import HeaderTranslate from "../Header/HeaderTranslate";
import HeaderAuth from "../Header/HeaderAuth";
import useLayout from "@/components/UI/Layout/useLayout";
import url from "@/common/constant/url";

const { DASHBOARD, PRODUCT_LIST, CUSTOMER_LIST, ORDER_LIST, SHIPMENT_LIST, CATEGORY } = url;

const { Section, Space, Divider, Layout } = UI;

const { Container, Head, Body, Side, Content, Menu } = Layout;

const ICON_SIZE = 18;

interface AppContainerProps {
  children?: React.ReactNode;
}

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
  const { lang } = useLang();

  const { layoutApi } = useLayout();

  const { isPhone } = React.useContext(GridAppContext);

  const handleHideSide = () => layoutApi.onHideSide();

  const items: MenuItems = [
    {
      id: "dashboard",
      label: (
        <Link to={DASHBOARD} onClick={handleHideSide}>
          {lang.common.menu.dashboard}
        </Link>
      ),
      icon: <HiChartBar size={ICON_SIZE} />,
      isRoot: true,
    },
    {
      id: "customer",
      label: (
        <Link to={CUSTOMER_LIST} onClick={handleHideSide}>
          {lang.common.menu.customer}
        </Link>
      ),
      icon: <HiUser size={ICON_SIZE} />,
      isRoot: true,
    },
    {
      id: "category",
      label: (
        <Link to={CATEGORY} onClick={handleHideSide}>
          {lang.common.menu.category}
        </Link>
      ),
      icon: <HiListBullet size={ICON_SIZE} />,
      isRoot: true,
    },
    {
      id: "product",
      label: (
        <Link to={PRODUCT_LIST} onClick={handleHideSide}>
          {lang.common.menu.product}
        </Link>
      ),
      icon: <HiInbox size={ICON_SIZE} />,
      isRoot: true,
    },
    {
      id: "order",
      label: (
        <Link to={ORDER_LIST} onClick={handleHideSide}>
          {lang.common.menu.order}
        </Link>
      ),
      icon: <HiShoppingCart size={ICON_SIZE} />,
      isRoot: true,
    },
    {
      id: "shipment",
      label: (
        <Link to={SHIPMENT_LIST} onClick={handleHideSide}>
          {lang.common.menu.shipment}
        </Link>
      ),
      icon: <HiTruck size={ICON_SIZE} />,
      isRoot: true,
    },
  ];

  return (
    <Router>
      <Container theme="light" color="green">
        <Head>
          <Header />
        </Head>
        <Body>
          <Side hasCollapseButton={false} collapsable>
            {isPhone && (
              <React.Fragment>
                <Space align="middle" justify="end" size="md" style={{ padding: "0 10px" }}>
                  <HeaderTranslate />
                  <HeaderAuth lang={lang} />
                </Space>

                <Divider />
              </React.Fragment>
            )}

            <Menu defaultActiveId={["dashboard"]} type="vertical" items={items} />
          </Side>
          <Content>
            <Section>
              <Routes>{children}</Routes>
            </Section>
          </Content>
        </Body>
      </Container>
    </Router>
  );
};

export default AppContainer;
