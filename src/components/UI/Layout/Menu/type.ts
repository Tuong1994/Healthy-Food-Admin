import { ReactNode } from "react";

export type MenuItem = {
  id: string;
  label: ReactNode | ReactNode[];
  icon?: ReactNode | ReactNode[];
  path?: string;
  isRoot?: boolean;
  children?: MenuItem[];
};

export type MenuItems = MenuItem[];
