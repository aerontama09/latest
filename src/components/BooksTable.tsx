"use client";

import useSWR from "swr";
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
import { TableSkeleton } from "./ui/skeletons";
import { RiMoreLine } from "@remixicon/react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BooksTable() {
  const { data: books, isLoading } = useSWR(
    "/api/books?withAuthors=true",
    fetcher
  );

  if (isLoading) return <TableSkeleton />;

  if (!books) return <p>Failed to load books.</p>;

  return (
    <Card>
      <h3 className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
        Book List
      </h3>
      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>
              <input type="checkbox" />
            </TableHeaderCell>
            <TableHeaderCell>Book ID</TableHeaderCell>
            <TableHeaderCell>Title</TableHeaderCell>
            <TableHeaderCell>Category</TableHeaderCell>
            <TableHeaderCell>Author</TableHeaderCell>
            <TableHeaderCell>Shelf</TableHeaderCell>
            <TableHeaderCell>Tier</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>More</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book: any) => (
            <TableRow key={book.book_id}>
              <TableCell>
                <input type="checkbox" />
              </TableCell>
              <TableCell>{book.book_id}</TableCell>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.category}</TableCell>
              <TableCell>{book.name}</TableCell>
              <TableCell>{book.shelf}</TableCell>
              <TableCell>{book.tier}</TableCell>
              <TableCell>
                <Badge
                  color={
                    book.book_status === "Borrowed" ||
                    book.book_status === "In Use"
                      ? "blue"
                      : book.book_status === "Lost" ||
                        book.book_status === "Missing" ||
                        book.book_status === "Misshelved"
                      ? "red"
                      : "green"
                  }
                >
                  {book.book_status}
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
