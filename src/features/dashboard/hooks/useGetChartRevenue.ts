import { getChartRevenue } from "@/services/statistic/api";
import { useQuery } from "react-query";

const useGetChartRevenue = () => {
  const queryKey = "getChartRevenue";

  const query = useQuery(queryKey, getChartRevenue);

  return query;
};

export default useGetChartRevenue;
