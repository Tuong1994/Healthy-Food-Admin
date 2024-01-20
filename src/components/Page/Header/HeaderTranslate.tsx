import { FC } from "react";
import { Dropdown, Image, Space } from "@/components/UI";
import type { DropdownItems } from "@/components/UI/Dropdown/type";
import { ELang } from "@/common/enum";
import { HiChevronDown } from "react-icons/hi2";
import useLangStore from "@/store/LangStore";

interface HeaderTranslateProps {}

const HeaderTranslate: FC<HeaderTranslateProps> = () => {
  const [type, lang, switchLang] = useLangStore((state) => [state.type, state.lang, state.switchLang]);

  const items: DropdownItems = [
    {
      id: "1",
      label: (
        <Space onClick={() => switchLang(ELang.EN)}>
          <Image width={20} height={20} src="/image/flag/en_flag.svg" alt="flag" />
          <span>{lang.pageComponent.header.translate.en}</span>
        </Space>
      ),
    },
    {
      id: "2",
      label: (
        <Space onClick={() => switchLang(ELang.VN)}>
          <Image width={20} height={20} src="/image/flag/vn_flag.svg" alt="flag" />
          <span>{lang.pageComponent.header.translate.vn}</span>
        </Space>
      ),
    },
  ];

  const renderLabel = () => {
    if (type === ELang.EN) return "EN";
    return "VN";
  };

  return (
    <Dropdown items={items} placement="right" rootClassName="header-translate">
      <div className="translate-label">
        <span>{renderLabel()}</span>
        <HiChevronDown />
      </div>
    </Dropdown>
  );
};

export default HeaderTranslate;
