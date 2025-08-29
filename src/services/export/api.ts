import { getApiQuery } from "../helper";
import { ApiQuery } from "../type";
import Fetch from "..";
import exportApiPaths from "./path";

export const userExport = async (query: ApiQuery) => {
  const response = await Fetch.Get<any>(exportApiPaths.user + getApiQuery(query), "userExport", {
    responseType: "blob",
  });
  return response;
};

export const categoryExport = async (query: ApiQuery) => {
  const response = await Fetch.Get<any>(exportApiPaths.category + getApiQuery(query), "categoryExport", {
    responseType: "blob",
  });
  return response;
};

export const subCategoryExport = async (query: ApiQuery) => {
  const response = await Fetch.Get<any>(
    exportApiPaths.subCategory + getApiQuery(query),
    "subCategoryExport",
    {
      responseType: "blob",
    }
  );
  return response;
};

export const productExport = async (query: ApiQuery) => {
  const response = await Fetch.Get<any>(exportApiPaths.product + getApiQuery(query), "productExport", {
    responseType: "blob",
  });
  return response;
};

export const orderExport = async (query: ApiQuery) => {
  const response = await Fetch.Get<any>(exportApiPaths.order + getApiQuery(query), "orderExport", {
    responseType: "blob",
  });
  return response;
};

export const shipmentExport = async (query: ApiQuery) => {
  const response = await Fetch.Get<any>(exportApiPaths.shipment + getApiQuery(query), "shipmentExport", {
    responseType: "blob",
  });
  return response;
};
