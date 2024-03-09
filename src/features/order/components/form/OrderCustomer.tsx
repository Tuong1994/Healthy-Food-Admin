import { FC, useMemo, useState } from "react";
import { Card, Typography } from "@/components/UI";
import { FormItem, Select } from "@/components/Control";
import type { Lang } from "@/common/type";
import type { ApiQuery } from "@/services/type";
import type { User } from "@/services/user/type";
import { useRule } from "@/hooks";
import useGetCustomersOptions from "../../hooks/useGetCustomersOptions";
import useDebounce from "@/hooks/features/useDebounce";
import utils from "@/utils";

const { Paragraph } = Typography;

interface OrderCustomerProps {
  lang: Lang;
}

const OrderCustomer: FC<OrderCustomerProps> = ({ lang }) => {
  const { common } = useRule();

  const [apiQuery, setApiQuery] = useState<ApiQuery>({ page: 1, limit: 10, keywords: "" });

  const debounce = useDebounce(apiQuery.keywords as string);

  const { data: response, isFetching } = useGetCustomersOptions({ ...apiQuery, keywords: debounce });

  const customers = useMemo(() => {
    if (!response) return [];
    if (!response.data) return [];
    return response.data.items || [];
  }, [response]);

  const customersOptions = utils.mapDataToOptions<User>(customers, "fullName", "id");

  const handleSearch = (text: string) => setApiQuery((prev) => ({ ...prev, keywords: text }));

  const handleChangePage = (page: number) => setApiQuery((prev) => ({ ...prev, page }));

  return (
    <Card
      rootClassName="card-section"
      head={
        <Paragraph size={16} weight={600}>
          {lang.order.form.customer}
        </Paragraph>
      }
    >
      <FormItem name="userId" rules={common()}>
        <Select
          async
          required
          loading={isFetching}
          options={customersOptions}
          total={response?.data?.totalItems}
          onChangeSearch={handleSearch}
          onChangePage={handleChangePage}
        />
      </FormItem>
    </Card>
  );
};

export default OrderCustomer;
