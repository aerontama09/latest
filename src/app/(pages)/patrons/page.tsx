import PatronsTable from "@/components/PatronsTable";

import { TableSkeleton } from "@/components/ui/skeletons";
import { Suspense } from "react";

export default function PatronsPage() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <PatronsTable />
    </Suspense>
  );
}
