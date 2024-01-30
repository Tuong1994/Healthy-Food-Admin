import { FC, Fragment } from "react";
import { Image, Table, Button } from "@/components/UI";
import type { Lang } from "@/common/type";
import type { Columns } from "@/components/UI/Table/type";
import type { SubCategory } from "@/services/subcategory/type";
import { ELang } from "@/common/enum";
import ContentHeader from "@/components/Page/ContentHeader";
import SubCategoriesTableFilter from "./SubCategoriesTableFilter";
import moment from "moment";

interface SubCategoriesTableProps {
  locale: ELang;
  lang: Lang;
  handleOpenModal: (activeId: string | null) => void;
}

const SubCategoriesTable: FC<SubCategoriesTableProps> = ({ locale, lang, handleOpenModal }) => {
  const dataSource: SubCategory[] = [];

  const columns: Columns<SubCategory> = [
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
      render: (name: string, data: SubCategory) => (
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
        headTitle={lang.category.subCategoryTitle}
        right={() => (
          <Button color="green" onClick={() => handleOpenModal(null)}>
            {lang.common.actions.create}
          </Button>
        )}
      />
      <Table<SubCategory>
        color="green"
        hasFilter
        hasPagination
        hasRowSelection
        dataSource={dataSource}
        columns={columns}
        filter={<SubCategoriesTableFilter />}
      />
    </Fragment>
  );
};

export default SubCategoriesTable;
