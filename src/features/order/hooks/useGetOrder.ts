import { useEffect } from "react";
import { useQuery } from "react-query";
import { getApiQuery } from "@/services/helper";
import { getOrder } from "@/services/order/api";
import type { ApiQuery } from "@/services/type";

const useGetOrder = (apiQuery: ApiQuery, isUpdate: boolean) => {
  const queryKey = "getOrder" + getApiQuery(apiQuery);

  const getOrderDetail = async () => {
    const response = await getOrder(apiQuery);
    return response;
  };

  const { refetch, ...rest } = useQuery([queryKey, isUpdate], getOrderDetail, { enabled: isUpdate });

  useEffect(() => {
    if (isUpdate) refetch();
  }, [queryKey, isUpdate]);

  return { refetch, ...rest };
};

export default useGetOrder