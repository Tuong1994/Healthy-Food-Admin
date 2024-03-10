import { FC, Fragment } from "react";
import { Grid } from "@/components/UI";
import { ERole } from "@/services/user/enum";
import { useLang } from "@/hooks";
import ContentHeader from "@/components/Page/ContentHeader";
import MainSettingMode from "@/features/setting/components/main/SettingMode";
import MainSettingUser from "@/features/setting/components/main/SettingUser";
import useAuthStore from "@/store/AuthStore";

const { Row, Col } = Grid;

interface MainSettingProps {}

const MainSetting: FC<MainSettingProps> = () => {
  const { lang } = useLang();

  const auth = useAuthStore((state) => state.auth);

  const { info } = auth;

  const canSetting = info.role ? info.role === ERole.MANAGER : false;

  return (
    <Fragment>
      <ContentHeader hasTotal={false} headTitle={lang.setting.main.title} />
      <Row>
        <Col xs={24} md={20} lg={22} span={14}>
          <MainSettingMode lang={lang} />
          {canSetting && <MainSettingUser lang={lang} />}
        </Col>
      </Row>
    </Fragment>
  );
};

export default MainSetting;
