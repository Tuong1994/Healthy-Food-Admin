import { useEffect } from "react";
import { useQuery } from "react-query";
import { getApiQuery } from "@/services/helper";
import { getCustomers } from "@/services/customer/api";
import type { ApiQuery } from "@/services/type";

const useGetCustomersOptions = (apiQuery: ApiQuery) => {
  const queryKey = "getCustomersOptions" + getApiQuery(apiQuery);

  const getCustomersOptions = async () => {
    const response = await getCustomers(apiQuery);
    return response;
  };

  const { refetch, ...rest } = useQuery(queryKey, getCustomersOptions);

  useEffect(() => {
    refetch();
  }, [queryKey]);

  return { refetch, ...rest };
};

export default useGetCustomersOptions;
