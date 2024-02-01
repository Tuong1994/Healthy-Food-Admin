import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ApiQuery } from "@/services/type";
import { getApiQuery } from "@/services/helper";
import { useLang } from "..";
import utils from "@/utils";

const useUrlQuery = (apiQuery: ApiQuery) => {
  const { locale } = useLang();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const query = utils.formatQuery(apiQuery);
    setSearchParams({ langCode: locale, ...query });
  }, [getApiQuery(apiQuery), locale]);

  const query = Object.fromEntries(searchParams) as ApiQuery;

  return { query, searchParams, setSearchParams };
};

export default useUrlQuery;
