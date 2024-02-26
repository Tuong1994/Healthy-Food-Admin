import { FC, Fragment, ReactNode, useEffect } from "react";
import { routerPaths } from "@/common/constant/url";
import useMenuStore from "@/components/UI/Layout/Menu/MenuStore";
import usePathnameStore from "@/store/PathnameStore";
import utils from "@/utils";

const { AUTH } = routerPaths;

interface AppPathProps {
  children?: ReactNode;
}

const AppPath: FC<AppPathProps> = ({ children }) => {
  const name = utils.getNameCurrentUrl();

  const setPreviousPath = usePathnameStore((state) => state.setPreviousPath);

  const setActiveId = useMenuStore((state) => state.setActiveId);

  const onSetPreviousPath = () => {
    const { pathname, search } = window.location;
    if (pathname === AUTH) return;
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

  return <Fragment>{children}</Fragment>;
};

export default AppPath;
