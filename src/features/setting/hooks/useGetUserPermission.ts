import { useEffect } from "react";
import { useQuery } from "react-query";
import { getApiQuery } from "@/services/helper";
import { getUserPermission } from "@/services/setting/api";
import type { ApiQuery } from "@/services/type";

const useGetUserPermission = (apiQuery: ApiQuery, isFetch: boolean) => {
  const queryKey = "getUserPermission" + getApiQuery(apiQuery);

  const getUserPermissionDetail = async () => {
    const response = await getUserPermission(apiQuery);
    return response;
  };

  const { refetch, ...rest } = useQuery([queryKey, isFetch], getUserPermissionDetail, { enabled: isFetch });

  useEffect(() => {
    if (isFetch) refetch();
  }, [queryKey, isFetch]);

  return { refetch, ...rest };
};

export default useGetUserPermission;
