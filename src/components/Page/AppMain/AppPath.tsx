import { FC, Fragment, ReactNode, useEffect } from "react";
import { useLang } from "@/hooks";
import useMenuStore from "@/components/UI/Layout/Menu/MenuStore";
import usePathnameStore from "@/store/PathnameStore";
import useUrlQuery from "@/hooks/features/useUrlQuery";
import utils from "@/utils";

interface AppPathProps {
  children?: ReactNode;
}

const AppPath: FC<AppPathProps> = ({ children }) => {
  const { locale } = useLang();

  const name = utils.getNameCurrentUrl();

  const setPreviousPath = usePathnameStore((state) => state.setPreviousPath);

  const setActiveId = useMenuStore((state) => state.setActiveId);

  const onSetPreviousPath = () => {
    const { pathname, search } = window.location;
    if (pathname.includes("auth")) return;
    const path = pathname + search;
    setPreviousPath(path);
  };

  const onSetSelectedMenu = () => {
    let currentName = name;
    if (name === "subcategory") currentName = "category";
    setActiveId([currentName]);
  };

  useEffect(() => onSetPreviousPath(), [window.location.pathname]);

  useEffect(() => onSetSelectedMenu(), [name]);

  useUrlQuery({ langCode: locale });

  return <Fragment>{children}</Fragment>;
};

export default AppPath;
