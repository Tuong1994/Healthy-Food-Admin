import { useLang } from "..";
import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getApiQuery } from "@/services/helper";
import type { ApiQuery } from "@/services/type";
import utils from "@/utils";

const useUrlQuery = (apiQuery: ApiQuery) => {
  const { locale } = useLang();

  const [searchParams, setSearchParams] = useSearchParams();

  const queryString = getApiQuery(apiQuery);

  const setQuery = useCallback(() => {
    const query = utils.formatQuery(apiQuery);
    setSearchParams({ langCode: locale, ...query });
  }, [queryString, locale]);

  useEffect(() => {
    setQuery();
  }, [queryString, locale]);

  const query = Object.fromEntries(searchParams) as ApiQuery;

  return { query, searchParams, setSearchParams };
};

export default useUrlQuery;
