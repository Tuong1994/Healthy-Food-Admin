import React from "react";
import { UI } from "@/components";
import { HiLightBulb, HiMoon } from "react-icons/hi2";
import useLayout from "@/components/UI/Layout/useLayout";

const { Space, Switch } = UI;

interface HeaderThemeProps {}

const HeaderTheme: React.FC<HeaderThemeProps> = () => {
  const { layoutValue, layoutApi } = useLayout();

  const { layoutTheme: theme } = layoutValue;

  const { onSwitchTheme } = layoutApi;

  const handleSwitch = (switched: boolean) => {
    if (switched) onSwitchTheme("dark");
    else onSwitchTheme("light");
  };

  return (
    <Space align="middle">
      <HiLightBulb />
      <Switch color="green" checked={theme === "dark"} onSwitch={handleSwitch} />
      <HiMoon />
    </Space>
  );
};

export default HeaderTheme;
