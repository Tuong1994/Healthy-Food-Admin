import { useEffect } from "react";
import { getUsers } from "@/services/user/api";
import { getApiQuery } from "@/services/helper";
import { useQuery } from "react-query";
import type { ApiQuery } from "@/services/type";
import useUrlQuery from "@/hooks/features/useUrlQuery";

const useGetUsersPaging = (apiQuery: ApiQuery) => {
  const { query } = useUrlQuery(apiQuery);

  const queryKey = "getUsersPaging" + getApiQuery(query);

  const getUsersPaging = async () => {
    const response = await getUsers(query);
    return response;
  };

  const { refetch, ...rest } = useQuery(queryKey, getUsersPaging);

  useEffect(() => {
    refetch();
  }, [queryKey]);

  return { refetch, ...rest };
};

export default useGetUsersPaging;
