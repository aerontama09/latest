"use client";

import clsx from "clsx";
import {
  Button,
  MultiSelect,
  MultiSelectItem,
  ProgressBar,
  SearchSelect,
  SearchSelectItem,
} from "@tremor/react";
import { CustomCard } from "./ui/cards";
import { RiChargingPile2Fill, RiCloseLine, RiPlayLine } from "@remixicon/react";
import { LinarCardsSkeleton } from "./ui/skeletons";
import useSWR from "swr";
import { useEffect, useState } from "react";
import Paho from "paho-mqtt";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

let client: Paho.Client;

export default function LinarCards() {
  const { data, isLoading } = useSWR("/api/books/total", fetcher);
  const { data: books, isLoading: isBooksLoading } = useSWR(
    "/api/books",
    fetcher
  );
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);

  const [connected, setConnected] = useState(false);
  const [status, setStatus] = useState<string>();
  const [battery, setBattery] = useState<Number>(0);
  const [libCheckProgress, setLibCheckProgress] = useState(0);

  function onMessageArrived(message: any) {
    if (message.destinationName === "robot/status") {
      setStatus(message.payloadString);
    } else if (message.destinationName === "robot/battery") {
      setBattery(Number(message.payloadString));
    } else if (message.destinationName === "robot/booksScanned") {
      const booksScanned = Number(message.payloadString);
      const progress = (booksScanned / data.bookTotal) * 100;
      setLibCheckProgress(progress);
    }
  }

  useEffect(() => {
    client = new Paho.Client(
      "192.168.100.24",
      Number(9001),
      "clientId-" + Math.random() * 1000
    );
    client.connect({
      onSuccess: () => {
        setConnected(true);
        client.subscribe("robot/status");
        client.subscribe("robot/battery");
        client.subscribe("robot/booksScanned");
        client.subscribe("robot/booksToFind");
        client.onMessageArrived = onMessageArrived;
      },
      onFailure: () => {
        setConnected(false);
      },
    });
    return () => {
      if (connected) {
        client.disconnect();
        setConnected(false);
      }
    };
  }, [connected]);

  const handlSearch = () => {
    let message;
    message = new Paho.Message(JSON.stringify(selectedBooks));
    message.destinationName = "robot/booksToFind";
    client.send(message);
    message = new Paho.Message("Finding");
    message.destinationName = "robot/status";
    client.send(message);
  };

  const handlValueChanged = (value: string[]) => {
    setSelectedBooks(value);
  };

  // function handleChange(value: string) {
  //   if (!value || selectedBooks.includes(value)) return;
  //   setSelectedBooks([...selectedBooks, value]);
  // }

  if (isLoading) return <LinarCardsSkeleton />;

  if (!data) return <p>Failed to load data.</p>;

  return (
    <>
      <CustomCard title="Battery">
        {connected ? (
          <div className="flex h-full items-center justify-center gap-4 m-1">
            <div className="relative flex items-end h-44 w-16 rounded-2xl border-tremor-content dark:border-dark-tremor-content border-2 p-1">
              <div
                className={clsx(
                  "w-full rounded-xl",
                  {
                    "bg-red-500": battery.valueOf() <= 25,
                  },
                  {
                    "bg-orange-300":
                      battery.valueOf() > 25 && battery.valueOf() <= 50,
                  },
                  {
                    "bg-green-500":
                      battery.valueOf() > 50 && battery.valueOf() <= 100,
                  }
                )}
                style={{ height: `${battery}%` }}
              ></div>
              {status === "Charging" && (
                <RiChargingPile2Fill className="absolute left-1/2 top-1/2 w-8 -translate-x-1/2 -translate-y-1/2 text-tremor-content dark:text-dark-tremor-content fill-tremor-content dark:fill-dark-tremor-content" />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-content-strong dark:text-dark-tremor-content-strong text-3xl">
                {battery.valueOf()}%
              </h3>
              <p className="text-tremor-content dark:text-dark-tremor-content">
                {status}
              </p>
              <Button className="dark:text-dark-tremor-content-emphasis">
                Return to Dock
              </Button>
            </div>
          </div>
        ) : (
          <h1>Disconnected</h1>
        )}
      </CustomCard>
      <CustomCard title="Inventory Check">
        <div className="flex flex-col gap-4 mt-2">
          {isBooksLoading ? (
            <h3>Loading books</h3>
          ) : books ? (
            // <SearchSelect
            //   placeholder="Search"
            //   defaultValue={books[0].title}
            //   onValueChange={handleChange}
            // >
            //   {books.map((book: any) => (
            //     <SearchSelectItem key={book.book_id} value={book.book_id}>
            //       {book.title}
            //     </SearchSelectItem>
            //   ))}
            // </SearchSelect>
            <MultiSelect placeholder="Search" onValueChange={handlValueChanged}>
              {books.map((book: any) => (
                <MultiSelectItem key={book.book_id} value={book.book_id}>
                  {book.title}
                </MultiSelectItem>
              ))}
            </MultiSelect>
          ) : (
            <h1>Error loading books</h1>
          )}
          {/* <div className="overflow-y-auto no-scrollbar">
            <div className="flex flex-wrap gap-1 ">
              {selectedBooks.map((book: any) => (
                <span
                  key={book}
                  className="flex gap-2 px-4 py-1 text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis bg-tremor-background-subtle dark:bg-dark-tremor-background-subtle rounded-full"
                >
                  {book}
                  <RiCloseLine className="w-4 cursor-pointer" />
                </span>
              ))}
            </div>
          </div> */}
          <Button
            loadingText="Searching..."
            loading={status === "Finding"}
            icon={RiPlayLine}
            onClick={handlSearch}
          >
            Start
          </Button>
        </div>
      </CustomCard>
      <CustomCard title="Progress">
        <div className="flex flex-col gap-4 mt-2">
          <h3 className="text-tremor-content-strong text-center dark:text-dark-tremor-content-strong text-3xl">
            {libCheckProgress.toFixed(2)}%
          </h3>
          <ProgressBar
            showAnimation={true}
            value={libCheckProgress}
            color="green"
          />
          <Button loadingText="Checking..." icon={RiPlayLine}>
            Check Inventory
          </Button>
        </div>
      </CustomCard>
    </>
  );
}
