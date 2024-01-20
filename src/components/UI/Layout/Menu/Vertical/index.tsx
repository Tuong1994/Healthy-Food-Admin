import { CSSProperties, ForwardRefRenderFunction, useContext, useEffect, forwardRef } from "react";
import { MenuItems } from "../type";
import LayoutContext, { LayoutColor } from "../../Context";
import MenuVerticalItem from "./Item";
import useMenuStore, { STORAGE_KEY } from "../MenuStore";
import utils from "@/utils";

export interface MenuVerticalProps {
  rootClassName?: string;
  itemClassName?: string;
  itemStyle?: CSSProperties;
  items?: MenuItems;
  color?: LayoutColor;
  defaultActiveId?: string[];
}

const MenuVertical: ForwardRefRenderFunction<HTMLDivElement, MenuVerticalProps> = (
  {
    rootClassName = "",
    itemClassName,
    itemStyle,
    items = [],
    defaultActiveId = [],
    color = "blue",
    ...restProps
  },
  ref
) => {
  const { theme, layouted, color: layoutColor } = useContext(LayoutContext);

  const [activeId, setActiveId] = useMenuStore((state) => [state.activeId, state.setActiveId]);

  const themeClassName = theme === "dark" ? "menu-vertical-dark" : "";

  const colorClassName = `menu-vertical-${layouted ? layoutColor : color}`;

  const className = utils.formatClassName("menu-vertical", themeClassName, colorClassName, rootClassName);

  useEffect(() => {
    if (!sessionStorage.getItem(STORAGE_KEY))
      return setActiveId(defaultActiveId.length ? defaultActiveId : []);
    const id: string[] = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "");
    setActiveId(id);
  }, [defaultActiveId]);

  const handleSelectMenu = (id: string) => {
    if (activeId.length) setActiveId([]);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify([id]));
    setActiveId([id]);
  };

  return (
    <div ref={ref} {...restProps} className={className}>
      {items.map((item) => (
        <MenuVerticalItem
          key={item.id}
          item={item}
          color={layoutColor}
          activeId={activeId}
          itemStyle={itemStyle}
          itemClassName={itemClassName}
          handleSelectMenu={handleSelectMenu}
        />
      ))}
    </div>
  );
};

export default forwardRef(MenuVertical);
