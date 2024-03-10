import { getApiQuery } from "../helper";
import { ApiQuery } from "../type";
import { UserPermission, UserPermissionRequest } from "./type";
import Fetch from "..";
import settingApiPaths from "./path";

export const getUserPermission = async (query: ApiQuery) => {
  const response = await Fetch.Get<UserPermission>(settingApiPaths.userPermission + getApiQuery(query));
  return response;
};

export const settingPermission = async (data: UserPermissionRequest) => {
  const response = await Fetch.Put<UserPermissionRequest, any>(settingApiPaths.settingPermission, data);
  return response;
};
