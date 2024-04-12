"use client";

import {
  RiUserLine,
  RiBook2Line,
  RiBookmark2Line,
  RiArrowUpLine,
  RiArrowDownLine,
  RiArrowRightLine,
} from "@remixicon/react";
import clsx from "clsx";
import { Card } from "@tremor/react";

const iconMap = {
  patrons: RiUserLine,
  books: RiBook2Line,
  borrowed: RiBookmark2Line,
};

const TrendIconMap = {
  upward: RiArrowUpLine,
  downward: RiArrowDownLine,
  flat: RiArrowRightLine,
};

export function CustomCard({
  children = null,
  title,
  value,
  type,
  trend,
}: {
  children?: React.ReactNode;
  title: string;
  value?: Number | string;
  type?: "patrons" | "books" | "borrowed";
  trend?: "upward" | "downward" | "flat";
}) {
  const Icon = type ? iconMap[type] : null;
  const TrendIcon = trend ? TrendIconMap[trend] : null;

  return (
    <Card className="flex flex-col">
      <div className="flex">
        <h3 className="text-sm font-medium text-tremor-content dark:text-dark-tremor-content">
          {title}
        </h3>
      </div>
      {children ? (
        children
      ) : (
        <>
          <div className="flex items-center justify-between">
            <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
              {value?.valueOf()}
            </p>
            <div className="rounded-full p-2 bg-tremor-brand-faint dark:bg-dark-tremor-brand-muted">
              {Icon ? (
                <Icon className="w-6 text-tremor-brand dark:text-dark-tremor-brand" />
              ) : null}
            </div>
          </div>
          <div
            className={clsx(
              "flex gap-1",
              {
                "text-green-500": trend === "upward",
              },
              {
                "text-red-500": trend === "downward",
              },
              {
                "text-yellow-500": trend === "flat",
              }
            )}
          >
            <p className="text-lg">5%</p>
            {TrendIcon ? <TrendIcon className="w-5" /> : null}
          </div>
        </>
      )}
    </Card>
  );
}
