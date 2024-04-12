"use client";

import useSWR from "swr";
import { AreaChart, Card } from "@tremor/react";
import { UsersChartSkeletion } from "./ui/skeletons";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function UsersTrendChart() {
  const { data: usersChartData, isLoading } = useSWR(
    "/api/dashboard/users-trend",
    fetcher
  );

  if (isLoading) return <UsersChartSkeletion />;

  if (!usersChartData) return <p>Failed to load users chart data.</p>;

  return (
    <Card className="flex flex-col">
      <h3 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        LINAR User Trend
      </h3>
      <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
        {usersChartData.reduce(
          (accumulator: number, currentValue: any) =>
            accumulator + currentValue.patronsCount,
          0
        )}
      </p>
      <AreaChart
        data={usersChartData}
        index="date"
        yAxisWidth={65}
        categories={["patronsCount"]}
        colors={["red"]}
        showYAxis={false}
        showLegend={false}
        curveType="monotone"
      />
    </Card>
  );
}
