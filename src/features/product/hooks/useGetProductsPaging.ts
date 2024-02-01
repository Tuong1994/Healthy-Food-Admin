import { getProductsPaging } from "@/services/product/api";
import { useQuery } from "react-query";
import { useEffect } from "react";
import { getApiQuery } from "@/services/helper";
import type { ApiQuery } from "@/services/type";
import useUrlQuery from "@/hooks/features/useUrlQuery";

const useGetProductsPaging = (apiQuery: ApiQuery) => {
  const { query } = useUrlQuery(apiQuery);

  const queryKey = "getProductsPaging" + getApiQuery(query);

  const getProducts = async () => {
    const response = await getProductsPaging(query);
    return response;
  };

  const { refetch, ...rest } = useQuery(queryKey, getProducts);

  useEffect(() => {
    refetch();
  }, [queryKey]);

  return { refetch, ...rest };
};

export default useGetProductsPaging;
