import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";

// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-tremor-background/60 before:dark:via-dark-tremor-background/60 before:to-transparent";

export function CardSkeleton() {
  return (
    <Card className={`${shimmer} relative flex flex-col gap-1 overflow-hidden`}>
      <div className="h-4 w-24 rounded-md bg-tremor-content dark:bg-dark-tremor-content text-sm font-medium" />
      <div className="flex items-center justify-between">
        <div className=" h-8 w-24 truncate rounded-xl bg-tremor-content-strong dark:bg-dark-tremor-content-strong"></div>
        <div className=" h-10 w-10 truncate rounded-full bg-tremor-background dark:bg-dark-tremor-background border-tremor-border dark:border-dark-tremor-border border-2 flex items-center justify-center"></div>
      </div>
      <div className=" h-6 w-16 truncate rounded-lg bg-tremor-content dark:bg-dark-tremor-content"></div>
    </Card>
  );
}

export function CardSkeletonV2() {
  return (
    <Card className={`${shimmer} relative flex flex-col gap-1 overflow-hidden`}>
      <div className="h-6 w-24 rounded-md bg-tremor-content dark:bg-dark-tremor-content" />
      <div className="h-full w-full rounded-xl bg-tremor-content dark:bg-dark-tremor-content"></div>
    </Card>
  );
}

export function CardSkeletonV3() {
  return (
    <Card className={`${shimmer} relative flex flex-col gap-4 overflow-hidden`}>
      <div className="h-6 w-24 rounded-md bg-tremor-content dark:bg-dark-tremor-content" />
      <div className="h-44 w-full rounded-xl bg-tremor-content dark:bg-dark-tremor-content"></div>
    </Card>
  );
}

export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeletonV2 />
    </>
  );
}

export function UsersChartSkeletion() {
  return (
    <Card className={`${shimmer} relative flex flex-col gap-1 overflow-hidden`}>
      <div className="flex justify-between">
        <div className="h-6 w-24 rounded-md bg-tremor-content dark:bg-dark-tremor-content" />
        <div className="h-6 w-32 rounded-md bg-tremor-content dark:bg-dark-tremor-content" />
      </div>
      <div className="flex justify-between items-center">
        <div className=" h-8 w-24 truncate rounded-xl bg-tremor-content-strong dark:bg-dark-tremor-content-strong"></div>
        <div className="h-6 w-32 rounded-md bg-tremor-content dark:bg-dark-tremor-content" />
      </div>
      <div className="flex flex-col justify-between items-center h-60 p-1">
        <div className="h-[1px] w-full rounded-md bg-tremor-border dark:bg-dark-tremor-border" />
        <div className="h-[1px] w-full rounded-md bg-tremor-border dark:bg-dark-tremor-border" />
        <div className="h-[1px] w-full rounded-md bg-tremor-border dark:bg-dark-tremor-border" />
        <div className="h-[1px] w-full rounded-md bg-tremor-border dark:bg-dark-tremor-border" />
        <div className="h-[1px] w-full rounded-md bg-tremor-border dark:bg-dark-tremor-border" />
      </div>
      <div className="flex w-full items-center justify-between gap-2">
        <div className="bg-tremor-content dark:bg-dark-tremor-content h-6 w-16 rounded-md"></div>
        <div className="bg-tremor-content dark:bg-dark-tremor-content h-6 w-16 rounded-md"></div>
        <div className="bg-tremor-content dark:bg-dark-tremor-content h-6 w-16 rounded-md"></div>
        <div className="bg-tremor-content dark:bg-dark-tremor-content h-6 w-16 rounded-md"></div>
        <div className="bg-tremor-content dark:bg-dark-tremor-content h-6 w-16 rounded-md"></div>
        <div className="bg-tremor-content dark:bg-dark-tremor-content h-6 w-16 rounded-md"></div>
        <div className="bg-tremor-content dark:bg-dark-tremor-content h-6 w-16 rounded-md"></div>
        <div className="bg-tremor-content dark:bg-dark-tremor-content h-6 w-16 rounded-md"></div>
        <div className="bg-tremor-content dark:bg-dark-tremor-content h-6 w-16 rounded-md"></div>
        <div className="bg-tremor-content dark:bg-dark-tremor-content h-6 w-16 rounded-md"></div>
        <div className="bg-tremor-content dark:bg-dark-tremor-content h-6 w-16 rounded-md"></div>
        <div className="bg-tremor-content dark:bg-dark-tremor-content h-6 w-16 rounded-md"></div>
      </div>
    </Card>
  );
}

export function CirculationChartSkeleton() {
  return (
    <Card className={`${shimmer} relative flex flex-col gap-2 overflow-hidden`}>
      <div className="h-6 w-24 rounded-md bg-tremor-content dark:bg-dark-tremor-content" />
      <div className="flex items-center justify-center gap-4">
        <div className="h-6 w-24 rounded-md bg-tremor-content dark:bg-dark-tremor-content" />
        <div className="h-6 w-24 rounded-md bg-tremor-content dark:bg-dark-tremor-content" />
        <div className="h-6 w-24 rounded-md bg-tremor-content dark:bg-dark-tremor-content" />
      </div>
      <div className="flex justify-center">
        <div className="w-72 h-72 rounded-full bg-tremor-content dark:bg-dark-tremor-content"></div>
      </div>
    </Card>
  );
}

