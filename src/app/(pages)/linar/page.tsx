import LinarCards from "@/components/LinarCards";
import { LinarCardsSkeleton } from "@/components/ui/skeletons";
import { Suspense } from "react";

export default function LinarPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-3 gap-6">
        <Suspense fallback={<LinarCardsSkeleton />}>
          <LinarCards />
        </Suspense>
      </div>
    </div>
  );
}
