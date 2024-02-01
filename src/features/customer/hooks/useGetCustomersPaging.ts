import { useEffect } from "react";
import { getCustomers } from "@/services/customer/api";
import { getApiQuery } from "@/services/helper";
import { useQuery } from "react-query";
import type { ApiQuery } from "@/services/type";
import useUrlQuery from "@/hooks/features/useUrlQuery";

const useGetCustomersPaging = (apiQuery: ApiQuery) => {
  const { query } = useUrlQuery(apiQuery);

  const queryKey = "getCustomersPaging" + getApiQuery(query);

  const getCustomersPaging = async () => {
    const response = await getCustomers(query);
    return response;
  };

  const { refetch, ...rest } = useQuery(queryKey, getCustomersPaging);

  useEffect(() => {
    refetch();
  }, [queryKey]);

  return { refetch, ...rest };
};

export default useGetCustomersPaging;
