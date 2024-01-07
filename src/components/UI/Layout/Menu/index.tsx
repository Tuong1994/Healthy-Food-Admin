import React from "react";
import { MenuItems } from "./type";
import { LayoutColor } from "../Context";
import Horizontal from "./Horizontal";
import Vertical from "./Vertical";

type MenuType = "horizontal" | "vertical";

export interface LayoutMenuProps {
  rootClassName?: string;
  itemClassName?: string;
  style?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
  items?: MenuItems;
  type?: MenuType;
  color?: LayoutColor;
  defaultActiveId?: string[];
}

const LayoutMenu: React.ForwardRefRenderFunction<HTMLDivElement, LayoutMenuProps> = (
  { type = "horizontal", color = "blue", defaultActiveId = [], ...restProps },
  ref
) => {
  const commonProps = { ref, color, defaultActiveId, ...restProps };

  return (
    <React.Fragment>
      {type === "horizontal" && <Horizontal {...commonProps} />}
      {type === "vertical" && <Vertical {...commonProps} />}
    </React.Fragment>
  );
};

export default React.forwardRef(LayoutMenu);
