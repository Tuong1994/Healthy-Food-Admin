import { getApiQuery } from "../helper";
import { ApiQuery } from "../type";
import {
  Auth,
  AuthInfo,
  AuthChangePassword,
  AuthSignIn,
  AuthSignUp,
  AuthForgotPassword,
  AuthResetPassword,
} from "./type";
import Fetch from "..";
import localStorageKey from "@/common/constant/storage";
import authApiPaths from "./path";

export const signIn = async (query: ApiQuery, data: AuthSignIn) => {
  const response = await Fetch.Post<AuthSignIn, Auth>(authApiPaths.signIn + getApiQuery(query), data, 'signIn');
  return response;
};

export const signUp = async (data: AuthSignUp) => {
  const response = await Fetch.Post<AuthSignUp, AuthInfo>(authApiPaths.signUp, data, 'signUp');
  return response;
};

export const authenticate = async () => {
  const response = await Fetch.Get<Auth>(authApiPaths.authenticate);
  return response;
};

export const refresh = async () => {
  const response = await Fetch.Post<any, any>(authApiPaths.refresh, null);
  return response;
};

export const changePassword = async (query: ApiQuery, data: AuthChangePassword) => {
  const response = await Fetch.Post<AuthChangePassword, any>(
    authApiPaths.changePassword + getApiQuery(query),
    data,
    'changePassword'
  );
  return response;
};

export const forgotPassword = async (query: ApiQuery, data: AuthForgotPassword) => {
  const response = await Fetch.Post<AuthForgotPassword, any>(
    authApiPaths.forgotPassword + getApiQuery(query),
    data,
    'forgotPassword'
  );
  return response;
};

export const resetPassword = async (data: AuthResetPassword) => {
  const response = await Fetch.Put<AuthResetPassword, any>(authApiPaths.resetPassword, data, 'resetPassword');
  return response;
};

export const logout = async (query: ApiQuery) => {
  const response = await Fetch.Post<any, any>(authApiPaths.logout + getApiQuery(query), null, 'logout');
  if (response.success) localStorage.removeItem(localStorageKey.AUTH);
  return response;
};
