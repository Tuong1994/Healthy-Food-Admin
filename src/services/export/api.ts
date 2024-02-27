import { getApiQuery } from "../helper";
import { ApiQuery } from "../type";
import Fetch from "..";
import exportApiPaths from "./path";

export const customerExport = async (query: ApiQuery) => {
  const response = await Fetch.Get<any>(exportApiPaths.customer + getApiQuery(query), {
    responseType: "blob",
  });
  return response;
};

export const categoryExport = async (query: ApiQuery) => {
  const response = await Fetch.Get<any>(exportApiPaths.category + getApiQuery(query), {
    responseType: "blob",
  });
  return response;
};

export const subCategoryExport = async (query: ApiQuery) => {
  const response = await Fetch.Get<any>(exportApiPaths.subCategory + getApiQuery(query), {
    responseType: "blob",
  });
  return response;
};

export const productExport = async (query: ApiQuery) => {
  const response = await Fetch.Get<any>(exportApiPaths.product + getApiQuery(query), {
    responseType: "blob",
  });
  return response;
};

export const orderExport = async (query: ApiQuery) => {
  const response = await Fetch.Get<any>(exportApiPaths.order + getApiQuery(query), { responseType: "blob" });
  return response;
};

export const shipmentExport = async (query: ApiQuery) => {
  const response = await Fetch.Get<any>(exportApiPaths.shipment + getApiQuery(query), {
    responseType: "blob",
  });
  return response;
};
