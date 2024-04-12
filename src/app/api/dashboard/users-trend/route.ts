import { type NextRequest } from "next/server";
import { getPatronsTrend } from "@/lib/data";

export async function GET(request: NextRequest) {
  const patronsTrend = await getPatronsTrend();

  return Response.json(patronsTrend);
}
