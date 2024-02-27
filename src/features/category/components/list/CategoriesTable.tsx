import { FC, Fragment, Key, useState } from "react";
import { Image, Table, Button, Space } from "@/components/UI";
import type { Confirmed, Lang } from "@/common/type";
import type { Columns } from "@/components/UI/Table/type";
import type { Category } from "@/services/category/type";
import type { ApiQuery } from "@/services/type";
import type { ImageUpload } from "@/services/image/type";
import { ELang, ERecordStatus, ESort } from "@/common/enum";
import { PiWarning } from "react-icons/pi";
import { REPLACE_NUM_REGEX } from "@/common/constant/regex";
import { linkPaths } from "@/common/constant/url";
import { Link } from "react-router-dom";
import ContentHeader from "@/components/Page/ContentHeader";
import CategoriesTableFilter from "./CategoriesTableFilter";
import ConfirmModal from "@/components/Page/ConfirmModal";
import Error from "@/components/Page/Error";
import getDisplayRecordStatus from "@/common/data-display/getDisplayRecordStatus";
import useDebounce from "@/hooks/features/useDebounce";
import useGetCategoriesPaging from "@/features/category/hooks/category/useGetCategoriesPaging";
import useRemoveCategories from "@/features/category/hooks/category/useRemoveCategories";
import useExportCategory from "../../hooks/category/useExportCategory";
import moment from "moment";

const { CATEGORY } = linkPaths;

interface CategoriesTableProps {
  locale: ELang;
  lang: Lang;
}

const CategoriesTable: FC<CategoriesTableProps> = ({ locale, lang }) => {
  const initialApiQuery: ApiQuery = {
    page: 1,
    limit: 10,
    keywords: "",
    sortBy: ESort.NEWEST,
    cateStatus: ERecordStatus.ALL,
  };

  const [apiQuery, setApiQuery] = useState<ApiQuery>(initialApiQuery);

  const [confirmed, setConfirmed] = useState<Confirmed>({ open: false, ids: [] });

  const debounce = useDebounce(apiQuery.keywords as string);

  const {
    data: categories,
    isFetching,
    isError,
    refetch,
  } = useGetCategoriesPaging({ ...apiQuery, keywords: debounce });

  const { mutate: onExportCategory, isLoading: exportLoading } = useExportCategory();

  const { mutate: onRemoveCategories, isLoading: removeLoading } = useRemoveCategories();

  const dataSource = (): Category[] => {
    if (!categories) return [];
    if (!categories.success) return [];
    return categories.data?.items || [];
  };

  const columns: Columns<Category> = [
    {
      id: "image",
      title: lang.common.table.head.image,
      dataIndex: "image",
      render: (image: ImageUpload) => <Image src={image?.path} imgWidth={40} imgHeight={40} />,
    },
    {
      id: "name",
      title: lang.common.table.head.name,
      dataIndex: "name",
      render: (name: string, data: Category) => (
        <Link to={CATEGORY} state={{ id: data.id }}>
          <Button text>{name}</Button>
        </Link>
      ),
    },
    {
      id: "status",
      title: lang.common.table.head.status,
      dataIndex: "status",
      render: (status: ERecordStatus) => <>{getDisplayRecordStatus(lang, status)}</>,
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

  const handleExport = () => {
    const apiQuery: ApiQuery = { langCode: locale };
    onExportCategory(apiQuery);
  };

  const handleRemove = () => {
    const listIds = confirmed.ids.join(",");
    const apiQuery: ApiQuery = { ids: listIds };
    onRemoveCategories(apiQuery, {
      onSuccess: () => {
        refetch();
        handleCloseConfirmModal();
      },
    });
  };

  const renderContent = () => {
    if (isError) return <Error />;
    return (
      <Table<Category>
        color="green"
        rowKey="id"
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
        headTitle={lang.category.mainCategory.list.title}
        total={categories?.data?.totalItems}
        right={() => (
          <Space>
            <Button ghost color="blue" loading={exportLoading} onClick={handleExport}>
              {lang.common.actions.export}
            </Button>
            <Link to={CATEGORY}>
              <Button color="green">{lang.common.actions.create}</Button>
            </Link>
          </Space>
        )}
      />
      {renderContent()}
      <ConfirmModal
        open={confirmed.open}
        okButtonProps={{ loading: removeLoading }}
        onOk={handleRemove}
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
