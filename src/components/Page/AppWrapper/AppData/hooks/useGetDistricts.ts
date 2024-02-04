import { useEffect } from "react";
import { useLang } from "@/hooks";
import { useQuery } from "react-query";
import { getDistricts } from "@/services/district/api";
import { getApiQuery } from "@/services/helper";
import type { ApiQuery } from "@/services/type";
import useLocationStore from "@/store/LocationStore";

const useGetDistricts = (cityCode: number) => {
  const { locale } = useLang();

  const setDistricts = useLocationStore((state) => state.setDistricts);

  const isExecute = Boolean(cityCode);

  const apiQuery: ApiQuery = { langCode: locale, cityCode: String(cityCode) };

  const queryKey = "getDistricts" + getApiQuery(apiQuery);

  const getDistrictList = async () => {
    const response = await getDistricts(apiQuery);
    return response;
  };

  const {
    data: response,
    isError,
    ...rest
  } = useQuery([queryKey, isExecute], getDistrictList, { enabled: isExecute, refetchOnWindowFocus: false });

  useEffect(() => {
    if (!isExecute) return;
    if (isError) return;
    if (response && response.data) setDistricts(response.data?.items || []);
  }, [response, isError, isExecute]);

  return { response, isError, ...rest };
};

export default useGetDistricts;