export function RecentTransactionsSkeleton() {
  return (
    <Card className={`${shimmer} relative flex flex-col gap-2 overflow-hidden`}>
      <div className="h-6 w-24 rounded-md bg-tremor-content dark:bg-dark-tremor-content" />
      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>
              <div className="bg-tremor-content-strong dark:bg-dark-tremor-content-strong w-16 h-5 rounded-md"></div>
            </TableHeaderCell>
            <TableHeaderCell>
              <div className="bg-tremor-content-strong dark:bg-dark-tremor-content-strong w-16 h-5 rounded-md"></div>
            </TableHeaderCell>
            <TableHeaderCell>
              <div className="bg-tremor-content-strong dark:bg-dark-tremor-content-strong w-24 h-5 rounded-md"></div>
            </TableHeaderCell>
            <TableHeaderCell>
              <div className="bg-tremor-content-strong dark:bg-dark-tremor-content-strong w-24 h-5 rounded-md"></div>
            </TableHeaderCell>
            <TableHeaderCell>
              <div className="bg-tremor-content-strong dark:bg-dark-tremor-content-strong w-16 h-5 rounded-md"></div>
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(3)].map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="bg-tremor-content-strong dark:bg-dark-tremor-content-strong w-24 h-4 rounded-md mb-1"></div>
                <div className="bg-tremor-content dark:bg-dark-tremor-content w-28 h-4 rounded-md"></div>
              </TableCell>
              <TableCell>
                <div className="bg-tremor-content-strong dark:bg-dark-tremor-content-strong w-24 h-4 rounded-md mb-1"></div>
                <div className="bg-tremor-content dark:bg-dark-tremor-content w-4 h-4 rounded-md"></div>
              </TableCell>
              <TableCell>
                <div className="bg-tremor-content-strong dark:bg-dark-tremor-content-strong w-24 h-4 rounded-md mb-1"></div>
                <div className="bg-tremor-content dark:bg-dark-tremor-content w-24 h-4 rounded-md"></div>
              </TableCell>
              <TableCell>
                <div className="bg-tremor-content-strong dark:bg-dark-tremor-content-strong w-24 h-4 rounded-md mb-1"></div>
                <div className="bg-tremor-content dark:bg-dark-tremor-content w-24 h-4 rounded-md"></div>
              </TableCell>
              <TableCell>
                <div className="bg-tremor-content-strong dark:bg-dark-tremor-content-strong w-24 h-4 rounded-md"></div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

export function TableSkeleton() {
  return (
    <Card className={`${shimmer} relative`}>
      <div className="bg-tremor-content-strong dark:bg-dark-tremor-content-strong h-6 w-24 rounded-md"></div>
      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>
              <div className="bg-white w-4 h-4"></div>
            </TableHeaderCell>
            <TableHeaderCell>
              <div className="bg-tremor-content-strong dark:bg-dark-tremor-content-strong w-12 h-5 rounded-md"></div>
            </TableHeaderCell>
            <TableHeaderCell>
              <div className="bg-tremor-content-strong dark:bg-dark-tremor-content-strong w-8 h-5 rounded-md"></div>
            </TableHeaderCell>
            <TableHeaderCell>
              <div className="bg-tremor-content-strong dark:bg-dark-tremor-content-strong w-16 h-5 rounded-md"></div>
            </TableHeaderCell>
            <TableHeaderCell>
              <div className="bg-tremor-content-strong dark:bg-dark-tremor-content-strong w-16 h-5 rounded-md"></div>
            </TableHeaderCell>
            <TableHeaderCell>
              <div className="bg-tremor-content-strong dark:bg-dark-tremor-content-strong w-12 h-5 rounded-md"></div>
            </TableHeaderCell>
            <TableHeaderCell>
              <div className="bg-tremor-content-strong dark:bg-dark-tremor-content-strong w-8 h-5 rounded-md"></div>
            </TableHeaderCell>
            <TableHeaderCell>
              <div className="bg-tremor-content-strong dark:bg-dark-tremor-content-strong w-12 h-5 rounded-md"></div>
            </TableHeaderCell>
            <TableHeaderCell>
              <div className="bg-tremor-content dark:bg-dark-tremor-content h-2 w-5 rounded-md"></div>
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(6)].map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="bg-white w-4 h-4"></div>
              </TableCell>
              <TableCell>
                <div className="bg-tremor-content dark:bg-dark-tremor-content h-4 w-4 rounded-md"></div>
              </TableCell>
              <TableCell>
                <div className="bg-tremor-content dark:bg-dark-tremor-content h-4 w-32 rounded-md"></div>
              </TableCell>
              <TableCell>
                <div className="bg-tremor-content dark:bg-dark-tremor-content h-4 w-18 rounded-md"></div>
              </TableCell>
              <TableCell>
                <div className="bg-tremor-content dark:bg-dark-tremor-content h-4 w-24 rounded-md"></div>
              </TableCell>
              <TableCell>
                <div className="bg-tremor-content dark:bg-dark-tremor-content h-4 w-4 rounded-md"></div>
              </TableCell>
              <TableCell>
                <div className="bg-tremor-content dark:bg-dark-tremor-content h-4 w-4 rounded-md"></div>
              </TableCell>
              <TableCell>
                <div className="bg-tremor-content dark:bg-dark-tremor-content h-4 w-12 rounded-md"></div>
              </TableCell>
              <TableCell>
                <div className="bg-tremor-content dark:bg-dark-tremor-content h-2 w-5 rounded-md"></div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

export function LinarCardsSkeleton() {
  return (
    <>
      <CardSkeletonV3 />
      <CardSkeletonV3 />
      <CardSkeletonV3 />
    </>
  );
}
