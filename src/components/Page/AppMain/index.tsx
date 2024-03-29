import { ReactNode, FC, useContext, Fragment } from "react";
import { Section, Space, Divider, Layout } from "@/components/UI";
import { Routes, useNavigate } from "react-router-dom";
import { GridAppContext } from "@/components/UI/Grid/Context";
import { useLang } from "@/hooks";
import Header from "../Header";
import HeaderTranslate from "../Header/HeaderTranslate";
import HeaderAuth from "../Header/HeaderAuth";
import useMenu from "./useMenu";
import AppPath from "./AppPath";

const { Container, Head, Body, Side, Content, Menu } = Layout;

interface AppWrapperProps {
  children?: ReactNode;
}

const AppWrapper: FC<AppWrapperProps> = ({ children }) => {
  const { lang } = useLang();

  const { isPhone } = useContext(GridAppContext);

  const navigate = useNavigate();

  const items = useMenu();

  const handleNavigate = (id: string) => {
    const currentMenu = items.find((item) => item.id === id);
    navigate(currentMenu?.path ?? "");
  };

  return (
    <AppPath>
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
    </AppPath>
  );
};

export default AppWrapper;
