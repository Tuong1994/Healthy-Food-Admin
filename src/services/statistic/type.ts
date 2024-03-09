export type StatisticGeneral = {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
};

export type StatisticRevenue = {
  date: Date | string;
  total: number;
};
