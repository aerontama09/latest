import BooksTable from "@/components/BooksTable";

import { TableSkeleton } from "@/components/ui/skeletons";
import { Suspense } from "react";

export default function BooksPage() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <BooksTable />
    </Suspense>
  );
}
