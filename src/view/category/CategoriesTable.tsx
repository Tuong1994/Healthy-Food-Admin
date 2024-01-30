import { FC, Fragment } from "react";
import { Image, Table, Button } from "@/components/UI";
import type { Lang } from "@/common/type";
import type { Columns } from "@/components/UI/Table/type";
import type { Category } from "@/services/category/type";
import { ELang } from "@/common/enum";
import ContentHeader from "@/components/Page/ContentHeader";
import CategoriesTableFilter from "./CategoriesTableFilter";
import moment from "moment";

interface CategoriesTableProps {
  locale: ELang;
  lang: Lang;
  handleOpenModal: (activeId: string | null) => void;
}

const CategoriesTable: FC<CategoriesTableProps> = ({ locale, lang, handleOpenModal }) => {
  const dataSource: Category[] = [];

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
      <Table<Category>
        color="green"
        hasFilter
        hasPagination
        hasRowSelection
        dataSource={dataSource}
        columns={columns}
        filter={<CategoriesTableFilter />}
      />
    </Fragment>
  );
};

export default CategoriesTable;
