"use client";

import { Card, DonutChart, Legend } from "@tremor/react";
import { CirculationChartSkeleton } from "./ui/skeletons";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CirculationPieChart() {
  const { data: circulationChartData, isLoading } = useSWR(
    "/api/dashboard/circulation-chart",
    fetcher
  );

  if (isLoading) return <CirculationChartSkeleton />;

  if (!circulationChartData) return <p>Failed to load circulation chart data.</p>;

  type CustomTooltipTypeDonut = {
    payload: any;
    active: boolean | undefined;
    label: any;
  };

  const customTooltip = (props: CustomTooltipTypeDonut) => {
    const { payload, active } = props;
    if (!active || !payload) return null;
    const categoryPayload = payload?.[0];
    if (!categoryPayload) return null;
    return (
      <div className="w-56 rounded-tremor-default border border-tremor-border dark:border-dark-tremor-border bg-tremor-background dark:bg-dark-tremor-background p-2 text-tremor-default shadow-tremor-dropdown">
        <div className="flex flex-1 space-x-2.5">
          <div
            className={`flex w-1.5 flex-col bg-${categoryPayload?.color}-500 rounded`}
          />
          <div className="w-full">
            <div className="flex items-center justify-between space-x-8">
              <p className="whitespace-nowrap text-right text-tremor-content dark:text-dark-tremor-content">
                {categoryPayload.name}
              </p>
              <p className="whitespace-nowrap text-right font-medium text-tremor-content-emphasis  dark:text-dark-tremor-content-emphasis">
                {categoryPayload.value}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="flex gap-2 h-full flex-col">
      <h3 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        Circulation
      </h3>
      <div className="flex flex-col gap-3 justify-between items-center">
        <Legend
          categories={["Borrowed", "Returned", "Overdue"]}
          colors={["blue", "green", "red"]}
        />
      </div>
      <DonutChart
        data={circulationChartData}
        category="transaction"
        index="transaction_status"
        variant="pie"
        colors={["blue", "green", "red"]}
        customTooltip={customTooltip}
        className="h-full"
      />
    </Card>
  );
}
