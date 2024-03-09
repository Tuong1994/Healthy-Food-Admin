import { FC, Fragment } from "react";
import { Link } from "react-router-dom";
import { linkPaths } from "@/common/constant/url";
import { useLang } from "@/hooks";
import type { BreadcrumbItems } from "@/components/UI/Breadcrumb/type";
import ContentHeader from "@/components/Page/ContentHeader";
import UserSettingPermissions from "@/features/setting/components/user/UserSettingPermissions";
import { Breadcrumb } from "@/components/UI";

const { MAIN_SETTING } = linkPaths;

interface UserSettingProps {}

const UserSetting: FC<UserSettingProps> = () => {
  const { lang } = useLang();

  const items: BreadcrumbItems = [
    { id: "1", label: <Link to={MAIN_SETTING}>{lang.setting.main.title}</Link> },
    { id: "2", label: lang.setting.user.title, actived: true },
  ];

  return (
    <Fragment>
      <Breadcrumb items={items} />
      <ContentHeader hasTotal={false} headTitle={lang.setting.user.title} />
      <UserSettingPermissions lang={lang} />
    </Fragment>
  );
};

export default UserSetting;
