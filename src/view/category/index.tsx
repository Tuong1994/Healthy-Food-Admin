import React from "react";
import { UI } from "@/components";
import { useLang } from "@/hooks";
import { TabsItems } from "@/components/UI/Tabs/type";
import CategoriesTable from "./CategoriesTable";
import SubCategoriesTable from "./SubCategoriesTable";
import CategoryFormModal from "./CategoryFormModal";
import SubCategoryFormModal from "./SubCategoryFormModal";

const { Tabs } = UI;

export type ActiveModal = {
  open: boolean;
  activeId: string | null;
};

interface CategoryProps {}

const Category: React.FC<CategoryProps> = () => {
  const { type, lang } = useLang();

  const [openCategoryModal, setOpenCategoryModal] = React.useState<ActiveModal>({
    open: false,
    activeId: null,
  });

  const [openSubCategoryModal, setOpenSubCategoryModal] = React.useState<ActiveModal>({
    open: false,
    activeId: null,
  });

  const handleOpenCategoryModal = (activeId: string | null) => {
    setOpenCategoryModal({ activeId, open: true });
  };

  const handleOpenSubCategoryModal = (activeId: string | null) => {
    setOpenSubCategoryModal({ activeId, open: true });
  };

  const handleCloseCategoryModal = () => {
    setOpenCategoryModal({ activeId: null, open: false });
  };

  const handleCloseSubCategoryModal = () => {
    setOpenSubCategoryModal({ activeId: null, open: false });
  };

  const items: TabsItems = [
    {
      id: "category",
      title: lang.category.categoryTitle,
      content: <CategoriesTable type={type} lang={lang} handleOpenModal={handleOpenCategoryModal} />,
    },
    {
      id: "subcategory",
      title: lang.category.subCategoryTitle,
      content: <SubCategoriesTable type={type} lang={lang} handleOpenModal={handleOpenSubCategoryModal} />,
    },
  ];

  return (
    <React.Fragment>
      <Tabs color="green" items={items} />
      <CategoryFormModal openModal={openCategoryModal} lang={lang} onCancel={handleCloseCategoryModal} />
      <SubCategoryFormModal
        openModal={openSubCategoryModal}
        lang={lang}
        onCancel={handleCloseSubCategoryModal}
      />
    </React.Fragment>
  );
};

export default Category;
