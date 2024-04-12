import { type NextRequest } from "next/server";
import { getCirculationChartData } from "@/lib/data";

export async function GET(request: NextRequest) {
  const circulationChartData = await getCirculationChartData();

  return Response.json(circulationChartData);
}
