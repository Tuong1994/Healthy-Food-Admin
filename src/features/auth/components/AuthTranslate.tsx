import { FC } from "react";
import { Select } from "@/components/Control";
import { ELang } from "@/common/enum";
import { useLang } from "@/hooks";
import type { SelectOptions } from "@/components/Control/type";

interface AuthTranslateProps {}

const AuthTranslate: FC<AuthTranslateProps> = () => {
  const { locale, switchLang } = useLang();

  const options: SelectOptions = [
    { label: "EN", value: ELang.EN },
    { label: "VN", value: ELang.VN },
  ];

  const handleSelect = (value: any) => switchLang(value);

  return (
    <div className="auth-translate">
      <Select
        color="green"
        hasSearch={false}
        hasClear={false}
        defaultValue={locale}
        options={options}
        onChangeSelect={handleSelect}
      />
    </div>
  );
};

export default AuthTranslate;
