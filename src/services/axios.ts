import axios, { AxiosResponse } from "axios";
import { Auth } from "./auth/type";
import authApiPaths from "./auth/path";
import localStorageKey from "@/common/constant/storage";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/";

export const HttpStatus = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  GATEWAY_TIME_OUT: 504,
  INTERNAL_SERVER: 500,
};

const Axios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (typeof window === "undefined") return Promise.reject(error);
    if (error?.code === HttpStatus.GATEWAY_TIME_OUT) return Promise.reject(error);
    const config = error?.config;
    const response = error?.response;
    if (localStorage.getItem(localStorageKey.AUTH)) {
      const raw = localStorage.getItem(localStorageKey.AUTH);
      if (!raw) return Promise.reject(error);
      const auth = JSON.parse(raw) as Auth;
      if (!auth) return Promise.reject(error);
      if (!auth.isAuth) return Promise.reject(error);
      if (
        (response?.status === HttpStatus.UNAUTHORIZED || response?.status === HttpStatus.FORBIDDEN) &&
        !config?._retry
      ) {
        config._retry = true;
        try {
          await Axios.post(BASE_URL + authApiPaths.refresh);
          return Axios(config) as Promise<AxiosResponse>;
        } catch (error) {
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default Axios;
