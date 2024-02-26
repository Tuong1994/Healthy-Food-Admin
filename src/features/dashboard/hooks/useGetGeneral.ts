import { useQuery } from "react-query";
import { getGeneral } from "@/services/statistic/api";

const useGetGeneral = () => {
  const queryKey = "getGeneral";

  const query = useQuery(queryKey, getGeneral);

  return query;
};

export default useGetGeneral;
