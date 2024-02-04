import { useEffect } from "react";
import { useLang } from "@/hooks";
import { useQuery } from "react-query";
import { getCities } from "@/services/city/api";
import { getApiQuery } from "@/services/helper";
import type { ApiQuery } from "@/services/type";
import useLocationStore from "@/store/LocationStore";

const useGetCities = (isExecute: boolean) => {
  const { locale } = useLang();

  const setCities = useLocationStore((state) => state.setCities);

  const apiQuery: ApiQuery = { langCode: locale };

  const queryKey = "getCities" + getApiQuery(apiQuery);

  const getCityList = async () => {
    const response = await getCities(apiQuery);
    return response;
  };

  const {
    data: response,
    isError,
    ...rest
  } = useQuery([queryKey, isExecute], getCityList, {
    enabled: isExecute,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!isExecute) return;
    if (isError) return;
    if (response && response.data) setCities(response.data?.items || []);
  }, [isExecute, response, isError]);

  return { response, isError, ...rest };
};

export default useGetCities;
