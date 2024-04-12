"use client";

import {
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import useSWR from "swr";
import { RecentTransactionsSkeleton } from "./ui/skeletons";
import {
  RiAlarmWarningLine,
  RiCheckboxCircleLine,
  RiMoreLine,
} from "@remixicon/react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function RecentTransactionsTable() {
  const page = 1;
  const size = 5;
  const { data: recentTransactions, isLoading } = useSWR(
    `/api/transactions?page=${page}&size=${size}`,
    fetcher
  );

  if (isLoading) return <RecentTransactionsSkeleton />;

  if (!recentTransactions) return <p>Failed to load recent transactions.</p>;

  return (
    <Card className="flex gap-2 h-full flex-col">
      <h3 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        Recent Transactions
      </h3>
      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Book</TableHeaderCell>
            <TableHeaderCell>Date Borrowed</TableHeaderCell>
            <TableHeaderCell>Date Returned</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recentTransactions.map((transaction: any) => (
            <TableRow key={transaction.id.valueOf()}>
              <TableCell>
                <p className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  {transaction.name}
                </p>
                <p>{transaction.patron_id}</p>
              </TableCell>
              <TableCell>
                <p className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  {transaction.title.valueOf()}
                </p>
                <p>{transaction.book_id.valueOf()}</p>
              </TableCell>
              <TableCell>
                <p className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  {new Date(transaction.date_borrowed).toLocaleDateString()}
                </p>
                <p>{new Date(transaction.date_borrowed).toLocaleTimeString()}</p>
              </TableCell>
              <TableCell>
                <p className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  {transaction.date_returned
                    ? new Date(transaction.date_returned).toLocaleDateString()
                    : "--"}
                </p>
                <p>
                  {transaction.date_returned
                    ? new Date(transaction.date_returned).toLocaleTimeString()
                    : "--"}
                </p>
              </TableCell>
              <TableCell>
                <Badge
                  color={
                    transaction.transaction_status === "Borrowed"
                      ? "blue"
                      : transaction.transaction_status === "Overdue"
                      ? "red"
                      : "green"
                  }
                  icon={
                    transaction.transaction_status === "Borrowed"
                      ? RiMoreLine
                      : transaction.transaction_status === "Overdue"
                      ? RiAlarmWarningLine
                      : RiCheckboxCircleLine
                  }
                >
                  {transaction.transaction_status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
