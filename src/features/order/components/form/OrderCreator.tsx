import { FC, useMemo, useState } from "react";
import { Card, Typography } from "@/components/UI";
import { FormItem, Select } from "@/components/Control";
import type { Lang } from "@/common/type";
import type { ApiQuery } from "@/services/type";
import type { User } from "@/services/user/type";
import { useRule } from "@/hooks";
import useGetUsersOptions from "@/hooks/actions/useGetUsersOptions";
import useDebounce from "@/hooks/features/useDebounce";
import utils from "@/utils";

const { Paragraph } = Typography;

interface OrderCreatorProps {
  lang: Lang;
}

const OrderCreator: FC<OrderCreatorProps> = ({ lang }) => {
  const { common } = useRule();

  const [apiQuery, setApiQuery] = useState<ApiQuery>({
    page: 1,
    limit: 10,
    staffOnly: true,
    keywords: "",
  });

  const debounce = useDebounce(apiQuery.keywords as string);

  const { data: response, isFetching } = useGetUsersOptions({ ...apiQuery, keywords: debounce });

  const users = useMemo(() => {
    if (!response) return [];
    if (!response.data) return [];
    return response.data.items || [];
  }, [response]);

  const usersOptions = utils.mapDataToOptions<User>(users, "fullName", "id");

  const handleSearch = (text: string) => setApiQuery((prev) => ({ ...prev, keywords: text }));

  const handleChangePage = (page: number) => setApiQuery((prev) => ({ ...prev, page }));

  return (
    <Card
      rootClassName="card-section"
      head={
        <Paragraph size={16} weight={600}>
          {lang.order.form.creator}
        </Paragraph>
      }
    >
      <FormItem name="creatorId" rules={common()}>
        <Select
          async
          required
          loading={isFetching}
          options={usersOptions}
          total={response?.data?.totalItems}
          onChangeSearch={handleSearch}
          onChangePage={handleChangePage}
        />
      </FormItem>
    </Card>
  );
};

export default OrderCreator;
