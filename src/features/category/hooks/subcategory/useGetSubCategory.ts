import { useEffect } from "react";
import { useQuery } from "react-query";
import { getApiQuery } from "@/services/helper";
import { getSubCategory } from "@/services/subcategory/api";
import type { ApiQuery } from "@/services/type";

const useGetSubCategory = (apiQuery: ApiQuery, isUpdate: boolean) => {
  const queryKey = "getSubCategory" + getApiQuery(apiQuery);

  const getSubCategoryDetail = async () => {
    const response = await getSubCategory(apiQuery);
    return response;
  };

  const { refetch, ...rest } = useQuery([queryKey, isUpdate], getSubCategoryDetail, { enabled: isUpdate });

  useEffect(() => {
    if (isUpdate) refetch();
  }, [queryKey, isUpdate]);

  return { refetch, ...rest };
};

export default useGetSubCategory;
