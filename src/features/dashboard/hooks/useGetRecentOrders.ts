import { getRecentOrders } from "@/services/statistic/api";
import { useQuery } from "react-query";

const useGetRecentOrders = () => {
  const queryKey = "getRecentOrders";

  const query = useQuery(queryKey, getRecentOrders);

  return query;
};

export default useGetRecentOrders;
