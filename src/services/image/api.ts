import { ApiQuery } from "../type";
import { getApiQuery } from "../helper";
import { ImageUpload } from "./type";
import Fetch from "..";
import imageApiPaths from "./path";

export const customerUpload = async (query: ApiQuery, data: FormData) => {
  const response = await Fetch.Post<FormData, ImageUpload>(
    imageApiPaths.customerUpload + getApiQuery(query),
    data,
    "customerUpload"
  );
  return response;
};

export const productUpload = async (query: ApiQuery, data: FormData) => {
  const response = await Fetch.Post<FormData, ImageUpload>(
    imageApiPaths.productUpload + getApiQuery(query),
    data,
    "productUpload"
  );
  return response;
};

export const removeImages = async (query: ApiQuery) => {
  const response = await Fetch.Delete<any>(imageApiPaths.remove + getApiQuery(query), "removeImages");
  return response;
};
