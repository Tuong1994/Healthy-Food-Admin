import { useEffect } from "react";
import { useQuery } from "react-query";
import { getApiQuery } from "@/services/helper";
import type { ApiQuery } from "@/services/type";
import useGetCustomersPaging from "@/features/customer/hooks/useGetCustomersPaging";

const useGetCustomersOptions = (apiQuery: ApiQuery) => {
  const queryKey = "getCustomersOptions" + getApiQuery(apiQuery);

  const getCustomersOptions = async () => {
    const response = await useGetCustomersPaging(apiQuery);
    return response;
  };

  const { refetch, ...rest } = useQuery(queryKey, getCustomersOptions);

  useEffect(() => {
    refetch();
  }, [queryKey]);

  return { refetch, ...rest };
};

export default useGetCustomersOptions;
