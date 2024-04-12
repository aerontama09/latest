import Cards from "@/components/Cards";
import CirculationPieChart from "@/components/CirculationPieChart";
import RecentTransactionsTable from "@/components/RecentTransactions";
import UsersTrendChart from "@/components/UsersTrendChart";
import {
  CardsSkeleton,
  CirculationChartSkeleton,
  RecentTransactionsSkeleton,
  UsersChartSkeletion,
} from "@/components/ui/skeletons";
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-4 gap-6">
        <Suspense fallback={<CardsSkeleton />}>
          <Cards />
        </Suspense>
      </div>
      <div className="grid grid-cols-10 gap-4">
        <div className="col-span-7">
          <Suspense fallback={<UsersChartSkeletion />}>
            <UsersTrendChart />
          </Suspense>
        </div>
        <div className="col-span-3">
          <Suspense fallback={<CirculationChartSkeleton />}>
            <CirculationPieChart />
          </Suspense>
        </div>
      </div>
      <Suspense fallback={<RecentTransactionsSkeleton />}>
        <RecentTransactionsTable />
      </Suspense>
    </div>
  );
}
