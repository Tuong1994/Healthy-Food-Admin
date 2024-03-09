import { FC, Fragment } from "react";
import { Grid } from "@/components/UI";
import { useLang } from "@/hooks";
import ContentHeader from "@/components/Page/ContentHeader";
import MainSettingMode from "@/features/setting/components/main/SettingMode";
import MainSettingUser from "@/features/setting/components/main/SettingUser";

const { Row, Col } = Grid;

interface MainSettingProps {}

const MainSetting: FC<MainSettingProps> = () => {
  const { lang } = useLang();

  return (
    <Fragment>
      <ContentHeader hasTotal={false} headTitle={lang.setting.main.title} />
      <Row>
        <Col xs={24} md={20} lg={22} span={14}>
          <MainSettingMode lang={lang} />
          <MainSettingUser lang={lang} />
        </Col>
      </Row>
    </Fragment>
  );
};

export default MainSetting;
