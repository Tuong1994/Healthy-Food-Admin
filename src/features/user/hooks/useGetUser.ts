import { useEffect } from "react";
import { useQuery } from "react-query";
import { getApiQuery } from "@/services/helper";
import { getUser } from "@/services/user/api";
import type { ApiQuery } from "@/services/type";

const useGetUser = (apiQuery: ApiQuery, isUpdate: boolean) => {
  const queryKey = "getUser" + getApiQuery(apiQuery);

  const getUserDetail = async () => {
    const response = await getUser(apiQuery);
    return response;
  };

  const { refetch, ...rest } = useQuery([queryKey, isUpdate], getUserDetail, { enabled: isUpdate });

  useEffect(() => {
    if (isUpdate) refetch();
  }, [queryKey, isUpdate]);

  return { refetch, ...rest };
};

export default useGetUser;
