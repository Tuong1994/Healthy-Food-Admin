import { useEffect } from "react";
import { useQuery } from "react-query";
import { getCategoriesPaging } from "@/services/category/api";
import { getApiQuery } from "@/services/helper";
import type { ApiQuery } from "@/services/type";
import useUrlQuery from "@/hooks/features/useUrlQuery";

const useGetCategoriesPaging = (apiQuery: ApiQuery) => {
  const { query } = useUrlQuery(apiQuery);

  const queryKey = "getCategoriesPaging" + getApiQuery(query);

  const getCategories = async () => {
    const response = await getCategoriesPaging(query);
    return response;
  };

  const { refetch, ...rest } = useQuery(queryKey, getCategories);

  useEffect(() => {
    refetch();
  }, [queryKey]);

  return { refetch, ...rest };
};

export default useGetCategoriesPaging;
