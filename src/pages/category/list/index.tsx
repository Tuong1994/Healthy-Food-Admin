import { FC } from "react";
import { Tabs } from "@/components/UI";
import { useLang, usePermission } from "@/hooks";
import { useNavigate } from "react-router";
import { linkPaths } from "@/common/constant/url";
import type { TabsItems } from "@/components/UI/Tabs/type";
import CategoriesTable from "@/features/category/components/list/CategoriesTable";
import SubCategoriesTable from "@/features/category/components/list/SubCategoriesTable";
import utils from "@/utils";

const { CATEGORIES, SUBCATEGORIES } = linkPaths;

export type ActiveModal = {
  open: boolean;
  activeId: string | undefined;
};

interface CategoriesProps {}

const Categories: FC<CategoriesProps> = () => {
  const name = utils.getNameCurrentUrl();

  const { locale, lang } = useLang();

  const { canCreate, canRemove } = usePermission();

  const navigate = useNavigate();

  const handleSelectTab = (id: string) => navigate(id === "category" ? CATEGORIES : SUBCATEGORIES);

  const commonProps = { locale, lang, canCreate, canRemove };

  const items: TabsItems = [
    {
      id: "category",
      title: lang.category.mainCategory.list.title,
      content: <CategoriesTable {...commonProps} />,
    },
    {
      id: "subcategory",
      title: lang.category.subcategory.list.title,
      content: <SubCategoriesTable {...commonProps} />,
    },
  ];

  return <Tabs color="green" defaultActiveId={name} items={items} onSelectTab={handleSelectTab} />;
};

export default Categories;
