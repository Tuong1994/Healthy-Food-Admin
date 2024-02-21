import { useEffect } from "react";
import { useQuery } from "react-query";
import { getApiQuery } from "@/services/helper";
import { getShipment } from "@/services/shipment/api";
import type { ApiQuery } from "@/services/type";

const useGetShipment = (apiQuery: ApiQuery) => {
  const queryKey = "getShipment" + getApiQuery(apiQuery);

  const getShipmentDetail = async () => {
    const response = await getShipment(apiQuery);
    return response;
  };

  const { refetch, ...rest } = useQuery(queryKey, getShipmentDetail);

  useEffect(() => {
    refetch();
  }, [queryKey]);

  return { refetch, ...rest };
};

export default useGetShipment;
