import { useEffect } from "react";
import { useQuery } from "react-query";
import { getApiQuery } from "@/services/helper";
import { getProductsPaging } from "@/services/product/api";
import type { ApiQuery } from "@/services/type";

const useGetProductsOptions = (apiQuery: ApiQuery) => {
  const queryKey = "getProductsOptions" + getApiQuery(apiQuery);

  const getProductsOptions = async () => {
    const response = await getProductsPaging(apiQuery);
    return response;
  };

  const { refetch, ...rest } = useQuery(queryKey, getProductsOptions);

  useEffect(() => {
    refetch();
  }, [queryKey]);

  return { refetch, ...rest };
};

export default useGetProductsOptions;
