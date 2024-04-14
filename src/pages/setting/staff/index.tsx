import { FC } from "react";
import { Breadcrumb } from "@/components/UI";
import { Link } from "react-router-dom";
import { linkPaths } from "@/common/constant/url";
import { useLang } from "@/hooks";
import type { BreadcrumbItems } from "@/components/UI/Breadcrumb/type";
import ContentHeader from "@/components/Page/ContentHeader";
import StaffSettingPermission from "@/features/setting/components/staff/StaffSettingPermission";
import ValidateRoute from "@/features/setting/components/staff/ValidateRoute";

const { MAIN_SETTING } = linkPaths;

interface StaffSettingProps {}

const StaffSetting: FC<StaffSettingProps> = () => {
  const { lang } = useLang();

  const items: BreadcrumbItems = [
    { id: "1", label: <Link to={MAIN_SETTING}>{lang.setting.main.title}</Link> },
    { id: "2", label: lang.setting.staff.title, actived: true },
  ];

  return (
    <ValidateRoute>
      <Breadcrumb items={items} />
      <ContentHeader hasTotal={false} headTitle={lang.setting.staff.title} />
      <StaffSettingPermission lang={lang} />
    </ValidateRoute>
  );
};

export default StaffSetting;
