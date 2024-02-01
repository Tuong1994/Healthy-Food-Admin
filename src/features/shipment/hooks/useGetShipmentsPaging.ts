import { useEffect } from "react";
import { getApiQuery } from "@/services/helper";
import { getShipments } from "@/services/shipment/api";
import { useQuery } from "react-query";
import type { ApiQuery } from "@/services/type";
import useUrlQuery from "@/hooks/features/useUrlQuery";

const useGetShipmentsPaging = (apiQuery: ApiQuery) => {
  const { query } = useUrlQuery(apiQuery);

  const queryKey = "getShipmentsPaging" + getApiQuery(query);

  const getShipmentsPaging = async () => {
    const response = await getShipments(query);
    return response;
  };

  const { refetch, ...rest } = useQuery(queryKey, getShipmentsPaging);

  useEffect(() => {
    refetch();
  }, [queryKey]);

  return { refetch, ...rest };
};

export default useGetShipmentsPaging;
