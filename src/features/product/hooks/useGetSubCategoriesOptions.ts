import { useEffect } from "react";
import { useQuery } from "react-query";
import { getSubCategoriesPaging } from "@/services/subcategory/api";
import { getApiQuery } from "@/services/helper";
import type { ApiQuery } from "@/services/type";

const useGetSubCategoriesOptions = (apiQuery: ApiQuery) => {
  const queryKey = "getSubCategoriesOptions" + getApiQuery(apiQuery);

  const isExecute = Boolean(apiQuery.categoryId);

  const getSubCategoriesOptions = async () => {
    const response = await getSubCategoriesPaging(apiQuery);
    return response;
  };

  const { refetch, ...rest } = useQuery([queryKey, isExecute], getSubCategoriesOptions, {
    enabled: isExecute,
  });

  useEffect(() => {
    if (isExecute) refetch();
  }, [queryKey, isExecute]);

  return { refetch, ...rest };
};

export default useGetSubCategoriesOptions;
