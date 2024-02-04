import { useEffect } from "react";
import { useQuery } from "react-query";
import { getApiQuery } from "@/services/helper";
import { getCustomer } from "@/services/customer/api";
import type { ApiQuery } from "@/services/type";

const useGetCustomer = (apiQuery: ApiQuery, isUpdate: boolean) => {
  const queryKey = "getCustomer" + getApiQuery(apiQuery);

  const getCustomerDetail = async () => {
    const response = await getCustomer(apiQuery);
    return response;
  };

  const { refetch, ...rest } = useQuery([queryKey, isUpdate], getCustomerDetail, {
    enabled: isUpdate,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isUpdate) refetch();
  }, [queryKey, isUpdate]);

  return { refetch, ...rest };
};

export default useGetCustomer;
