import React from "react";
import { UI } from "@/components";
import type { Lang } from "@/common/type";
import type { Columns } from "@/components/UI/Table/type";
import type { SubCategory } from "@/services/subcategory/type";
import { ELang } from "@/common/enum";
import ContentHeader from "@/components/Page/ContentHeader";
import SubCategoriesTableFilter from "./SubCategoriesTableFilter";
import moment from "moment";

const { Image, Table, Button } = UI;

interface SubCategoriesTableProps {
  type: ELang;
  lang: Lang;
  handleOpenModal: (activeId: string | null) => void;
}

const SubCategoriesTable: React.FC<SubCategoriesTableProps> = ({ type, lang, handleOpenModal }) => {
  const dataSource: SubCategory[] = [
    {
      id: "1",
      nameEn: "Sub category En",
      nameVn: "Sub category Vn",
      categoryId: "1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      nameEn: "Sub category En",
      nameVn: "Sub category Vn",
      categoryId: "1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      nameEn: "Sub category En",
      nameVn: "Sub category Vn",
      categoryId: "1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "4",
      nameEn: "Sub category En",
      nameVn: "Sub category Vn",
      categoryId: "1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "5",
      nameEn: "Sub category En",
      nameVn: "Sub category Vn",
      categoryId: "1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "6",
      nameEn: "Sub category En",
      nameVn: "Sub category Vn",
      categoryId: "1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

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
      dataIndex: type === ELang.EN ? "nameEn" : "nameVn",
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
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default SubCategoriesTable;
