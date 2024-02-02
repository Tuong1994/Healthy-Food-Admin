import { FC, Fragment, useState } from "react";
import { Tabs } from "@/components/UI";
import { useLang } from "@/hooks";
import { useNavigate } from "react-router";
import { linkPaths } from "@/common/constant/url";
import type { TabsItems } from "@/components/UI/Tabs/type";
import CategoriesTable from "@/features/category/components/CategoriesTable";
import SubCategoriesTable from "@/features/category/components/SubCategoriesTable";
import CategoryFormModal from "@/features/category/components/CategoryFormModal";
import SubCategoryFormModal from "@/features/category/components/SubCategoryFormModal";

const { CATEGORY } = linkPaths;

export type ActiveModal = {
  open: boolean;
  activeId: string | null;
};

interface CategoryProps {}

const Category: FC<CategoryProps> = () => {
  const { locale, lang } = useLang();

  const navigate = useNavigate();

  const [openCategoryModal, setOpenCategoryModal] = useState<ActiveModal>({
    open: false,
    activeId: null,
  });

  const [openSubCategoryModal, setOpenSubCategoryModal] = useState<ActiveModal>({
    open: false,
    activeId: null,
  });

  const handleSelectTab = () => navigate(CATEGORY);

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
      content: <CategoriesTable lang={lang} handleOpenModal={handleOpenCategoryModal} />,
    },
    {
      id: "subcategory",
      title: lang.category.subCategoryTitle,
      content: <SubCategoriesTable lang={lang} handleOpenModal={handleOpenSubCategoryModal} />,
    },
  ];

  return (
    <Fragment>
      <Tabs color="green" items={items} onSelectTab={handleSelectTab} />
      <CategoryFormModal openModal={openCategoryModal} lang={lang} onCancel={handleCloseCategoryModal} />
      <SubCategoryFormModal
        lang={lang}
        openModal={openSubCategoryModal}
        onCancel={handleCloseSubCategoryModal}
      />
    </Fragment>
  );
};

export default Category;
