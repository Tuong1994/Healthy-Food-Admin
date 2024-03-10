import { useEffect } from "react";
import { useQuery } from "react-query";
import { getApiQuery } from "@/services/helper";
import { getUsers } from "@/services/user/api";
import type { ApiQuery } from "@/services/type";

const useGetUsersOptions = (apiQuery: ApiQuery) => {
  const queryKey = "getUsersOptions" + getApiQuery(apiQuery);

  const getUsersOptions = async () => {
    const response = await getUsers(apiQuery);
    return response;
  };

  const { refetch, ...rest } = useQuery(queryKey, getUsersOptions);

  useEffect(() => {
    refetch();
  }, [queryKey]);

  return { refetch, ...rest };
};

export default useGetUsersOptions;
