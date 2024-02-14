import { useEffect } from "react";
import { useQuery } from "react-query";
import { getApiQuery } from "@/services/helper";
import { getProduct } from "@/services/product/api";
import type { ApiQuery } from "@/services/type";

const useGetProduct = (apiQuery: ApiQuery, isUpdate: boolean) => {
  const queryKey = "getProduct" + getApiQuery(apiQuery);

  const getProductDetail = async () => {
    const response = await getProduct(apiQuery);
    return response;
  };

  const { refetch, ...rest } = useQuery([queryKey, isUpdate], getProductDetail, { enabled: isUpdate });

  useEffect(() => {
    if (isUpdate) refetch();
  }, [queryKey, isUpdate]);

  return { refetch, ...rest };
};

export default useGetProduct;
