import { FC } from "react";
import { Card, Space, Grid, Typography, Button } from "@/components/UI";
import { HiLightBulb, HiMoon } from "react-icons/hi";
import type { Lang } from "@/common/type";
import useLayout from "@/components/UI/Layout/useLayout";

const { Row, Col } = Grid;

const { Paragraph } = Typography;

interface MainSettingModeProps {
  lang: Lang;
}

const MainSettingMode: FC<MainSettingModeProps> = ({ lang }) => {
  const { layoutValue, layoutApi } = useLayout();

  const { layoutTheme: theme } = layoutValue;

  const { onSwitchTheme } = layoutApi;

  const lightButtonColor = theme === "light" ? "green" : undefined;

  const darkButtonColor = theme === "dark" ? "green" : undefined;

  const handleSwitch = (type: "light" | "dark") => onSwitchTheme(type);

  return (
    <Card rootClassName="setting-mode">
      <Row justify="between" align="middle">
        <Col xs={24} span={14}>
          <Paragraph>{lang.setting.main.mode.title}</Paragraph>
        </Col>
        <Col xs={24} span={10}>
          <Row justify="center">
            <Col span={12}>
              <Button
                color={lightButtonColor}
                ghost={!Boolean(lightButtonColor)}
                rootClassName="mode-action"
                onClick={() => handleSwitch("light")}
              >
                <Space align="middle">
                  <HiLightBulb size={20} />
                  <Paragraph>{lang.setting.main.mode.light}</Paragraph>
                </Space>
              </Button>
            </Col>
            <Col span={12}>
              <Button
                color={darkButtonColor}
                ghost={!Boolean(darkButtonColor)}
                rootClassName="mode-action"
                onClick={() => handleSwitch("dark")}
              >
                <Space align="middle">
                  <HiMoon size={20} />
                  <Paragraph>{lang.setting.main.mode.dark}</Paragraph>
                </Space>
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default MainSettingMode;
