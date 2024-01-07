export type MenuItem = {
  id: string;
  label: React.ReactNode | React.ReactNode[];
  icon?: React.ReactNode | React.ReactNode[];
  isRoot?: boolean;
  children?: MenuItem[];
};

export type MenuItems = MenuItem[];
