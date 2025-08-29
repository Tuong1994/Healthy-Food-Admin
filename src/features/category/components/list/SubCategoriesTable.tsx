import { FC, Fragment, Key, useState } from "react";
import { Image, Table, Button, Space } from "@/components/UI";
import type { Confirmed, Lang } from "@/common/type";
import type { Columns } from "@/components/UI/Table/type";
import type { SubCategory } from "@/services/subcategory/type";
import type { ApiQuery } from "@/services/type";
import type { ImageUpload } from "@/services/image/type";
import type { Category } from "@/services/category/type";
import { ELang, ERecordStatus, ESort } from "@/common/enum";
import { PiWarning } from "react-icons/pi";
import { REPLACE_NUM_REGEX } from "@/common/constant/regex";
import { linkPaths } from "@/common/constant/url";
import { Link } from "react-router-dom";
import ContentHeader from "@/components/Page/ContentHeader";
import SubCategoriesTableFilter from "./SubCategoriesTableFilter";
import Error from "@/components/Page/Error";
import ConfirmModal from "@/components/Page/ConfirmModal";
import getDisplayRecordStatus from "@/common/data-display/getDisplayRecordStatus";
import useDebounce from "@/hooks/features/useDebounce";
import useGetSubCategoriesPaging from "@/features/category/hooks/subcategory/useGetSubCategoriesPaging";
import useRemoveSubCategories from "@/features/category/hooks/subcategory/useRemoveSubCategores";
import useExportSubCategory from "../../hooks/subcategory/useExportSubCategory";
import moment from "moment";

const { SUBCATEGORY, CATEGORY } = linkPaths;

interface SubCategoriesTableProps {
  locale: ELang;
  lang: Lang;
  canCreate: boolean;
  canRemove: boolean;
}

const SubCategoriesTable: FC<SubCategoriesTableProps> = ({ locale, lang, canCreate, canRemove }) => {
  const initialApiQuery: ApiQuery = {
    page: 1,
    limit: 10,
    keywords: "",
    sortBy: ESort.NEWEST,
    subCateStatus: ERecordStatus.ALL,
  };

  const [apiQuery, setApiQuery] = useState<ApiQuery>(initialApiQuery);

  const [confirmed, setConfirmed] = useState<Confirmed>({ open: false, ids: [] });

  const debounce = useDebounce(apiQuery.keywords as string);

  const {
    data: subCategories,
    isFetching,
    isError,
    refetch,
  } = useGetSubCategoriesPaging({ ...apiQuery, keywords: debounce });

  const { mutate: onExportSubCategory, isLoading: exportLoading } = useExportSubCategory();

  const { mutate: onRemoveSubCategories, isLoading: removeLoading } = useRemoveSubCategories();

  const dataSource = (): SubCategory[] => {
    if (!subCategories) return [];
    if (!subCategories.success) return [];
    return subCategories.data?.items || [];
  };

  const columns: Columns<SubCategory> = [
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
      render: (name: string, data: SubCategory) => (
        <Link to={SUBCATEGORY} state={{ id: data.id }}>
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
      id: "category",
      title: lang.common.table.head.category,
      dataIndex: "category",
      render: (category: Category) => (
        <Link to={CATEGORY} state={{ id: category?.id }}>
          <Button text>{category?.name}</Button>
        </Link>
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

  const handleExport = () => {
    const apiQuery: ApiQuery = { langCode: locale };
    onExportSubCategory(apiQuery);
  };

  const handleRemove = () => {
    const listIds = confirmed.ids.join(",");
    const apiQuery: ApiQuery = { ids: listIds };
    onRemoveSubCategories(apiQuery, {
      onSuccess: () => {
        refetch();
        handleCloseConfirmModal();
      },
    });
  };

  const renderContent = () => {
    if (isError) return <Error />;
    return (
      <Table<SubCategory>
        color="green"
        rowKey="id"
        hasFilter
        hasPagination
        hasRowSelection={canRemove}
        loading={isFetching}
        showRemove={confirmed.open}
        columns={columns}
        dataSource={dataSource()}
        onSelectRows={handleOpenConfirmModal}
        filter={<SubCategoriesTableFilter lang={lang} apiQuery={apiQuery} setApiQuery={setApiQuery} />}
        filterProps={{
          hasFilterButton: false,
          cancelFilterButtonProps: { sizes: "md" },
          onCancelFilter: handleResetFilter,
        }}
        paginationProps={{
          showContent: true,
          total: subCategories?.data?.totalItems ?? 0,
          onChangePage: handleChangePage,
        }}
      />
    );
  };

  return (
    <Fragment>
      <ContentHeader
        headTitle={lang.category.subcategory.list.title}
        total={subCategories?.data?.totalItems}
        right={() => (
          <Space>
            <Button ghost color="blue" loading={exportLoading} disabled={exportLoading} onClick={handleExport}>
              {lang.common.actions.export}
            </Button>
            {canCreate && (
              <Link to={SUBCATEGORY}>
                <Button color="green">{lang.common.actions.create}</Button>
              </Link>
            )}
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

export default SubCategoriesTable;
