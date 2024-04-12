"use client";

import useSWR from "swr";
import { RiChargingPile2Fill } from "@remixicon/react";
import clsx from "clsx";
import { CustomCard } from "./ui/cards";
import { CardsSkeleton } from "./ui/skeletons";
import Paho from "paho-mqtt";
import { randomInt } from "crypto";
import { useEffect, useState } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Cards() {
  const { data: cardsData, isLoading } = useSWR(
    "/api/dashboard/cards",
    fetcher
  );
  const [connected, setConnected] = useState(false);
  const [robot, setRobot] = useState<{
    batteryPercent: Number;
    status: string;
  }>();

  function onMessageArrived(message: any) {
    if (message.destinationName === "robot") {
      setRobot(JSON.parse(message.payloadString));
      console.log(message.payloadString);
    }
  }

  useEffect(() => {
    const client = new Paho.Client(
      "192.168.100.24",
      Number(9001),
      "clientId-" + Math.random() * 1000
    );
    client.connect({
      onSuccess: () => {
        setConnected(true);
        client.subscribe("robot");
        client.onMessageArrived = onMessageArrived;
      },
      onFailure: () => {
        setConnected(false);
      },
    });
    return () => {
      client.disconnect();
      setConnected(false);
    };
  }, []);

  if (isLoading) return <CardsSkeleton />;

  if (!cardsData) return <p>Failed to load card data.</p>;

  const { patronsCount, booksCount, borrowedBooksCount } = cardsData;

  return (
    <>
      <CustomCard
        title="Total Patrons"
        value={patronsCount}
        type="patrons"
        trend="upward"
      />
      <CustomCard
        title="Total Books"
        value={booksCount}
        type="books"
        trend="downward"
      />
      <CustomCard
        title="Total Borrowed"
        value={borrowedBooksCount}
        type="borrowed"
        trend="flat"
      />
      <CustomCard title="LINAR">
        {robot ? (
          <div className="flex h-full items-center gap-4 m-1">
            <div className="relative h-full w-full rounded-2xl border-tremor-content dark:border-dark-tremor-content border-2 px-[2px] py-[5px]">
              <div
                className={clsx(
                  "h-full rounded-xl",
                  {
                    "bg-red-500": robot.batteryPercent.valueOf() <= 25,
                  },
                  {
                    "bg-orange-300":
                      robot.batteryPercent.valueOf() > 25 &&
                      robot.batteryPercent.valueOf() <= 50,
                  },
                  {
                    "bg-green-500":
                      robot.batteryPercent.valueOf() > 50 &&
                      robot.batteryPercent.valueOf() <= 100,
                  }
                )}
                style={{ width: `${robot.batteryPercent}%` }}
              ></div>
              {robot.status === "Charging" && (
                <RiChargingPile2Fill className="absolute left-1/2 top-1/2 w-8 -translate-x-1/2 -translate-y-1/2 text-tremor-content dark:text-dark-tremor-content fill-tremor-content dark:fill-dark-tremor-content" />
              )}
            </div>
            <p className="text-tremor-content dark:text-dark-tremor-content">
              {robot.status}
            </p>
          </div>
        ) : (
          <h1>Waiting for update</h1>
        )}
      </CustomCard>
    </>
  );
}
