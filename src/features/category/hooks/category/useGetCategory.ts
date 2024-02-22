import { useEffect } from "react";
import { useQuery } from "react-query";
import { getCategory } from "@/services/category/api";
import { getApiQuery } from "@/services/helper";
import type { ApiQuery } from "@/services/type";

const useGetCategory = (apiQuery: ApiQuery, isUpdate: boolean) => {
  const queryKey = "getCategory" + getApiQuery(apiQuery);

  const getCategoryDetail = async () => {
    const response = await getCategory(apiQuery);
    return response;
  };

  const { refetch, ...rest } = useQuery([queryKey, isUpdate], getCategoryDetail, { enabled: isUpdate });

  useEffect(() => {
    if (isUpdate) refetch();
  }, [queryKey, isUpdate]);

  return { refetch, ...rest };
};

export default useGetCategory;
