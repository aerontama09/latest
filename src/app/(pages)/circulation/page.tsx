import CirculationTable from "@/components/CirculationTable";

import { TableSkeleton } from "@/components/ui/skeletons";
import { Suspense } from "react";

export default function CirculationPage() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <CirculationTable />
    </Suspense>
  );
}
