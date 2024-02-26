import { StatisticGeneral, StatisticRevenue } from "./type";
import { List } from "../type";
import { Order } from "../order/type";
import Fetch from "..";
import statisticApiPaths from "./path";

export const getGeneral = async () => {
  const response = await Fetch.Get<StatisticGeneral>(statisticApiPaths.general);
  return response;
};

export const getRecentOrders = async () => {
  const response = await Fetch.Get<List<Order>>(statisticApiPaths.recentOrders);
  return response;
};

export const getChartRevenue = async () => {
  const response = await Fetch.Get<StatisticRevenue[]>(statisticApiPaths.chartRevenue);
  return response;
};
