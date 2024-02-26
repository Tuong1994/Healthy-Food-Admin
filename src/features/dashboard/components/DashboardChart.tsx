import { FC, useMemo } from "react";
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, TooltipProps } from "recharts";
import { InfoRow } from "@/components/UI";
import type { InfoRowProps } from "@/components/UI/InfoRow";
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import type { StatisticRevenue } from "@/services/statistic/type";
import { useLang } from "@/hooks";
import useGetChartRevenue from "../hooks/useGetChartRevenue";
import moment from "moment";

interface DashboardChartProps {}

const DashboardChart: FC<DashboardChartProps> = () => {
  const { lang } = useLang();

  const { data: response } = useGetChartRevenue();

  const data: StatisticRevenue[] = useMemo(() => {
    if (!response) return [];
    if (!response.success) return [];
    const items = response.data;
    return items.map((item) => ({ date: moment(item.date).format("DD/MM"), total: item.total })) || [];
  }, [response]);

  const totalNumberFormat = (total: number) => {
    const billions = 1000000000;
    const millions = 1000000;
    const thousands = 1000;
    if (total >= billions) return (total / billions).toString() + "B";
    if (total >= millions) return (total / millions).toString() + "M";
    if (total >= thousands) return (total / thousands).toString() + "K";
    return total.toString();
  };

  const renderTooltipContent = (props: TooltipProps<ValueType, NameType>) => {
    const { active, label, payload } = props;
    if (!active || !payload) return null;
    if (!payload.length) return null;
    const infoRowProps: InfoRowProps = {
      labelProps: { size: 10 },
      textProps: { size: 12 },
      labelSpanProps: { span: 12 },
      textSpanProps: { span: 8 },
    };
    return (
      <div className="chart-tooltip">
        <InfoRow {...infoRowProps} label={lang.dashboard.tooltip.date} text={label} />
        <InfoRow
          {...infoRowProps}
          label={lang.dashboard.tooltip.total}
          text={payload[0].value?.toLocaleString()}
        />
      </div>
    );
  };

  return (
    <div className="dashboard-chart">
      <LineChart width={650} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis tickFormatter={totalNumberFormat} />
        <Tooltip wrapperClassName="chart-tooltip" content={(props) => renderTooltipContent(props)} />
        <Line type="monotone" dataKey="total" stroke="#10b981" strokeWidth={3} />
      </LineChart>
    </div>
  );
};

export default DashboardChart;
