import { useEffect } from "react";
import { useQuery } from "react-query";
import { getApiQuery } from "@/services/helper";
import { getUsers } from "@/services/user/api";
import type { ApiQuery } from "@/services/type";

const useGetCustomersOptions = (apiQuery: ApiQuery) => {
  const queryKey = "getCustomersOptions" + getApiQuery(apiQuery);

  const getCustomersOptions = async () => {
    const response = await getUsers(apiQuery);
    return response;
  };

  const { refetch, ...rest } = useQuery(queryKey, getCustomersOptions);

  useEffect(() => {
    refetch();
  }, [queryKey]);

  return { refetch, ...rest };
};

export default useGetCustomersOptions;
