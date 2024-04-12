"use client";

import useSWR from "swr";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { TableSkeleton } from "./ui/skeletons";
import { RiMoreLine } from "@remixicon/react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PatronsTable() {
  const { data: patrons, isLoading } = useSWR("/api/patrons", fetcher);

  if (isLoading) return <TableSkeleton />;

  if (!patrons) return <p>Failed to load patrons.</p>;

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
            <TableHeaderCell>Library ID</TableHeaderCell>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Phone No.</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>School</TableHeaderCell>
            <TableHeaderCell>Year Level</TableHeaderCell>
            <TableHeaderCell>More</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patrons.map((patron: any) => (
            <TableRow key={patron.patron_id}>
              <TableCell>
                <input type="checkbox" />
              </TableCell>
              <TableCell>{patron.patron_id}</TableCell>
              <TableCell>{patron.name}</TableCell>
              <TableCell>{patron.phone}</TableCell>

              <TableCell>{patron.email}</TableCell>
              <TableCell>{patron.school}</TableCell>
              <TableCell>{patron.year_level}</TableCell>
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
