import { useEffect } from "react";
import { getApiQuery } from "@/services/helper";
import { getOrders } from "@/services/order/api";
import { useQuery } from "react-query";
import type { ApiQuery } from "@/services/type";
import useUrlQuery from "@/hooks/features/useUrlQuery";

const useGetOrdersPaging = (apiQuery: ApiQuery) => {
  const { query } = useUrlQuery(apiQuery);

  const queryKey = "getOrdersPaging" + getApiQuery(query);

  const getOrdersPaging = async () => {
    const response = await getOrders(query);
    return response;
  };

  const { refetch, ...rest } = useQuery(queryKey, getOrdersPaging);

  useEffect(() => {
    refetch();
  }, [queryKey]);

  return { refetch, ...rest };
};

export default useGetOrdersPaging;
