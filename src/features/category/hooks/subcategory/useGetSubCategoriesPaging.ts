import { useEffect } from "react";
import { useQuery } from "react-query";
import { getApiQuery } from "@/services/helper";
import { getSubCategoriesPaging } from "@/services/subcategory/api";
import type { ApiQuery } from "@/services/type";
import useUrlQuery from "@/hooks/features/useUrlQuery";

const useGetSubCategoriesPaging = (apiQuery: ApiQuery) => {
  const { query } = useUrlQuery(apiQuery);

  const queryKey = "getSubCategoriesPaging" + getApiQuery(query);

  const getSubCategories = async () => {
    const response = await getSubCategoriesPaging(query);
    return response;
  };

  const { refetch, ...rest } = useQuery(queryKey, getSubCategories);

  useEffect(() => {
    refetch();
  }, [queryKey]);

  return { refetch, ...rest };
};

export default useGetSubCategoriesPaging;
