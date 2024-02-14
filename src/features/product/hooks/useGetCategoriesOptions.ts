import { useEffect } from "react";
import { useQuery } from "react-query";
import { getCategoriesPaging } from "@/services/category/api";
import { getApiQuery } from "@/services/helper";
import type { ApiQuery } from "@/services/type";

const useGetCategoriesOptions = (apiQuery: ApiQuery) => {
  const queryKey = "getCategoriesOptions" + getApiQuery(apiQuery);

  const getCategoriesOptions = async () => {
    const response = await getCategoriesPaging(apiQuery);
    return response;
  };

  const { refetch, ...rest } = useQuery(queryKey, getCategoriesOptions);

  useEffect(() => {
    refetch();
  }, [queryKey]);

  return { refetch, ...rest };
};

export default useGetCategoriesOptions;
