import { FC, Fragment } from "react";
import CategoryForm from "@/features/category/components/form/CategoryForm";
import SubCategoryForm from "@/features/category/components/form/SubCategoryForm";
import utils from "@/utils";

interface CategoryProps {}

const Category: FC<CategoryProps> = () => {
  const name = utils.getNameCurrentUrl();

  const renderContent = () => {
    if (name === "category") return <CategoryForm />;
    return <SubCategoryForm />;
  };

  return <Fragment>{renderContent()}</Fragment>;
};

export default Category;
