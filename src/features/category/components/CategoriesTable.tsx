import { FC, Fragment, Key, useState } from "react";
import { Image, Table, Button, Space } from "@/components/UI";
import type { Confirmed, Lang } from "@/common/type";
import type { Columns } from "@/components/UI/Table/type";
import type { Category } from "@/services/category/type";
import type { ApiQuery } from "@/services/type";
import { ESort } from "@/common/enum";
import { PiWarning } from "react-icons/pi";
import { REPLACE_NUM_REGEX } from "@/common/constant/regex";
import ContentHeader from "@/components/Page/ContentHeader";
import CategoriesTableFilter from "./CategoriesTableFilter";
import ConfirmModal from "@/components/Page/ConfirmModal";
import Error from "@/components/Page/Error";
import useGetCategoriesPaging from "../hooks/useGetCategoriesPaging";
import useDebounce from "@/hooks/features/useDebounce";
import moment from "moment";

interface CategoriesTableProps {
  lang: Lang;
  handleOpenModal: (activeId: string | null) => void;
}

const CategoriesTable: FC<CategoriesTableProps> = ({ lang, handleOpenModal }) => {
  const initialApiQuery: ApiQuery = {
    page: 1,
    limit: 10,
    keywords: "",
    sortBy: ESort.NEWEST,
  };

  const [apiQuery, setApiQuery] = useState<ApiQuery>(initialApiQuery);

  const [confirmed, setConfirmed] = useState<Confirmed>({ open: false, ids: [] });

  const debounce = useDebounce(apiQuery.keywords as string);

  const {
    data: categories,
    isFetching,
    isError,
  } = useGetCategoriesPaging({ ...apiQuery, keywords: debounce });

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
      render: () => <Image imgWidth={40} imgHeight={40} />,
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

  const handleChangePage = (page: number) => setApiQuery((prev) => ({ ...prev, page }));

  const handleResetFilter = () => setApiQuery(initialApiQuery);

  const handleOpenConfirmModal = (ids: Key[]) => setConfirmed((prev) => ({ ...prev, open: true, ids }));

  const handleCloseConfirmModal = () => setConfirmed((prev) => ({ ...prev, open: false, ids: [] }));

  const renderContent = () => {
    if (isError) return <Error />;
    return (
      <Table<Category>
        color="green"
        hasFilter
        hasPagination
        hasRowSelection
        loading={isFetching}
        columns={columns}
        showRemove={confirmed.open}
        dataSource={dataSource()}
        onSelectRows={handleOpenConfirmModal}
        filter={<CategoriesTableFilter lang={lang} apiQuery={apiQuery} setApiQuery={setApiQuery} />}
        filterProps={{ hasFilterButton: false, onCancelFilter: handleResetFilter }}
        paginationProps={{
          showContent: true,
          total: categories?.data?.totalItems ?? 0,
          onChangePage: handleChangePage,
        }}
      />
    );
  };

  return (
    <Fragment>
      <ContentHeader
        headTitle={lang.category.categoryTitle}
        total={categories?.data?.totalItems}
        right={() => (
          <Button color="green" onClick={() => handleOpenModal(null)}>
            {lang.common.actions.create}
          </Button>
        )}
      />
      {renderContent()}
      <ConfirmModal
        open={confirmed.open}
        onCancel={handleCloseConfirmModal}
        desciption={
          <Space align="middle" justify="center">
            <PiWarning size={20} className="remove-modal-icon" />
            <span>
              {lang.common.description.remove.replace(REPLACE_NUM_REGEX, String(confirmed.ids.length))}
            </span>
          </Space>
        }
      />
    </Fragment>
  );
};

export default CategoriesTable;
