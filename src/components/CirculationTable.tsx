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
import { TableSkeleton } from "./ui/skeletons";
import {
  RiAlarmWarningLine,
  RiCheckboxCircleLine,
  RiMoreLine,
} from "@remixicon/react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CirculationTable() {
  const { data: transactions, isLoading } = useSWR(
    "/api/transactions",
    fetcher
  );

  if (isLoading) return <TableSkeleton />;

  if (!transactions) return <p>Failed to load transactions.</p>;

  return (
    <Card>
      <h3 className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
        Patron List
      </h3>
      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>
              <input type="checkbox" />
            </TableHeaderCell>
            <TableHeaderCell>Circulation No.</TableHeaderCell>
            <TableHeaderCell>Book ID</TableHeaderCell>
            <TableHeaderCell>Title</TableHeaderCell>
            <TableHeaderCell>Library ID</TableHeaderCell>
            <TableHeaderCell>Borrower</TableHeaderCell>
            <TableHeaderCell>Date Borrowed</TableHeaderCell>
            <TableHeaderCell>Date Returned</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction: any) => (
            <TableRow key={transaction.id}>
              <TableCell>
                <input type="checkbox" />
              </TableCell>
              <TableCell>{transaction.id}</TableCell>
              <TableCell>{transaction.book_id}</TableCell>
              <TableCell>{transaction.title}</TableCell>
              <TableCell>{transaction.patron_id}</TableCell>
              <TableCell>{transaction.name}</TableCell>
              <TableCell>
                {new Date(transaction.date_borrowed).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {transaction.date_returned
                  ? new Date(transaction.date_returned).toLocaleDateString()
                  : "--"}
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
              <TableCell>
                <RiMoreLine className="w-6 cursor-pointer text-tremor-content dark:text-dark-tremor-content" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
