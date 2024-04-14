import { ReactNode, FC, useContext, Fragment } from "react";
import { Section, Space, Divider, Layout } from "@/components/UI";
import { Routes, useNavigate } from "react-router-dom";
import { GridAppContext } from "@/components/UI/Grid/Context";
import { useLang } from "@/hooks";
import Header from "../Header";
import HeaderTranslate from "../Header/HeaderTranslate";
import HeaderAuth from "../Header/HeaderAuth";
import AppPath from "./AppPath";
import useMenu from "./useMenu";
import useAuthStore from "@/store/AuthStore";

const { Container, Head, Body, Side, Content, Menu } = Layout;

interface AppMainProps {
  children?: ReactNode;
}

const AppMain: FC<AppMainProps> = ({ children }) => {
  const { lang } = useLang();

  const auth = useAuthStore((state) => state.auth);

  const { isPhone } = useContext(GridAppContext);

  const { isAuth } = auth;

  const navigate = useNavigate();

  const items = useMenu();

  const handleNavigate = (id: string) => {
    const currentMenu = items.find((item) => item.id === id);
    navigate(currentMenu?.path ?? "");
  };

  return (
    <AppPath>
      {isAuth ? (
        <Container theme="light" color="green">
          <Head>
            <Header />
          </Head>
          <Body>
            <Side hasCollapseButton={false} collapsable>
              {isPhone && (
                <Fragment>
                  <Space align="middle" justify="end" size="md" style={{ padding: "0 10px" }}>
                    <HeaderTranslate />
                    <HeaderAuth lang={lang} />
                  </Space>

                  <Divider />
                </Fragment>
              )}

              <Menu
                defaultActiveId={["dashboard"]}
                type="vertical"
                items={items}
                onSelectMenu={handleNavigate}
              />
            </Side>
            <Content>
              <Section>
                <Routes>{children}</Routes>
              </Section>
            </Content>
          </Body>
        </Container>
      ) : (
        <Routes>{children}</Routes>
      )}
    </AppPath>
  );
};

export default AppMain;
