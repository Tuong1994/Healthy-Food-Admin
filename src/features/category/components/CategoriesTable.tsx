import { FC, Fragment } from "react";
import { Image, Table, Button } from "@/components/UI";
import { useNavigate } from "react-router-dom";
import type { Lang } from "@/common/type";
import type { Columns } from "@/components/UI/Table/type";
import type { Category } from "@/services/category/type";
import { ELang } from "@/common/enum";
import { routerPaths } from "@/common/constant/url";
import ContentHeader from "@/components/Page/ContentHeader";
import CategoriesTableFilter from "./CategoriesTableFilter";
import Error from "@/components/Page/Error";
import useGetCategories from "../hooks/useGetCategories";
import moment from "moment";

const { CATEGORY } = routerPaths;

interface CategoriesTableProps {
  locale: ELang;
  lang: Lang;
  handleOpenModal: (activeId: string | null) => void;
}

const CategoriesTable: FC<CategoriesTableProps> = ({ locale, lang, handleOpenModal }) => {
  const navigate = useNavigate();

  const { data: categories, isLoading, isError } = useGetCategories();

  const dataSource = (): Category[] => {
    if (!categories) return [];
    if (!categories.success) return [];
    return categories.data?.items || [];
  };

  const columns: Columns<Category> = [
    {
      id: "id",
      title: lang.common.table.head.image,
      dataIndex: "id",
      render: () => <Image imgWidth={60} imgHeight={60} />,
    },
    {
      id: "name",
      title: lang.common.table.head.name,
      dataIndex: "name",
      render: (name: string, data: Category) => (
        <Button text onClick={() => handleOpenModal(data.id as string)}>
          {name}
        </Button>
      ),
    },
    {
      id: "createdAt",
      title: lang.common.table.head.createdAt,
      dataIndex: "createdAt",
      render: (date: Date) => <>{moment(date).format("DD/MM/YYYY")}</>,
    },
    {
      id: "updatedAt",
      title: lang.common.table.head.updatedAt,
      dataIndex: "updatedAt",
      render: (date: Date) => <>{moment(date).format("DD/MM/YYYY")}</>,
    },
  ];

  const handleChangePage = (page: number) => {
    navigate(CATEGORY + `?page=${page}&limit=10`);
  };

  const renderContent = () => {
    if (isError) return <Error />;
    return (
      <Table<Category>
        color="green"
        hasFilter
        hasPagination
        hasRowSelection
        loading={isLoading}
        columns={columns}
        dataSource={dataSource()}
        filter={<CategoriesTableFilter />}
        paginationProps={{ total: categories?.data?.totalItems ?? 0, onChangePage: handleChangePage }}
      />
    );
  };

  return (
    <Fragment>
      <ContentHeader
        headTitle={lang.category.categoryTitle}
        right={() => (
          <Button color="green" onClick={() => handleOpenModal(null)}>
            {lang.common.actions.create}
          </Button>
        )}
      />
      {renderContent()}
    </Fragment>
  );
};

export default CategoriesTable;
