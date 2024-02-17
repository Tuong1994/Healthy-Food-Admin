import { ReactNode, FC, useContext, Fragment, useEffect } from "react";
import { Section, Space, Divider, Layout } from "@/components/UI";
import { Routes, useNavigate } from "react-router-dom";
import { GridAppContext } from "@/components/UI/Grid/Context";
import { routerPaths } from "@/common/constant/url";
import { useLang } from "@/hooks";
import Header from "../Header";
import HeaderTranslate from "../Header/HeaderTranslate";
import HeaderAuth from "../Header/HeaderAuth";
import useMenu from "./useMenu";
import usePathnameStore from "@/store/PathnameStore";

const { AUTH } = routerPaths;

const { Container, Head, Body, Side, Content, Menu } = Layout;

interface AppWrapperProps {
  children?: ReactNode;
}

const AppWrapper: FC<AppWrapperProps> = ({ children }) => {
  const { lang } = useLang();

  const { isPhone } = useContext(GridAppContext);

  const setPreviousPath = usePathnameStore((state) => state.setPreviousPath);

  const navigate = useNavigate();

  const items = useMenu();

  const onSetPreviousPath = () => {
    const { pathname, search } = window.location;
    if (pathname === AUTH) return;
    const path = pathname + search;
    setPreviousPath(path);
  };

  const handleNavigate = (id: string) => {
    const currentMenu = items.find((item) => item.id === id);
    navigate(currentMenu?.path ?? "");
  };

  useEffect(() => onSetPreviousPath(), [window.location.pathname]);

  return (
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

          <Menu defaultActiveId={["dashboard"]} type="vertical" items={items} onSelectMenu={handleNavigate} />
        </Side>
        <Content>
          <Section>
            <Routes>{children}</Routes>
          </Section>
        </Content>
      </Body>
    </Container>
  );
};

export default AppWrapper;
