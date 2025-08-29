import { getApiQuery } from "../helper";
import { ApiQuery, List, Paging } from "../type";
import { Category } from "./type";
import categoryApiPaths from "./path";
import Fetch from "..";

export const getCategories = async (query: ApiQuery) => {
  const response = await Fetch.Get<List<Category>>(categoryApiPaths.getList + getApiQuery(query));
  return response;
};

export const getCategoriesPaging = async (query: ApiQuery) => {
  const response = await Fetch.Get<Paging<Category>>(categoryApiPaths.getListPaging + getApiQuery(query));
  return response;
};

export const getCategory = async (query: ApiQuery) => {
  const response = await Fetch.Get<Category>(categoryApiPaths.getDetail + getApiQuery(query));
  return response;
};

export const createCategory = async (data: FormData) => {
  const response = await Fetch.Post<FormData, Category>(categoryApiPaths.create, data, "createCategory");
  return response;
};

export const updateCategory = async (query: ApiQuery, data: FormData) => {
  const response = await Fetch.Put<FormData, any>(categoryApiPaths.update + getApiQuery(query), data, "updateCategory");
  return response;
};

export const removeCategories = async (query: ApiQuery) => {
  const response = await Fetch.Delete<any>(categoryApiPaths.remove + getApiQuery(query), "removeCategories");
  return response;
};
