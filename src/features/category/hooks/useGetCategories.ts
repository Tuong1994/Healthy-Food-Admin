import { getCategoriesPaging } from "@/services/category/api";
import { useSearchParams } from "react-router-dom";
import { useLang } from "@/hooks";
import { useQuery } from "react-query";
import type { ApiQuery } from "@/services/type";

const useGetCategories = () => {
  const { locale } = useLang();

  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page"));

  const limit = Number(searchParams.get("limit"));

  const queryKey = `getCategoriesPaging?page=${page}&limit=${limit}&langCode=${locale}`;

  const getCategories = async () => {
    const apiQuery: ApiQuery = { page, limit, langCode: locale };
    const response = await getCategoriesPaging(apiQuery);
    return response;
  };

  const queryResult = useQuery(queryKey, getCategories);

  return queryResult;
};

export default useGetCategories;
