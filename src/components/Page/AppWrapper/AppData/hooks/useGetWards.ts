import { useEffect } from "react";
import { useLang } from "@/hooks";
import { useQuery } from "react-query";
import { getApiQuery } from "@/services/helper";
import { getWards } from "@/services/ward/api";
import type { ApiQuery } from "@/services/type";
import useLocationStore from "@/store/LocationStore";

const useGetWards = (districtCode: number) => {
  const { locale } = useLang();

  const setWards = useLocationStore((state) => state.setWards);

  const isExecute = Boolean(districtCode);

  const apiQuery: ApiQuery = { langCode: locale, districtCode: String(districtCode) };

  const queryKey = "getWards" + getApiQuery(apiQuery);

  const getWardList = async () => {
    const response = await getWards(apiQuery);
    return response;
  };

  const {
    data: response,
    isError,
    ...rest
  } = useQuery([queryKey, isExecute], getWardList, {
    enabled: isExecute,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!isExecute) return;
    if (isError) return;
    if (response && response.data) setWards(response.data?.items || []);
  }, [response, isError, isExecute]);

  return { response, isError, ...rest };
};

export default useGetWards;
